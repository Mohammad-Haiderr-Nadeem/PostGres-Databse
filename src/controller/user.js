const { Employees } = require('../models');

//adds an employee
const addEmployee = async (req, res) => {
    const {id, name, position} = req.body;

    if(id && name && position){
        try {
            const employee = await Employees.create({id, name, position});
            return res.json(employee);
        } catch(err) {
            console.log('err adding user: ',err);
            return res.status(400).json(err);
        }
    } else {
        return res.status(400).json({
            msg: 'id or name or position is empty'
        });
    }
}

//gets all the employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employees.findAll();
        if(employees){
            return res.json(employees);
        } else {
            return res.status(400).json({
                msg: 'could not find any employee'
            });
        }
    } catch(err) {
        console.error("Error getting users", err);
        return res.status(400).json({
            msg: 'Error in getting the response'
        });
    }
}

//get a particular employee
const getSpecificEmployee = async (req, res) => {
    const id = req.params.id;
    try{
        const employee = await Employees.findOne({
            where: {id},
        })
        if(employee) {
            return res.json(employee);
        } else {
            return res.status(400).json({
                msg: 'no such employee exists'
            });
        }
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json(err);
    }
}

//delete an employee
const deleteEmployee = async (req, res) => {
    const id = req.params.id;

    try {
        if(!id) {
            throw new Error('Employee Id not found')
        }

        const employee = await Employees.findOne({
            where: {id},
        })

        if(employee){
            await employee.destroy();

            return res.json({
                msg: `Employee with id:${id} has been deleted`
            }); 
        } else {
            return res.json({
                msg: `Employee with id:${id} not found`
            });
        }
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json('Failed');
    }
}

//update an employee
const updateEmployee = async (req, res) => {
    const eid = req.params.id;
    const {id, name, position} = req.body;
    try{
        const employee = await Employees.findOne({
            where: {id: eid},
        })
        if(employee){
            employee.id = id;
            employee.name = name;
            employee.position = position;

            employee.save();
            return res.status(200).json(employee);
        } else {
            return res.status(400).json({
                msg: 'no such employee exists'
            });
        }
    } catch(err){
        console.error(`Error finding employee with ID ${id}`, err);
        return res.status(400).json(err);
    }
}

const handleError = async (req, res) => {
    res.send({
        error: "Wrong endpoint in API"
    });
    res.end();
}

module.exports = {
   addEmployee,
   getEmployees,
   getSpecificEmployee,
   deleteEmployee,
   updateEmployee,
   handleError
};


