# mevn-app

# Install & Run

## Dependencies
 * `node.js`
 * `npm` 

## Auto install
Run `install.sh` that will install and deploy the application using default parameters

## Manual install
Install all necessary packages (run in the root of repository)
```
npm —prefix ./client install
npm —prefix ./server install
```

### .env
Before starting application you should create `.env` file
containing following variables:
```bash
# Port for backend:
PORT = 5000

# Connection parameters by string structure:
# PREFIX://USER:PASSWORD@HOSTS`

DB_USER = "USER"
DB_PSWD = "PASSWORD"
DB_PREFIX = "PREFIX" # e.g. "mongodb"
DB_HOSTS = "HOSTS"
```

## Frontend
Frontend part is stored in `client` directory. 

**Compiles and hot-reloads for development**
```
npm run serve [--port portNumber]

# By default frontend part is started on 8080 port.
```

**Compiles and minifies for production**
```
npm run build
```

## Backend
Backend part is stored in `server` directory.

By default frontend part is started on 5000 port. <br>
It could be changed in `vue.config.js` and `.env`
by specifying port in command like below:

**Compiles and hot-reloads for development**
```
npm run devser
```

**Compiles for production**
```
npm run server
```

# Usage

After deploying the app, go to `http://localhost:{port}` if you started it locally or provider's URL 

## API documentation 

API consist of the following methods:

```javascript

// Client API
getClients(req, res)
addClient(req, res)
getClient(req, res)
updateClient(req, res)
deleteClient(req, res)

// Provider API
getProviders(req, res)
addProvider(req, res)
getProvider(req, res)
updateProvider(req, res)
deleteProvider(req, res)

// Page API
getPage(req, res)

```

Go to [SwaggerHub](https://app.swaggerhub.com/apis-docs/mhufflep/server-api/0.1) for more detailed information about them.

