const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
// const koalaRouter = require('./routes/koala.router') example of a route
const pg = require('pg');

app.use(bodyParser.urlencoded({ extended: true }));
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
app.get('/tasks', (req, res) => {
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
app.post('/tasks', (req, res) => {
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


//DELETE REQUEST🔵🔴
//⭐️I dont have a great grasp on put/delete routes
//🔵🔴this is not deleting data from the dom
app.delete('/tasks/:id', (req, res) => {
    let idToRemove = req.params.id;     //⭐️I dont really understand how the targeted id will be $1? since each id has its own id wouldnt this only target the row with the id of 1?
    let queryText = `
    DELETE FROM "tasks" WHERE "id" = $1;
    `;

    pool.query(queryText, [idToRemove])
        .then((result) => {
            console.log('in the delete route, targeting this id:', idToRemove);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error deleting id', error)
            res.sendStatus(500);
        });
});





// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
