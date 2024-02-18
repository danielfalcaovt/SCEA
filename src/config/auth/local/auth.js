import express from 'express';
import pg from "pg";
import bodyParser from 'body-parser';
import env from "dotenv";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
env.config();

const db = new pg.Client({
    user:process.env.PG_USER,
    hostname:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT
});
db.connect();


const Authenticate = passport.use("local",new Strategy( async function verify(username,password,cb){
    try{
        const user = await db.query("SELECT * FROM users WHERE email = $1",[username]);
        if (user.rows.length > 0){
            const userPassword = user.rows[0].password;
            bcrypt.compare(password,userPassword,(err,success)=>{
                if(err){
                   return cb(err);
                }else{
                    if(success){
                       return cb(null,user.rows[0]);
                    }else{
                       return cb(null,false);
                    }
                }
            })}else{
               return cb(null,false);
            };
    }catch(err){
        console.log(err);        
    }
}))

export default Authenticate;