//Import
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT; 

app.use(express.json());
app.use(express.urlencoded());

//db connection
console.log(process.env.DB_URI);

const dbuser = process.env.DB_USER;
const dbpswd = process.env.DB_PSWD;
const dbprefix = process.env.DB_PREFIX;
const dbreplicas = process.env.DB_REPLICAS;

const connectionString = `${dbprefix}${dbuser}:${dbpswd}@${dbreplicas}`;

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: true	
}).then(() => {
	console.log('Connected to the db successfully');
}).catch((err) => {
	console.error('Cannot connect to the db, see details:');
	console.error(err);
})

//routes prefixes
app.use('/', require('./routes/routes'))
app.use('/query/clients', require('./routes/routes'))
app.use('/query/providers', require('./routes/routes'))


//production settings
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/dist/'));
	app.get("*", (req, res) => {
		res.sendFile(__dirname + '/dist/index.html');
	})
}

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
})


