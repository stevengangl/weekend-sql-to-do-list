//get static html set up✅
//html will need. Buttons to submit, input form to write a task✅
//get listeners✅
//add get request client side✅
//console.log after each step✅
//add get request server side✅
//console.log after each step✅
//add database to get route✅
//test data to make sure it comes back correct✅
//add post request client side✅
//console.log after each step✅
//add post request server side✅
//console.log after each step✅
//TEST data going from the server to the database back to the server✅
//append info to dom to make sure get/post routes work✅

//PUT/DELETE ROUTES
//add delete request client side
//add delete button✅
//add listener to delete button✅
//⭐️delete button needs to target an id⭐️
//add delete request server side🔵use sql to test deleting things beforehand

$(document).ready(onReady);

function onReady() {
    console.log('onReady works')
    getTasksFromDataBase()
    $("#submitBtn").on('click', sendTasksToDataBase)
    $('#tasksOnDom').on('click', '#deleteBtn', deleteTasks);
    $('#tasksOnDom').on('click', '#completeBtn', changeToComplete);

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
        if (column.complete === false) {
            $("#tasksOnDom").append(`
        <tr data-id=${column.id}>
        <td>${column.task}</td>
        <td class ='inCompleteArea'>${column.complete}</td>
        <td><button id='deleteBtn'>Delete</button>
        <button id='completeBtn'>Complete</button></td>
    
        </tr>
        `);
        }
        if (column.complete === true) {
            $("#tasksOnDom").append(`
            <tr data-id=${column.id}>
            <td>${column.task}</td>
            <td class ='completeArea'>${column.complete}</td>
            <td><button id='deleteBtn'>Delete</button>
            <button id='completeBtn'>Complete</button></td>
        
            </tr>
            `);
        }
    }
}

//POST REQUEST
function sendTasksToDataBase() {
    inputForm.task = $("#inputField").val()

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: inputForm
    })
        .then((response) => {
            console.log('post route works, here is the data it got back', response)
            getTasksFromDataBase()//this had to be here to see the get requests work
            clearInput()//this had to be here to get the inputs to clear on click
        })
        .catch((error) => {
            alert('post request failed')
        })
}

//PUT REQUEST
//I set all values of cpmpleted to default as false
//I should only need 1 function to handle this
//when complete button hit it needs to
//1️⃣the box taht say complete needs to change to green
//2️⃣complete option needs to be checked off--🔴🔵need to look into how to do this
//2️⃣--css will be needed to make those happen
//3️⃣database needs to be updated to reflect if a task is complete
function changeToComplete() {//⭐️normally i use lecture notes but i had to reference the koala project for this
    const idToChange = $(this).parent().parent().data().id;
    console.log('thing to change', idToChange)

    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToChange}`
    }).then((response) => {
        getTasksFromDataBase();
        console.log('task put route worked!')
    }).catch((error) => {
        alert('task put route didnt work')
    })

}


//DELETE REQUEST
//
//Im still  fuzzy on PUT/DELETE routes, targeting the id is confusing, but i do get the parent siblings stuff
function deleteTasks() {
    let idToDelete = $(this).parent().parent().data().id;
    console.log(idToDelete)

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then((result) => {
        console.log('successfully deleted', idToDelete)
        getTasksFromDataBase()
    }).catch((error) => {
        console.log('error deleting', error)
    })
}

function clearInput() {
    $('#inputField').val('')
}