#!/bin/bash

# Variables
SERVER_PORT=5000
URL="http://localhost:8080"
SERVER_DIR="server"
CLIENT_DIR="client"
OPEN_CMD="open"

isPortBusy()
{
	busy="$(lsof -i -n -P | grep $1)"
	if ! [ "$busy" = "" ]; then
		return 1;
	else
		return 0;
	fi
}

print () 
{
    declare -A colors;
    colors=(\
        ['red']='\E[0;31m'\
        ['green']='\E[0;32m'\
        ['yellow']='\E[0;33m'\
		['white']='\E[0;37m'\
    );
 
    local defaultMsg="";
    local defaultColor="white";
 
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

# Check for dependencies
declare -a dependencies=("node" "npm")

for dep in ${dependencies[@]}
do
	if ! command -v $dep &> /dev/null
	then
    	print -c red "Error: $dep is not installed"
		exit
	fi
done

# Install
npm --prefix $CLIENT_DIR install --save-dev "postcss@^8.1.0" 
npm --prefix $SERVER_DIR --dry-run install
npm --prefix $CLIENT_DIR --dry-run install

# Create .env file
echo "UE9SVCA9IDUwMDAKCkRCX1VTRVIgPSAiYWRtaW4iCkRCX1BTV0QgPSAiY3dzUldTbjViSm4xSld1
QiIKREJfUFJFRklYID0gbW9uZ29kYgpEQl9MT0NBTF9VUkkgPSBtb25nb2RiOi8vbG9jYWxob3N0
OjI3MDE3L21ldm4tYXBwCkRCX0hPU1RTID0gbWV2bi1hcHAtc2hhcmQtMDAtMDAuMmx1Z3IubW9u
Z29kYi5uZXQ6MjcwMTcsbWV2bi1hcHAtc2hhcmQtMDAtMDEuMmx1Z3IubW9uZ29kYi5uZXQ6Mjcw
MTcsbWV2bi1hcHAtc2hhcmQtMDAtMDIuMmx1Z3IubW9uZ29kYi5uZXQ6MjcwMTcvbXlGaXJzdERh
dGFiYXNlP3NzbD10cnVlJnJlcGxpY2FTZXQ9YXRsYXMtcGl1Njk1LXNoYXJkLTAmYXV0aFNvdXJj
ZT1hZG1pbiZyZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHk=" | base64 --decode > "${SERVER_DIR}/.env"

chmod ug+rwx "${SERVER_DIR}/.env"

# Check if port is busy
isPortBusy $SERVER_PORT

if [ "$?" -eq 1 ]; then
	print -c red "Port $SERVER_PORT is busy"
	exit
fi

# Start server
npm --prefix $SERVER_DIR run devser > "server.log" 2>&1 & disown

# Start client
npm --prefix $CLIENT_DIR run serve > "client.log" 2>&1 & disown
print -c yellow "\nPlease, wait for the client to open...\n"
