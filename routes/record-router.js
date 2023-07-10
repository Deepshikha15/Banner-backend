const express = require('express')

const RecordCtrl = require('../controllers/record-ctrl');
const AuthCtrl = require('../controllers/user-ctrl');
const fs = require("fs");
const path = require("path");

const router = express.Router()


router.post('/record', RecordCtrl.createRecord)
router.put('/records/:id', RecordCtrl.updateRecord)
router.delete('/record/:id', RecordCtrl.deleteRecord)
router.get('/record/:id', RecordCtrl.getRecordById)
router.get('/records', RecordCtrl.getRecords)
router.get('/add', RecordCtrl.createAdd)

router.post('/auth/register',AuthCtrl.userRegistration);
router.post('/auth/login',AuthCtrl.userLogin);


module.exports = router