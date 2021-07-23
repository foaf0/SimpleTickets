@echo off
title SimpleTickets Installer

echo / ---------------------------------------------- /
echo       SimpleTickets Created by Foaf#0001
echo                  Established
echo                 7 / 22 / 2021
echo             Please Await Installer
echo / ---------------------------------------------- /
echo Installer Attached...
echo Downloading Required Node Modules...
echo Installing Required Node Modules...
cd %~dp0
cmd /c "npm i"
echo Checking Files...
echo Finilizing Project...
echo Finished!
echo --------------------------------------
echo Creating start command for Your Bot...
echo --------------------------------------
echo @echo off > start.bat
echo title SimpleTickets >> start.bat
echo :START >> start.bat
echo node server.js >> start.bat
echo goto START >> start.bat
echo "start.bat" File Created.
echo ------------------------------------
echo Deleting Unwanted Files...
echo ------------------------------------
del "%~f0"
echo Closing...
exit