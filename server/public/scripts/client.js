//get static html set up✅
//html will need. Buttons to submit, input form to write a task✅
//get listeners✅
//add get request client side✅
//console.log after each step✅

//add get request server side✅
//console.log after each step✅
//add database to get route✅
//test data to make sure it comes back correct✅

//add post request client side
//console.log after each step

//add post request server side
//console.log after each step

//TEST data going from the server to the database back to the server

//append info to dom to make sure get/post routes work


$(document).ready(onReady);

function onReady() {
    console.log('onReady works')
    getTasksFromDataBase()
    $("#submitBtn").on('click', sendTasksToDataBase)
}

let inputForm = {
    task: ''
};
//make a get request to test getting data back and forth

//GET REQUEST
function getTasksFromDataBase() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('get request worked, here is the data it sent back', response)
        renderToDom(response)
    }).catch((error) => {
        alert('get request failed', error)
    })
}

function renderToDom(tasks) {
    //need to empty the table so it appends a fresh data every time
    $('#tasksOnDom').empty()

    //need to add all the tasks to the table
    for (let column of tasks) {
        //I will need to target the ids to delete stuff
        //🔴🔵not tpositive if this set up is correct for it🔴🔵
        $("#tasksOnDom").append(`
        <tr data-id=${column.id}>
        <td>${column.task}</td>
        <td>${column.complete}</td>
        <td><button id='deleteBtn'>Delete</button><button id='completeBtn'>Complete</button></td>
       

        </tr>
        `)
    }
}



//
//POST REQUEST
function sendTasksToDataBase() {
    inputForm.task = $("#inputField").val()
    // console.log('listener works')
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: inputForm
    })
        .then((response) => {
            console.log('post route works, here is the data it got back', response)
            getTasksFromDataBase()//this had to be here to see the get requests work
        })
        .catch((error) => {
            alert('post request failed')
        })
}

//PUT REQUEST

//DELETE REQUEST
