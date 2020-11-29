const {Router} = require('express');
const router = Router();
const config = require('config')
const sql = require('mssql')
const auth = require('../middleware/auth.middleware')

// /api/scheduler/load
router.get('/load/:beg/:end', auth, async (req, res) => {
    try{
        let pool = await sql.connect(config.get('mssql'));
        const beg = req.params.beg;
        const end = req.params.end;
        let result = await pool.request()
            .input('beg', sql.NVarChar, beg)
            .input('end', sql.NVarChar, end)
            .query(`SELECT d.DayOfWeek as day, l.Lesson as name, s.Num as num, s.DayID 
            FROM [dbo].[Lessons] s 
                join [dbo].[DayOfWeek] d on s.[DayID] = d.ID
                join [dbo].[Lesson] l on l.[ID] = s.LessonID
            WHERE s.DayID between @beg and @end
            ORDER BY s.DayID, s.Num`);

        res.json(result['recordset'])
    }catch(e){
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;