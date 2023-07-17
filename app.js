import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

export class App{
    constructor(){
        this.app = express();
    }

    setup(){
        this.app.use(cors({
            origin:'*'
        }));
        this.app.use(cookie());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }

    connetDB(){
        
    }

    runServer(){
        this.app.listen(process.env[PORT],()=>{
            console.log(`Server is running on http://localhost:${process.env[PORT]}`);
        })
    }
}