import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import env from "dotenv";
import ejs from "ejs";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
import Authenticate from '../config/auth/local/auth.js';
import path from "path";

env.config();

const db = new pg.Client({
    user:process.env.PG_USER,
    hostname:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT
});
db.connect();

const app = express();
const port = 3500;
const __dirname = import.meta.dirname;

app.set('views', path.join(__dirname, '../shared/views'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
      saveUninitialized: true,
    })
    );

    
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../shared/public")));

app.get("/",async(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("/consulta");
    }else{
        res.redirect("/login");
    }
});
app.get("/cadastro", async (req,res)=>{
    if(req.isAuthenticated()){
        try{
         const userid = req.user.id;
         const result = await db.query("SELECT * FROM posts");
         if (result.rows.length > 0){

             const cadastrados = result.rows;
             res.render("index.ejs",{
                 products:cadastrados,
                 cadastro:true
                });
         }else{
            res.render("index.ejs",{
                cadastro:true
            });
         }
        }catch(err){
             console.log(err);
        }
    }else{
        res.redirect("/login");
     }
});


app.post("/cadastro",async(req,res)=>{
    if (req.isAuthenticated()){
        const userid = req.user.id;
        const produto = req.body.produto.trim();
        const price = parseFloat(req.body.price.trim()).toFixed(2);
        const estoque = req.body.estoque.trim();

        let checkHave = await db.query("SELECT * FROM posts WHERE (produto = $1 AND estoque = $2)",[produto,estoque]);
        if (checkHave.rows.length > 0){
            console.log('Already registered.');
        }else{
            await db.query("INSERT INTO posts(produto,estoque,userid,price) VALUES($1,$2,$3,$4)",[produto,estoque,userid,price]); 
        }
        res.redirect("/cadastro");
    }else{
        res.redirect("/login");
    }
});

app.get("/alterar", async(req,res)=>{
    if (req.isAuthenticated()){
        const userData = await db.query("SELECT * FROM posts");
        console.log(userData.rows.length);

        if(userData.rows.length > 0){
            res.render("index.ejs",{
                products:userData.rows,
                alterar:true
            });    
        }else{
            res.render("index.ejs",{
                alterar:true
            });
        }

    }else{
        res.redirect("/login");
    }
});

app.post("/alterar", async(req,res)=>{
    if (req.isAuthenticated()){
        let matricula = req.body.produto;
        const check = await db.query("SELECT * FROM posts WHERE id = $1",[matricula]);
        if(check.rows.length > 0){
            let valor;
            let estoque;
            if (req.body.price) {
                valor = req.body.price;
            }else{
                valor = check.rows[0].price;
            }
            if(req.body.estoque){
                estoque = req.body.estoque;
            }else{
                estoque = check.rows[0].estoque;
            }
            const alterado = await db.query("UPDATE posts SET estoque = $1, price = $2 WHERE id = $3 RETURNING *",[estoque,valor,matricula]);
            res.redirect("/alterar");
        }else{
            res.redirect("/alterar");
        }
    }else{
        res.redirect("/login");
    }
});

app.get("/consulta",async(req,res)=>{
    if(req.isAuthenticated()){
        try{
         const userid = req.user.id;
         const result = await db.query("SELECT * FROM posts");
         const cadastrados = result.rows;
         if (cadastrados.length > 0) {
             res.render("index.ejs",{
                 products:cadastrados,
                 consulta:true
             });
         }else{
            res.render("index.ejs",{
                consulta:true
            });
        }
        }catch(err){
             console.log(err);
        }
     }else{
         res.redirect("/login");
     }    
})
app.post("/consulta",async(req,res)=>{
    if(req.isAuthenticated()){
        const userData = req.body.produto;
        const goodData = Number(userData);
        let result = await db.query('SELECT * FROM posts WHERE id = $1',[`${goodData}`]);
        if (result.rows.length == 1){
            const produto = result.rows[0];
            res.render("index.ejs",{
                products:produto,
                consulta:true
            })
        }else if (result.rows.length > 1){
            const produtos = result.rows;
            res.render("index.ejs",{
                products:produtos,
                consulta:true
            });
        }else{
            res.redirect("/consulta");
        };
    }else{
        res.redirect("/login");
    };
});

app.get("/delete",async(req,res)=>{
    if (req.isAuthenticated()){
        try{
        const result = await db.query("SELECT * FROM posts");
            if (result.rows > 0){
                const cadastrados = result.rows;
                res.render("index.ejs",{
                    products:cadastrados,
                    delete:true
                });
            }else{
                // NÃO HÁ OQUE DELETAR.
                res.redirect(303,"/cadastro");
            };
           }catch(err){
                console.log(err);
           };
    }else{
        res.redirect("/login");

    };
});
app.post("/delete",async(req,res)=>{
    if (req.isAuthenticated()){
        const email = req.user.email;
        const checkAdmin = await db.query("SELECT * FROM users WHERE email = $1 AND admin = $2",[email,'Y']);
        if (checkAdmin.rows.length > 0){
            try{
                const userData = req.body.produto;
                const dadosTratados = Number(userData.trim());
                const check = await db.query("SELECT * FROM posts WHERE id = $1",[dadosTratados]);
                if (check.rows.length > 0){
                    const deleting = await db.query("DELETE FROM posts WHERE id = $1",[dadosTratados]);
                    res.redirect("/delete");
                }else{
                    res.redirect("/delete");
                }
            }catch(err){
                    console.log(err);
               }
        }else{
            res.send("You do not have permission to do that.");
            
        }
    }else{
        res.redirect("/login");

    };
});

app.get('/login',(req,res)=>{
    res.render("login.ejs");
}); 
app.post("/api/login", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}));

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.post("/register", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(password.length === 0){
        res.send("Password cannot be empty.")
    }else{
    const user = await db.query("SELECT * FROM users WHERE email = $1",[username]);
    if (user.rows.length > 0){
        console.log('You re already registered.');
        res.redirect("/login");
    }else{
        bcrypt.hash(password.trim(),10, async (err,hash)=>{
            const user = await db.query("INSERT INTO users(email,password,admin) VALUES($1,$2,$3) RETURNING *",[username,hash.trim(),"N"]);
            console.log(user.rows[0]);
            res.render("index.ejs");
        });
    }}
});

passport.serializeUser((user, cb) => {
    cb(null, user);
});
  
passport.deserializeUser((user, cb) => {
    cb(null, user);
});  

app.all("*",(req,res)=>{
    res.redirect("/")
    res.status(404);
});

app.listen(port,()=>{
    console.log(`Server is listening in ${port} port.`);
});

