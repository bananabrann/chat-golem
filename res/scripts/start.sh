#!/usr/bin/env bash

# Called on the virtual machine. Terminal can only 
# handle one parameter usually, so this script
# obfuscates the Node start process, as well as 
# direct the outputs to the log files in production.

# NOTE -
# Don't forget to allow access when executing if not
# calling from Bash shell.
# chmod 744 /path/to/res/scripts/start.sh

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR/../../

npm start \
    1>> ./.log \
    2>> ./.error.log

# Though untested, the following two lines should 
# run in the background without the byobu shell
# cmd="npm start 1>> ./.log 2>> ./.error.log";
# "${cmd}" &>./.log & disown;
