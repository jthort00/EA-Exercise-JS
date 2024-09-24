// Promise

// HTTP Request to TODO API
fetch('https://jsonplaceholder.typicode.com/todos')
// HTTP Response to JSON
.then( response => {
  if (!response.ok)
    throw new Error(`HTTP Error (${response.status})`)
  return response.json() 
})
// JSON process
.then( json => { 
  console.log(json)
  // Filter by completed
  const completedTasks = json
    .filter( todo => todo.completed == true)
    .sort( (a, b) => b.id - a.id )
    .reduce(function (allUsers, todo) {
      return Array.from(new Set([...allUsers, todo.userId]));
    }, []);
  console.log(completedTasks)
})
.catch( err => console.log(`Error: ${err}`))



// Async await

// Async function
async function requestTODOs() {
  // HTTP Request to TODO API
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok)
    throw new Error(`HTTP Error (${response.status})`)
  // HTTP Response to JSON
  const json = await response.json();
  return json;
}

requestTODOs().then( json => {
  // JSON process
  console.log(json)
  // Filter by completed
  const completedTasks = json.filter( todo => todo.completed == true);
  console.log(completedTasks)
})