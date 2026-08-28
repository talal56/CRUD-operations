const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee')

router.get('/employees', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const employee = await Employee.find({}).skip(skip).limit(limit);

        if (employee.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        res.json(employee);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/employees', async (req,res)=>{
    const {name,email,position,salary,joiningDate} = req.body
    try{
        if(!name || !email || !position || !salary || !joiningDate){
           return res.status(400).json({message: 'All feilds are requires'})
        }
        const newEmployee = new Employee({name,email,position,salary,joiningDate})
        await newEmployee.save()
        res.status(201).json(newEmployee)
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/employees/:id', async(req,res)=>{
    try{

        const deleted = await Employee.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message: 'Employee not found'})
        }
        res.json({message: 'Employee deleted successfully'})
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal server error'})
    }

})
router.get('/employees/:id', async(req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }
        res.json(employee)
    }catch(err){
        console.error(err)
        res.status(500).json({error:'Internal server error'})
        
    }
})
router.put('/employees/:id', async(req,res)=>{
    try{

        const updated = await Employee.findByIdAndUpdate(req.params.id,req.body, {new: true})
        if(!updated){
            return res.status(404).json({message: 'Employee not found'})
        }
        res.json(updated)
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal server error'})
    }
})
module.exports = router