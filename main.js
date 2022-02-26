
// Promise
console.log("Promise");

// HTTP Request to TODO API
fetch('https://jsonplaceholder.typicode.com/todos')
// HTTP Response to JSON
.then( (response) => { 
  return response.json();
})
// JSON process
.then( (json) => { 
  console.log(json)
  // Filter by completed
  const completedTasks = json.filter( todo => todo.completed == true);
  console.log(completedTasks)
})



// Async await

console.log("async / await");

// Async function
async function requestTODOs() {
  // HTTP Request to TODO API
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  // HTTP Response to JSON
  const json = await response.json();
  return json;
}

requestTODOs().then( (json) => {
  // JSON process
  console.log(json)
  // Filter by completed
  const completedTasks = json.filter( todo => todo.completed == true);
  console.log(completedTasks)
})