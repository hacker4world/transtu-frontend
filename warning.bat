@echo off
:: Display a custom error message using VBScript
echo Set objShell = CreateObject("WScript.Shell") > %temp%\error.vbs
echo objShell.Popup "Ti tcodi 3asba ? denia wfet nayek maritch 8assen cha3mal nayek ?", 0, "Tnekt fi l processeur mte3i", 16 >> %temp%\error.vbs
%temp%\error.vbs
del %temp%\error.vbs