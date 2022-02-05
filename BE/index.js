const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "gdsc"
})

const app = express();
app.use(bodyParser.json());

app.post('/movies', (req, res) => {
    const { body } = req;
    if(body?.title && body?.year && body?.poster_link){
        const sql_command = 'INSERT INTO movies (title, year, poster_link) VALUES ("${body.name}", "${body.year}", "${body.poster_link}")';
        connection.query(sql_command, (error, result) => {
            if(error) res.json(error);
            console.log("berhasil menambah 1 kolom di tabel movies");
        }) ;
        res.status(200).send();
    }else{
        res.status(400).send(); 
    }
})

app.get('/movies', (req, res) => {
    const sql_command = 'SELECT * FROM movies';
    connection.query(sql_command, (error, result) => {
        if (error) res.json(error);
        res.json(result);
    });
})

app.post('/wishlists', (req, res) => {
    const { body } = req;
    if(body?.id_user && body?.id_movie){
        const sql_command = 'INSERT INTO wishlists (id_user, id_movie) VALUES ("${body.id_user}", "${body.id_movie}")';
        connection.query(sql_command, (error, result) => {
            if(error) res.json(error);
            console.log("berhasil menambah 1 kolom di tabel wishlists");
        }) ;
        res.status(200).send();
    }else{
        res.status(400).send(); 
    }
})

app.get('/wishlists', (req, res) => {
    const sql_command = 'SELECT * FROM wishlists';
    connection.query(sql_command, (error, result) => {
        if (error) res.json(error);
        res.json(result);
    });
})

app.post('/users', (req, res) => {
    const { body } = req;
    if(body?.username && body?.password){
        const sql_command = 'INSERT INTO users (username, password) VALUES ("${body.username}", "${body.password}")';
        connection.query(sql_command, (error, result) => {
            if(error) res.json(error);
            console.log("berhasil menambah 1 kolom di tabel users");
        }) ;
        res.status(200).send();
    }else{
        res.status(400).send(); 
    }
})

app.get('/users', (req, res) => {
    const sql_command = 'SELECT * FROM users';
    connection.query(sql_command, (error, result) => {
        if (error) res.json(error);
        res.json(result);
    });
})

