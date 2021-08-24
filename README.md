# mevn-app

# Install & Run
Install all necessary packages
```
npm install
```

## .env
Before starting application you should create `.env` file
containing following variables:

Port for backend deployment: <br>
`PORT = 5000` 

Connection parameters by string structure: <br>
`PREFIX://USER:PASSWORD@HOSTS`

`DB_USER = "USER"` <br>
`DB_PSWD = "PASSWORD"` <br>
`DB_PREFIX = "PREFIX"`, e.g. "mongodb" <br>
`DB_HOSTS = "HOSTS"`, <br>

## Frontend
Frontend part is stored in `client` directory. 

**Compiles and hot-reloads for development**
```
npm run serve
```

By default frontend part is started on 8080 port. <br>
It could be changed in `vue.config.js` file or
by specifying port in command like below:

```
npm run serve --port {portNumber}
```

**Compiles and minifies for production**
```
npm run build
```

## Backend
Backend part is stored in `server` directory.

By default frontend part is started on 5000 port. <br>
It could be changed in `vue.config.js` file and
by specifying port in command like below:

```
npm run serve --port {portNumber}
```

**API documentation**

API consist of the following methods:

```
	getClients(req, res)
	addClient(req, res)
	getClient(req, res)
	updateClient(req, res)
	deleteClient(req, res)
	getProviders(req, res)
	addProvider(req, res)
	getProvider(req, res)
	updateProvider(req, res)
	deleteProvider(req, res)
	getPage(req, res)
```

Go to [SwaggerHub](https://app.swaggerhub.com/apis-docs/mhufflep/server-api/0.1) for more detailed information about them.


**Compiles and hot-reloads for development**
```
npm run devser
```

**Compiles for production**
```
npm run server
```

## Usage

After deploying the app, go to `http://localhost:{port}` if you started it locally or provider's URL 