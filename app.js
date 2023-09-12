const {sequelize} = require('./src/models');
const express = require('express');
const app = express();

const employeeRoute = require('./src/routes/Employees');
app.use(express.json());
app.use('/', employeeRoute);

app.listen({port: 3000}, async () => {
    console.log('server running on port 3000');
    await sequelize.authenticate(); 
    console.log('Database connected!!');
});
