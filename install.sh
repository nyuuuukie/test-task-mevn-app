#!/bin/bash

# Variables
SERVER_PORT=5000
SERVER_DIR="server"
CLIENT_DIR="client"
VUE_APP_BASE_URL='http://165.227.141.103:5000'

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
npm --prefix $SERVER_DIR install
npm --prefix $CLIENT_DIR install

# Create .env file
echo "PORT=5000" >> "${SERVER_DIR}/.env"
echo "DB_USER='admin'" >> "${SERVER_DIR}/.env"
echo "DB_PSWD='cwsRWSn5bJn1JWuB'" >> "${SERVER_DIR}/.env"
echo "DB_PREFIX='mongodb'" >> "${SERVER_DIR}/.env"
echo "DB_HOSTS='mevn-app-shard-00-00.2lugr.mongodb.net:27017,mevn-app-shard-00-01.2lugr.mongodb.net:27017,mevn-app-shard-00-02.2lugr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-piu695-shard-0&authSource=admin&retryWrites=true&w=majority'" >> "${SERVER_DIR}/.env"
chmod ug+rwx "${SERVER_DIR}/.env"

echo "VUE_APP_BASE_URL='${VUE_APP_BASE_URL}'" > "${CLIENT_DIR}/.env"
chmod ug+rwx "${CLIENT_DIR}/.env"


# Check if port is busy
isPortBusy $SERVER_PORT

if [ "$?" -eq 1 ]; then
	print -c red "Port $SERVER_PORT is already being used by another application"
	exit 1
fi

if [ "$1" == "--prod" ]; then
	# Build prod client
    npm --prefix $CLIENT_DIR run build

	# Start prod server
    NODE_ENV=production npm --prefix $SERVER_DIR run start > "server.log" 2>&1 & disown
    print -c green "\nApp is available on ${VUE_APP_BASE_URL}\n"
else
	# Start dev server
    npm --prefix $SERVER_DIR run devser > "server.log" 2>&1 & disown

	# Start dev client
    npm --prefix $CLIENT_DIR run serve > "client.log" 2>&1 & disown
    print -c yellow "\nPlease, wait for the client to open...\n"
fi

