const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const connector = require('./database/db.js');
const config = require('./config.js');

class App{
    constructor(){
        this.app = express();
        this.connector = connector;
    }

    setup(){
        this.app.use(cors({
            origin:'*'
        }));
        this.app.use(cookie());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    runServer(){
        this.app.listen(config.server.port,()=>{
            console.log('🔥'.repeat(40));
            console.log(`Server is running on http://localhost:${config.server.port}`);
            console.log('🔥'.repeat(40));
        })
    }
}

module.exports=App;