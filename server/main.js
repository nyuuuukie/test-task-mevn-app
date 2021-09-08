//Import
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT | 5000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db connection
const dbuser = process.env.DB_USER;
const dbpswd = process.env.DB_PSWD;
const dbprefix = process.env.DB_PREFIX;
const dbhosts = process.env.DB_HOSTS;

const connectionString = `${dbprefix}://${dbuser}:${dbpswd}@${dbhosts}`;

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false	
}).then(() => {
	console.log('Connected to the db successfully');
}).catch((err) => {
	console.error('Cannot connect to the db, see details:');
	console.error(err);
})

//routes prefixes
app.use('/clients/', require('./routes/client-routes'))
app.use('/pages/', require('./routes/page-routes'))
app.use('/providers/', require('./routes/provider-routes'))

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('An error occured')
});
 
//production settings
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('/var/www/html/mevn-app/client/dist/'));
	app.get("/", (req, res) => {
		res.sendFile('/var/www/html/mevn-app/client/dist/index.html');
	})
}

app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`);
})
