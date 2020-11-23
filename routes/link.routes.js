const {Router} = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router();
const config = require('config')
const sql = require('mssql')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid');
const Link = require('../models/Link');

// /api/link/generate
router.post('/generate', auth, async (req, res) => {
    try{
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        const code =  shortid.generate();
        

        let pool = await sql.connect(config.get('mssql'));
        let result = await pool.request()
            .input('input_from', sql.NVarChar, from)    
            .query('select * from dbo.Links where owner = input_from')

        const existing = result['recordset'][0];
        if(existing){
            return res.json({link: existing});
        }

        const to = baseUrl + '/to/' + code;

        const link = new Link({
            code, to , from, owner: req.user.userId 
        });

        //save to DB

        res.status(201).json({ link });

    }catch(e){
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// /api/link
//router.get('/', auth, async (req, res) => {
router.get('/', auth, async (req, res) => {
    try{
        let pool = await sql.connect(config.get('mssql'));
        let result = await pool.request()
            .input('input_id', sql.Numeric, req.user.userId)    
            .query('select * from dbo.Links where owner = @input_id')
        res.json(result['recordset'][0])
    }catch(e){
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// /api/link
router.get('/:id', auth, async (req, res) => {
    try{
        let pool = await sql.connect(config.get('mssql'));
        let result = await pool.request()
            .input('input_id', sql.Numeric, req.params.id)
            .query('select * from dbo.Links where ID = @input_id');
        res.json(result['recordset'][0])
    }catch(e){
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;