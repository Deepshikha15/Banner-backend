const Records = require('../models/record-model')
//const Collections= require('../models/user-model') 
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

//const upload = require("express-fileupload");

createRecord = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a record',
        })
    }

    const record = new Records(body)

    if (!record) {
        return res.status(400).json({ success: false, error: err })
    }

    record.save().then(() => {
            return res.status(201).json({
                success: true,
                id: record._id,
                message: 'Record created!',
            })
        }).catch(error => {
            return res.status(400).json({
                error,
                message: 'Record not created!',
            })
        })
}

updateRecord = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Records.findById(req.params.id).then((records) => {
        records.fname = body.fname
        records.lname = body.lname
        records.age = body.age
     // records.time = body.time
        records
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: records.id,
                    message: 'Record updated!',
                })
            })
            .catch((error) => {
                console.log('up catch', error)
                return res.status(404).json({
                    error,
                    message: 'Record not updated!',
                })
            })
    })
}

deleteRecord = async (req, res) => {
    await Records.findByIdAndDelete(req.params.id).then((records) => {
        
        if (!records) {
            console.log('delete ',records)
            return res.status(404).json({ success: false, error: `Record not found` })
        }

        return res.status(200).json({ success: true, data: records })
    }).catch(err => console.log(err))
}

getRecordById = async (req, res) => {
    await Records.findById(req.params.id).then((records) => {
        if (!records) {
            return res
                .status(404)
                .json({ success: false, error: `Record not found` })
        }
        return res.status(200).json({ success: true, data: records })
    }).catch(err => console.log(err))
}

getRecords = async (req, res) => {
    await Records.find({}).then((records)=>{
        if (!records.length) {
            console.log(records)
            return res.status(404).json({ success: false, error: `Record not found` })
        }
        return res.status(200).json({ success: true, data: records })
    }).catch(err => console.log(err))
}

createAdd = (req, res) => {
    const body = req.body
    console.log('body', body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a record',
        })
    }

    const record = new Records(body)
    console.log('record', record)
    if (!record) {
        return res.status(400).json({ success: false, error: err })
    }

    record.save().then(() => {
            return res.status(201).json({
                success: true,
                id: record._id,
                message: 'Record created!',
            })
        }).catch(error => {
            return res.status(400).json({
                error,
                message: 'Record not created!',
            })
        })
}

module.exports = {
    createRecord,
    updateRecord,
    deleteRecord,
    getRecords,
    getRecordById,
    //getList,
   // createList
   createAdd
}