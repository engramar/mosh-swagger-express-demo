const { config } = require('dotenv');
const config2 = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticator = require('./authenticator');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const posts = require('./routes/posts');
const home = require('./routes/home');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

config();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/posts', posts);

// Environment Variable Configuration
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log('Application Name: ' + config2.get('name'));
console.log('Mail Server: ' + config2.get('mail.host'));
console.log(`Mail Password: ${process.env.app_password}`);

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//Db work 
dbDebugger('Connected to the database');

//Custom middleware functions
app.use(logger);
app.use(authenticator);

const PORT = parseInt(process.env.PORT) || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});