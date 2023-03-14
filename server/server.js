const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const koalaRouter = require('./routes/koala.router') example of a route
// const pg = require('pg');this went to the pool module folder
const pool =require('./modules/pool')




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));



const tasks = require('./routes/tasks.router');
app.use('/tasks', tasks);





// let pool; put this in the pool mpdule folder

// if (process.env.DATABASE_URL) {
//     pool = new pg.Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
// }
// else {
//     pool = new pg.Pool({
//         host: 'localhost',
//         port: 5432,
//         database: 'weekend-to-do-app', 
//     });
// }
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
app.put('/tasks/:id', (req, res) => {
    console.log('inside /tasks/:id', req.params.id)
    const idToChange = req.params.id;
    const sqlText = `UPDATE tasks SET "complete" = true WHERE id=$1;`

    pool.query(sqlText, [idToChange])
        .then((result) => {
            console.log('tasks id', idToChange, 'marked')
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})

//DELETE REQUEST🔵🔴
//⭐️I dont have a great grasp on put/delete routes

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
