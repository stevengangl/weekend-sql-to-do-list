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

//append info to dom to make sure get/post routes work


$(document).ready(onReady);

function onReady(){
 console.log('onReady works')
 $("#submitBtn").on('click', sendTasksToDataBase)
}

//make a get request to test getting data back and forth

//GET REQUEST
function getTasksFromDataBase(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then ((response) => {
        console.log('get request worked, here is the data it sent back', response)
      renderToDom(response)
    }).catch((error) => {
        alert('get request failed', error)
    })
}

function renderToDom(tasks){
    //need to empty the table so it appends a fresh data every time
    $('#tasksOnDom').empty()

    //need to add all the tasks to the table
    for(let column of tasks){
        $("#tasksOnDom").append(`
        <tr>
        <td>${column.task}</td>
        <td> ${column.complete}</td>
        </tr>
        `)
    }
}




//POST REQUEST
function sendTasksToDataBase(){
    console.log('listener works')

    getTasksFromDataBase()//this had to be here to see the get requests work

}

//PUT REQUEST

//DELETE REQUEST
