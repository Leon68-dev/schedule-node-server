const {Router} = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const {check, validationResult} = require('express-validator')
const router = Router();
const config = require('config')
const sql = require('mssql')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid');
//const Link = require('../models/Link');

// /api/scheduler/load
router.get('/load/:beg/:end', auth, async (req, res) => {
    try{
        let pool = await sql.connect(config.get('mssql'));
        const beg = req.params.beg;
        const end = req.params.end;
        let result = await pool.request()
            .input('beg', sql.NVarChar, beg)
            .input('end', sql.NVarChar, end)
            .query(`SELECT d.DayOfWeek as day, l.Name as name, l.Num as num, l.DayID 
            FROM [dbo].[Lessons] l join [dbo].[DayOfWeek] d on l.[DayID] = d.ID
            WHERE l.DayID between @beg and @end
            ORDER BY l.DayID, l.Num
            `);
        res.json(result['recordset'])
    }catch(e){
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


module.exports = router;