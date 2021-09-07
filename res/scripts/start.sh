# Called on the virtual machine. Terminal can only 
# handle one parameter usually, so this script
# obfuscates the Node start process, as well as 
# direct the outputs to the log files in production.

# NOTE -
# Don't forget to allow access when executing if not
# calling from Bash shell.
# chmod 400 ///res/scripts/start.sh

npm start \
    1>> ./.log \
    2>> ./.error.log
