---
layout: post
title:  "Experiment with Microsoft Visual C++ Project Create Wizard."
published: true
fullview: true
categories: []
---

## Introduction
When I want to construct a building system, I need to dig into the Microsoft Visual C++'s project
wizard created macros. So I didn't try different kinds of combination of Microsoft Visual C++ Project
create wizard, and listing their cl.exe command line option and link command line option.
some article have same functional
[Felxible DLL/static library linkage configurations](http://binglongx.wordpress.com/2009/01/29/felxible-dllstatic-library-linkage-configurations/)
## Experiment

In Microsoft Visual Studio 2013, I tried the following wizard creating.

* Empty Project
    - Application (.exe)
        * Use Standard Windows Libraries
            * MBCS-Debug
                * `cl.exe` /GS /analyze- /W3 /Zc:wchar_t /ZI /Gm /Od /sdl /Fd"Debug\vc120.pdb" /fp:precise /D "_MBCS" /errorReport:prompt /WX- /Zc:forScope /RTC1 /Gd /Oy- /MDd /Fa"Debug\" /EHsc /nologo /Fo"Debug\" /Fp"Debug\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Debug\Project2.exe" /MANIFEST /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Debug\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /DEBUG /MACHINE:X86 /INCREMENTAL /PGD:"D:\CI\freelancer\msvc\Project2\Debug\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Debug\Project2.exe.intermediate.manifest" /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
            * MBCS-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_MBCS" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.exe" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.exe.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
            * Unicode - Debug
                * `cl.exe` /GS /analyze- /W3 /Zc:wchar_t /ZI /Gm /Od /sdl /Fd"Debug\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /RTC1 /Gd /Oy- /MDd /Fa"Debug\" /EHsc /nologo /Fo"Debug\" /Fp"Debug\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Debug\Project2.exe" /MANIFEST /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Debug\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /DEBUG /MACHINE:X86 /INCREMENTAL /PGD:"D:\CI\freelancer\msvc\Project2\Debug\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Debug\Project2.exe.intermediate.manifest" /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
            * Unicode - Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.exe" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.exe.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Static Library
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MT /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.exe" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.exe.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Shared DLL
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /D "_AFXDLL" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.exe" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.exe.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
    - Dynamic Library (.dll)       
        * Use Standard Windows Libraries
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_WINDLL" /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.dll" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /IMPLIB:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /DEBUG /DLL /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.dll.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Static Library
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_WINDLL" /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MT /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.dll" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /IMPLIB:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /DEBUG /DLL /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.dll.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Shared DLL
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_WINDLL" /D "_UNICODE" /D "UNICODE" /D "_AFXDLL" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.dll" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /IMPLIB:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /DEBUG /DLL /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.dll.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
    - Static library (.lib)   
        * Use Standard Windows Libraries
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE "kernel32.lib" "user32.lib" "gdi32.lib" "winspool.lib" "comdlg32.lib" "advapi32.lib" "shell32.lib" "ole32.lib" "oleaut32.lib" "uuid.lib" "odbc32.lib" "odbccp32.lib" /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.lib.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Static Library
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MT /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.lib.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
        * Use MFC in a Shared DLL
            * Unicode-Release
                * `cl.exe` /GS /GL /analyze- /W3 /Gy /Zc:wchar_t /Zi /Gm- /O2 /sdl /Fd"Release\vc120.pdb" /fp:precise /D "_UNICODE" /D "UNICODE" /D "_AFXDLL" /errorReport:prompt /WX- /Zc:forScope /Gd /Oy- /Oi /MD /Fa"Release\" /EHsc /nologo /Fo"Release\" /Fp"Release\Project2.pch"
                * `link.exe` /OUT:"D:\CI\freelancer\msvc\Project2\Release\Project2.lib" /MANIFEST /LTCG /NXCOMPAT /PDB:"D:\CI\freelancer\msvc\Project2\Release\Project2.pdb" /DYNAMICBASE /DEBUG /MACHINE:X86 /OPT:REF /SAFESEH /PGD:"D:\CI\freelancer\msvc\Project2\Release\Project2.pgd" /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /ManifestFile:"Release\Project2.lib.intermediate.manifest" /OPT:ICF /ERRORREPORT:PROMPT /NOLOGO /TLBID:1
*
*
*
            * Unicode-Release
                * `cl.exe`
                * `link.exe` 
