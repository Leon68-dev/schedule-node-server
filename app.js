const express = require('express');
const config = require('config');
const sql = require('mssql');
const path = require('path');
const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));

if(process.env.NODE_ENV === 'production' ){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

async function start(){
    try{
        let pool = await sql.connect(config.get('mssql'));
        app.listen(PORT, ()=>{
            console.log(`App has been started ${PORT}...`);
        });
    } catch(e){
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
