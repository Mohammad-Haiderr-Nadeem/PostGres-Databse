const {Employees} = require('../models');
const express = require('express');

const router = express.Router();

//add an amployee
router.post('/', async (req, res) => {
    const {id, name, position} = req.body;
    try{
       const employee = await Employees.create({id, name, position});
        return res.json(employee);
    } catch(err) {
        console.log('err adding user: ',err);
        return res.status(400).json(err);
    }
});

//get the list of all the employees
router.get('/', async (req, res) => {
    try{
        const employees = await Employees.findAll();
        return res.json(employees);
    } catch(err) {
        console.error("Error getting users", err);
        return res.status(400).json(err);
    }
})

//get a particular employee
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await Employees.findOne({
            where: {id},
        })
        return res.json(employee);
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json(err);
    }
})

//delete a particular employee
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await Employees.findOne({
            where: {id},
        })
        await employee.destroy();
        return res.json({msg: `Employee with id:${id} has been deleted`});
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json(err);
    }
});

//update a particular employee
router.put('/:id', async (req, res) => {
    const eid = req.params.id;
    const {id, name, position} = req.body;
    try{
        const employee = await Employees.findOne({
            where: {id: eid},
        })
        employee.id = id;
        employee.name = name;
        employee.position = position;
        employee.save();
        return res.json(employee);
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json(err);
    }
});

module.exports = router;