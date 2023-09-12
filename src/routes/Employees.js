const express = require('express');
const { 
    addEmployee, 
    getEmployees, 
    getSpecificEmployee, 
    deleteEmployee, 
    updateEmployee, 
    handleError
} = require('../controller/user');

const router = express.Router();

//add an amployee
router.post('/createUser', addEmployee);

//get the list of all the employees
router.get('/getUsers', getEmployees);

//get a particular employee
router.get('/getUserById/:id', getSpecificEmployee);

//delete a particular employee
router.delete('/removeUser/:id', deleteEmployee);

//update a particular employee
router.put('updateUser/:id', updateEmployee);

//handle wrong endpoints in get request
router.get('*', handleError);

//handle wrong endpoints in post request
router.post('*', handleError);

//handle wrong endpoints in put request
router.put('*', handleError);

//handle wrong endpoints in delete request
router.delete('*', handleError);

module.exports = router;