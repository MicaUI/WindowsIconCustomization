# folders icons

## Overview

![image](https://github.com/MicaUI/WindowsIconCustomization/assets/6630660/0c449a10-978b-4212-9c1d-9f410f44d562)

![image](https://github.com/MicaUI/WindowsIconCustomization/assets/6630660/60315b3f-1cef-45da-af44-0be6ecec720a)

## How to do

In order to use this set of icons, you need to manually replace imageres.dll.mun and shell32.dll.mun

1. You need to manually take ownership of these files, and then obtain read, write and delete permissions

2. Copy it to the user folder to modify, replace the icon assets in the dll file. You can do this with software like Green Fish Icon Editor or Resources Hacker.

3. Note that if you are prompted that the target file is occupied, you must first start the command prompt or terminal, and then use the task manager to end the explorer.exe process - because this process occupies these files

4. You have to use command prompt or terminal to copy the file to the target location, replacing the previous file

- Green Fish Icon Editor
This is an open source application for editing icon files of various operating systems (convert png images to ico or icns or vice versa), and can also edit files containing icon resources. For example, Windows often embeds ico files in dll.

- Resources Hacker
This is a freeware to replace ico/bmp or other resources in dll or exe.
