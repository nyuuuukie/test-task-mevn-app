#!/bin/bash

cprint () {
 
    declare -A colors;
    colors=(\
        ['red']='\E[0;31m'\
        ['green']='\E[0;32m'\
        ['yellow']='\E[0;33m'\
    );
 
    local defaultMsg="";
    local defaultColor="";
 
    while [[ $# -gt 1 ]];
    do
	    case "$1" in
	        -c|--color)
	            color="$2";
	            shift;
	        ;;
	    esac
    	shift;
    done
 
    message=${1:-$defaultMsg};
    color=${color:-$defaultColor};
 
    echo -en "${colors[$color]}";
    echo -e "$message";
 
    tput sgr0;
    return;
}

URL="http://localhost:8080"
SERVER_DIR="server"
CLIENT_DIR="client"
OPEN_CMD="open"

# Check Main Dependencies
declare -a dependencies=("node" "npm")

for dep in ${dependencies[@]}
do
	if ! command -v $dep &> /dev/null
	then
    	cprint -c red "Error: $dep is not installed"
		exit
	fi
done

# Install
npm install

# Start Backend
npm --prefix $SERVER_DIR run devser

# Start Frontend
npm --prefix $CLIENT_DIR run serve

# Open via default browser
if [ "$(uname)" = "Linux" ]; then
	OPEN_CMD="xdg-open"
fi

if ! command -v "${OPEN_CMD}" &> /dev/null
then
	cprint -c yellow "Warning: cannot run your browser"
	cprint -c yellow "Please, go to $URL manually"
else
	$OPEN_CMD $URL > /dev/null 2>&1 & disown
fi
