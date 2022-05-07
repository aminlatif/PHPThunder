#!/bin/bash

scriptDir="`dirname "$0"`"
cd $scriptDir

vsce package --out ./dist/
code --install-extension dist/phpthunder-0.0.5.vsix