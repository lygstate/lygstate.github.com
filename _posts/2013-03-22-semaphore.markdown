---
layout: post
title: "Semaphore, Mutex, Critical section, SpinLock, Event"
date: 2013-03-22 17:06
comments: true
categories: 
---

####Critical Section

In concurrent programming, a critical section is a piece of code that accesses a shared resource (data structure or device) that must not be concurrently accessed by more than one thread of execution. A critical section will usually terminate in fixed time, and a thread, task, or process will have to wait for a fixed time to enter it (aka bounded waiting). Some synchronization mechanism is required at the entry and exit of the critical section to ensure exclusive use, for example a semaphore. (From wiki)

中文名叫做**临界区**.不论是硬件临界资源，还是软件临界资源，多个线程必须互斥地对它进行访问。由于不需要进入系统级(Mutex可以用于跨进程同步，因此是内核对象)，它比较轻量，效率会高很多（Windows下）。但是有的操作系统**进程**与**线程**是同一个概念，比如在VxWorks只有**Task**,在这种环境下，Mutex与Critical Section是等价的。

#####Critical Section Usage
**Example Code For Critical Sections with POSIX pthread library**


	/* Sample C/C++, Unix/Linux */
	#include <pthread.h>
	 
	/* This is the critical section object (statically allocated). */
	static pthread_mutex_t cs_mutex = PTHREAD_MUTEX_INITIALIZER;
	 
	void f()
	{
	    /* Enter the critical section -- other threads are locked out */
	    pthread_mutex_lock( &cs_mutex );
	 
	    /* Do some thread-safe processing! */
	 
	    /*Leave the critical section -- other threads can now pthread_mutex_lock()  */
	    pthread_mutex_unlock( &cs_mutex );
	}
	 
	int main()
	{
	    f();
	 
	    return 0;
	}


**Example Code For Critical Sections with Win32 API**

	
	/* Sample C/C++, Windows, link to kernel32.dll */
	#include <windows.h>
	 
	static CRITICAL_SECTION cs; /* This is the critical section object -- once initialized,
	                               it cannot be moved in memory */
	                            /* If you program in OOP, declare this as a non-static member in your class */ 
	void f()
	{
	    /* Enter the critical section -- other threads are locked out */
	    EnterCriticalSection(&cs);
	 
	    /* Do some thread-safe processing! */
	 
	    /* Leave the critical section -- other threads can now EnterCriticalSection() */
	    LeaveCriticalSection(&cs);
	}
	 
	int main()
	{
	    /* Initialize the critical section before entering multi-threaded context. */
	    InitializeCriticalSection(&cs);
	 
	    f(); 
	 
	    /* Release system object when all finished -- usually at the end of the cleanup code */
	    DeleteCriticalSection(&cs);
	 
	    return 0;
	}

##### Critical Section 与 Mutex 的区别
Critical Section不是一个核心对象，无法获知进入临界区的线程是生是死，如果进入临界区的线程挂了，没有释放临界资源，系统无法获知，而且没有办法释放该临界资源。而 Mutex 是有超时选项的，如果一个 Mutex 占用资源太久，那么会直接被释放。而且可以在其它进程销毁 Mutex对象，但是 Critical Section就不可以

##### Critical Section properties
Typically, critical sections prevent process and thread migration between processors and the preemption of processes and threads by interrupts and other processes and threads.

Critical sections often allow nesting. Nesting allows multiple critical sections to be entered and exited at little cost.
If the scheduler interrupts the current process or thread in a critical section, the scheduler will either allow the currently executing process or thread to run to completion of the critical section, or it will schedule the process or thread for another complete quantum. The scheduler will not migrate the process or thread to another processor, and it will not schedule another process or thread to run while the current process or thread is in a critical section.

Similarly, if an interrupt occurs in a critical section, the interrupt's information is recorded for future processing, and execution is returned to the process or thread in the critical section. Once the critical section is exited, and in some cases the scheduled quantum completes, the pending interrupt will be executed. The concept of scheduling quantum applies to "Round Robin" and similar scheduling policies.

Since critical sections may execute only on the processor on which they are entered, synchronization is only required within the executing processor. This allows critical sections to be entered and exited at almost zero cost. No interprocessor synchronization is required, only instruction stream synchronization. Most processors provide the required amount of synchronization by the simple act of interrupting the current execution state. This allows critical sections in most cases to be nothing more than a per processor count of critical sections entered.

Performance enhancements include executing pending interrupts at the exit of all critical sections and allowing the scheduler to run at the exit of all critical sections. Furthermore, pending interrupts may be transferred to other processors for execution.


##### Critical Section 使用注意事项
Critical sections should not be used as a long-lived locking primitive. They should be short enough that the critical section will be entered, executed, and exited without any interrupts occurring, neither from hardware much less the scheduler.

##### Critical Section under Linux is *futex*

The 'fast' Windows equal of critical selection in Linux would be a futex, which stands for fast user space mutex. The difference between a futex and a mutex is that with a futex, the kernel only becomes involved when arbitration is required, so you save the overhead of talking to the kernel each time the atomic counter is modified. A futex can also be shared amongst processes, using the means you would employ to share a mutex.

Unfortunately, futexes can be very tricky to implement (PDF).

####Mutex ("mutual exclusion" lock)

Mutex和critical section一样，用来保证同时只有一个线程进入某区域，通常用来实现对某单一资源的访问控制。Mutex可以设定time out，可以不像critical section一样死等。如果一个拥有Mutex的线程在返回之前没有调用ReleaseMutex()，那么这个Mutex就被舍弃了，但是当其他线程等待(WaitForSingleObject等)这个Mutex时，仍能返回，并得到一个WAIT_ABANDONED_0返回值。

A mutex (which stands for "mutual exclusion" lock) is a locking or synchronization object that allows multiple threads to synchronize access to shared resources. It is often used to ensure that shared variables are always seen by other threads in a consistent state.

In Windows, the mutexes are both named and un-named. The named mutex is shared between the threads of different process.

在MS Windows上API是CreateMutex(), OpenMutex(), ReleaseMutex(), WaitForSingleObject()和WaitForMultipleObjects()。用MFC库的CMutex类可以完成同样功能。

In Linux, the mutexes are shared only between the threads of the same process. To achieve the same functionality in Linux, a System V semaphore can be used (具体参考这篇文章).

支持POSIX库的系统(Linux/Unix)上有pthread_mutex_lock()和pthread_mutex_unlock()。

简单说CriticalSection is a user-mode component implemented by the Win32 subsystem, while Mutex is a kernel-mode component. 
Practially, CriticalSection is much faster when there's no actual blocking (due to reduction in user-kernel mode switches), and probably slower when there is blocking (due to more complex implementation). Additionally, since a Mutex is represented by a HANDLE, you can wait on a mutex with a timeout, or with several other handles. Neither option is available with a Critical Section. Mutexes can be named and shared between processes, while CriticalSections are restricted to the threads of a single process.

 

####Semaphore

特点是有计数，同时可以有N个线程可以进入一个区域。Windows上的API有CreateSemaphore(), OpenSemaphore(), ReleaseSemaphore(), WaitForSingleObject()和WaitForMultipleObjects()。或者用MFC的CSemaphore类。

VxWorks没有Mutex, 它提供三种Semaphore: binary, counting, mutex. 相关API是semBCreate, semMCreate, semCCreate, semDelete, semTake, semGive, semFlush

在VxWork上，Mutex会触发prority inheritance. If a higher priority task is waiting for a semaphore 
taken a low priority task and the low priority task, its priority will be temporarily changed to the high priority task which is waiting.

####Binary semaphore

在有的系统中Binary semaphore与Mutex是没有差异的。在有的系统上，主要的差异是mutex一定要由获得锁的进程来释放。而semaphore可以由其它进程释放（这时的semaphore实际就是个原子的变量，大家可以加或减），因此semaphore可以用于进程间同步。Semaphore的同步功能是所有系统都支持的，而Mutex能否由其他进程释放则未定，因此建议mutex只用于保护critical section。而semaphore则用于保护某变量，或者同步。

####Event

Event可以用来实现observer模式。创建一个Event，然后用WaitForSingleObject()挂起等待其它线程点亮(set)这个Event。我经常用的一个伎俩是在用户态创建一个Event的句柄，然后通过DeviceIoControl()把它传到驱动里面去，当驱动收到外部总线传来的数据包就点亮这个Event。Windows的API是CreateEvent(), OpenEvent(), SetEvent(), WaitForSingleObject(), WaitForMultipleObjects()。MFC库里有CEvent类。

####Spin lock

spin lock是一个内核态概念。spin lock与semaphore的主要区别是spin lock是busy waiting，而semaphore是sleep。对于可以sleep的进程来说，busy waiting当然没有意义。对于单CPU的系统，busy waiting当然更没意义（没有CPU可以释放锁）。因此，只有多CPU的内核态非进程空间，才会用到spin lock。Linux kernel的spin lock在非SMP的情况下，只是关irq，没有别的操作，用于确保该段程序的运行不会被打断。其实也就是类似mutex的作用，串行化对 critical section的访问。但是mutex不能保护中断的打断，也不能在中断处理程序中被调用。而spin lock也一般没有必要用于可以sleep的进程空间。
