const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
// const koalaRouter = require('./routes/koala.router') example of a route
const pg = require('pg');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
});

// let testObject = {
//     inputOne: 1,
//     inputTwo: 2
// }

//GET REQUEST
app.get('/tasks', (req,res) => {
    let queryText = `SELECT * FROM "tasks";`;
    console.log('get server side is working', queryText)

    pool.query(queryText)
    .then((result) => {
        console.log('info from database:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`error making query ${queryText}`, error);
        res.sendStatus(500);
    })
    
})

//POST REQUEST
app.post('/tasks', (req,res) => {
    let newTasks = req.body
    console.log('in POST request', req.body)
    console.log('new tasks:', newTasks)

    let queryText = `INSERT INTO "tasks" ("task", "complete") 
    VALUES ($1, $2)`;

    pool.query(queryText, [newTasks.task, false])
    .then((result) => {
console.log('success adding new data', newTasks)
res.sendStatus(201)
    })
    .catch((error) => {
        console.log('error adding new tasks', error)
        res.sendStatus(500)
    })
})


//PUT REQUEST


//DELETE REQUEST



























// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  