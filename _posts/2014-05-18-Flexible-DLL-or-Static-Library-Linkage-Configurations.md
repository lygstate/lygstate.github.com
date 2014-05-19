---
layout: post
title:  "Flexible DLL or Static Library Linkage Configurations."
published: true
fullview: true
categories: []
---

## Introduction
I have some code that must build into either a DLL or a statib library depending on the project setting. That says,
I need to write the code carefully, such that when project configuration changes I can minimize code modification,
and make it survive in a flexibly configured project.

It is well known that conditional compilation using a macro can help to make a header file for building a DLL
itself (exporting objects) and being used by the client (importing symbols) without any change. The problem for
me is more complex: not only the code should be used to create a DLL and use a DLL, but also to create a static
 library and use a static library.

Obviously to minimize the code modification, conditional compilation is a must. The problem is what macros can
be leveraged?

## Experiment
In Microsoft Visual Studio 2005, I used the Add New Project Wizard to create various projects and observe the
macros that are defined by these wizard generated projects. Below is the result:

### In the project creation wizard, there are macros defined by the wizard.
* Win32 Project -> Windows application
  WIN32 _WINDOWS
* Win32 Project -> Console application
  WIN32 _CONSOLE
* Win32 Project -> Console application, Using: MFC (implicit: in shared DLL)
  WIN32 _CONSOLE _AFXDLL
* Win32 Project -> DLL
  WIN32 _WINDOWS _USRDLL _WINDLL <ProjName>_EXPORTS
* Win32 Project -> DLL, Additional options: Export Symbols
  WIN32 _WINDOWS _USRDLL _WINDLL <ProjName>_EXPORTS
* Win32 Project -> DLL, Using: MFC (implicit: in shared DLL)
  WIN32 _WINDOWS _USRDLL _WINDLL _AFXDLL <ProjName>_EXPORTS
* Win32 Project -> Static library
  WIN32 _LIB
* Win32 Project -> Static library, Using: MFC (implicit: in shared DLL)
  WIN32 _LIB _AFXDLL
* MFC -> MFC application, Use MFC in a shared DLL
  WIN32 _WINDOWS _AFXDLL
* MFC -> MFC application, Use MFC in a static library
  WIN32 _WINDOWS
* MFC -> MFC DLL, Regular DLL using shared MFC DLL
  WIN32 _WINDOWS _USRDLL _WINDLL _AFXDLL
Merely using CWinApp derived class's InitInstance/ExitInstance to wrap up DllMain()
This is still a C/C++ DLL, and you need to export the symbols on your own.
* MFC -> MFC DLL, Regular DLL with MFC statically linked
  WIN32 _WINDOWS _USRDLL _WINDLL
* Merely using CWinApp derived class's InitInstance/ExitInstance to wrap up DllMain()
This is still a C/C++ DLL, and you need to export the symbols on your own.
* MFC -> MFC DLL, MFC Extension DLL
  WIN32 _WINDOWS _AFXEXT _WINDLL _AFXDLL


### There are orthogonal macros not affected by the project creation wizard .
Release build: NDEBUG / Debug Build: _DEBUG
MBCS build: _MBCS / Unicode build: UNICODE _UNICODE
Also, <ProjName>_EXPORTS controls <ProjName>_API to be either __declspec(dllexport) or __declspec(dllimport),
reference to [Exporting C++ Classes from an MFC Extension DLL]
(http://www.codeproject.com/Articles/161/Exporting-C-Classes-from-an-MFC-Extension-DLL).

## Summary

For all the compile time macros:

* All projects have: `WIN32`. WIN32 probably means the very low-level feature of Windows, for example Kernel, that
  every project running on the OS depends on. WIN32 is defined even for 64-bit compilation according to MSDN.
* Console applications have: _CONSOLE. Note: at link time, /SUBSYSTEM:CONSOLE option is used such that a console
  window is created before it enters CRT startup entry point, mainCRTStartup. CRT startup routine initializes
  C Run Time library, then calls our application entry function, normally main(). The program is a Unicode build,
  both the CRT startup entry point and our application entry function should be the Unicode version,
  wmainCRTStartup and wmain().
* Windows applications and DLLs have: _WINDOWS. Note: at link time, /SUBSYSTEM:WINDOWS option is used. This makes sure
  no console window appears, and CRT is initialized, and correspondent WinMain() or DllMain() is then called when the
  EXE or DLL is loaded.
* Static libraries have: `_LIB`. Note: static libraries does not need to specify _CONSOLE or _WINDOWS, because it alone
  will never be an executable and loaded.
* DLLs have: `_WINDLL`. `All DLLs have this.` Notice also all DLLs should export some symbols.
* Regular DLLs have: `_USRDLL`. Regular DLL means that it is not a MFC extension DLL. Regular DLLs can be C or C++ DLLs. 
  C DLL is the normal case. C++ DLL is not compiler neutral due to name mangling. Regular DLLs can choose to use or not
  use MFC. Regular DLLs can also choose to use MFC in a static library or a shared DLL.
* All projects using MFC as a shared DLL have: _AFXDLL. No matter it is a static library, DLL or application, using
  MFC in a shared DLL needs this macro.
* MFC extension DLLs have: `_AFXEXT _AFXDLL`. _AFXDLL is actually from the fact that an MFC extension DLL must use MFC
  as a shared DLL. _AFXEXT makes special arrangement for these extension DLLs. There are extra requirements to write
  such DLLs to work correctly. Obviously, any client using an MFC extension DLL must use MFC as a shared DLL,
  therefore define _AFXDLL too.

For the bold bullets above, remember that the compile time macros apply when the target static library or DLL is built.
When the client of the target is compiled, even it includes the header files from the target, the macros applied on
the target no longer apply; it is the client project's own macros that apply.

The fact that a library's header file can be included when building the library or when the client uses the library,
means that the header file itself cannot distinguish whether _LIB or _WINDLL is from the client or the library itself.
Therefore it cannot rely on these standard macros to determine if it is used to {create, use}x{static library, DLL}.
For example, if the header file senses _LIB, it could be that the target library is being built as a static library,
 or that the target library (static or even DLL) is being used to build a client static library. The conclusion is
that the standard macros above are useless for us here. Good learning, haha.

## Calling conventions and linking

INFO: Using _declspec(dllimport) & _declspec(dllexport) in Code is available at Microsoft Help and Support.
Specifically, __declspec(dllexport) is used to indicate that the object symbol should be put in the import library
when building a DLL project; __declspec(dllimport) is used in a client project to import the symbol from the DLL.
 Thus in a DLL project's header file, it looks like below:

```
#ifdef OURLIB_EXPORTS // when building DLL
  #define OURLIB_API __declspec(dllexport)
#else // when client uses DLL
  #define OURLIB_API __declspec(dllimport)
#endif
class OURLIB_API OurClass{};
OURLIB_API void OurGlobalFunc();
```

The DLL project defines OURLIB_EXPORTS when it is built, while the client does not.

If we build and use a static library, the case is not that complex. Remember a static library is just like a
collection of .obj files, directly added to the client project. Everything is visible to the client, except those
file static objects. That says, OURLIB_API can just be empty, nothing, for a static library, no matter it is
 built or used.

But we need to look closer at __declspec(dllexport) and __declspec(dllimport) first.

First of all, when building a DLL, __declspec(dllexport) is almost a must for exporting symbols. You can use a
.DEF (module definition) file to export symbols, but it is inconvenient. Also, C++ name decoration, because it
may change in different versions of compilers, makes the .DEF hard to maintain; but __declspec(dllexport) is
 invariant.

On the other side, __declspec(dllimport) is not a must for the DLL’s client. If the client does not use
__declspec(dllimport), the linker has to generate a thunk to simulate a non-DLL call. The thunk itself jumps
 to an entry of the client EXE’s import address table, which the loader updates when the client is loaded with
the DLL. If the client uses __declspec(dllimport), the linker directly puts a call ptr __imp_func1 at the
call site, where __imp_func1 is the import address entry, thus saving space and time of a thunk.

Therefore, the following code works, at the cost of slower and larger client due to the thunks when OURLIB is a DLL:

```
#ifdef OURLIB_EXPORTS // when building DLL
  #define OURLIB_API __declspec(dllexport)
#else // when client uses DLL,  or when building static library, or when client uses static library
  #define OURLIB_API 
#endif

class OURLIB_API OurClass{};
OURLIB_API void OurGlobalFunc();
```

To get better performance, we can also write:

```
// in ourlib.h:

#ifdef OURLIB_EXPORTS // when building DLL, target project defines this macro
  #define OURLIB_API __declspec(dllexport)
#elif defined(OURLIB_IMPORTS) // when using DLL, client project defines this macro
  #define OURLIB_API __declspec(dllimport)
#else // when building or using target static library, or whatever: define it as nothing
  #define OURLIB_API 
#endif

class OURLIB_API OurClass{};
OURLIB_API void OurGlobalFunc();
```

Of course, you only add OURLIB_API to the objects that are intended to be exported when building a DLL.
The internal objects in a DLL should not be decorated with this macro. When building/using the static
library, OURLIB_API does nothing. Compared to a DLL only target header file, the DLL/static library
dual-build header file further requires the client project to define OURLIB_IMPORTS when it uses the
target project as a DLL. This slight extra work is worthwhile. If you forget to do that in your client
project, your only consequence is slower and larger client, maybe still acceptable.

## Example

Suppose in the target library we provide a class ClassT1, which has a public member function void foo().
The client calls ClassT1::foo() in its code. We test with a few scenarios below.

* We build the target library as a DLL using __declspec(dllexport), then the client imports symbols from the DLL using __declspec(dllimport). The client assembly code is call DWORD PTR __imp_?foo@ClassT1@@QAEXXZ for t1.foo(); where __imp_?foo@ClassT1@@QAEXXZ is an entry in the PE’s import address table. That entry is filled by loader when the DLL is loaded.
* We build the target library as a DLL using __declspec(dllexport), then the client imports symbols from the DLL without using __declspec(dllimport). The client assembly code is call ?foo@ClassT1@@QAEXXZ for t1.foo(). It appears as a normal function call, as if ?foo@ClassT1@@QAEXXZ is a routine with a known address. But since the actual function lives in a DLL, this simple call will not work directly. In fact, the linker makes a thunk, an entry somewhere in the executable that ?foo@ClassT1@@QAEXXZ points to. The thunk is simply one instruction jmp DWORD PTR __imp_?foo@ClassT1@@QAEXXZ. Again, __imp_?foo@ClassT1@@QAEXXZ is an entry in the PE’s import address table, which is updated by the loader.
* We build the target library as a static library, and the client links to it. The client assembly code is call ?foo@ClassT1@@QAEXXZ for t1.foo(). This is just a normal function call, as if the function is from the same translation unit, or same project. The linker treats the function from a static library the same as one from another object file.

Obviously, 3 gives best performance, 1 seconds that, and 2 is the slowest.