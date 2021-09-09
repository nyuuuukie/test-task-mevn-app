# mevn-app

# Install & Run

## Dependencies
 * `node.js`
 * `npm` 

## Auto install
> :warning: **If you are deploying app on VPS: update VUE_APP_BASE_URL by the URL of the backend**

install.sh:
```bash
...
# For example:
SERVER_PORT=5000
VUE_APP_BASE_URL="http://165.227.141.103:5000"
...
```

Script `install.sh` will install and deploy the application using default parameters
```bash
# To run production version remove --prod flag:
./install.sh --prod

# To run development version remove --prod flag:
./install.sh
```

## Manual install
Install all necessary packages (run in the root of repository)
```bash
npm --prefix ./client install
npm --prefix ./server install
```

## Frontend
Frontend part is stored in `client` directory.

### .env
Before building/deploying frontend you should create `.env` file that contains:
```bash
VUE_APP_BASE_URL="backend's URL"

# For example:
VUE_APP_BASE_URL="http://165.227.141.103:5000"
```

### Compiles and minifies for production
```bash
npm run build

# This command will put all necessary files in dist folder.
```

### Compiles and hot-reloads for development
```bash
npm run serve [--port portNumber]

# By default frontend part is started on 8080 port.
```

## Backend
Backend part is stored in `server` directory.

### .env
Before starting application you should create `.env` file
containing following variables:
```bash
# Port for backend:
PORT = 5000
PROD_DIST_FOLDER = "Path to the dist folder"

# Connection parameters by string structure:
# PREFIX://USER:PASSWORD@HOSTS`

DB_USER = "USER"
DB_PSWD = "PASSWORD"
DB_PREFIX = "PREFIX" # e.g. "mongodb"
DB_HOSTS = "HOSTS"
```
> :warning: **If you changed default port of app: do not forget to update value in client's .env file**

### Compiles for production
```bash
npm run start

# This command will use node to run application
```

### Compiles and hot-reloads for development
```bash
npm run devser

# This command will use nodemon to run application
```

# Usage

After deploying the app, go to `http://localhost:{port}` or URL you specified 

## API documentation 

API consist of the following methods:

```javascript
// Client API
getClients()
addClient(client)
getClient(id)
updateClient(client)
deleteClient(id)

// Provider API
getProviders()
addProvider(provider)
getProvider(id)
updateProvider(provider)
deleteProvider(id)

// Page API
getPage(page, limit)
getSortedPage(page, limit, key, asc)

```

Go to [SwaggerHub](https://app.swaggerhub.com/apis-docs/mhufflep/server-api/0.1) for detailed information about them.
