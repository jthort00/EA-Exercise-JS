// Callback Hell

// Función para hacer una solicitud a la API
function fetchData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4) {
      callback(`Error: ${xhr.status}`);
    }
  };
  xhr.send();
}

// Inicio del callback hell
// fetch del post 1
fetchData('https://jsonplaceholder.typicode.com/posts/1', (err, post) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Post:', post);

  // fetch del user del post 1
  fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`, (err, user) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('User:', user);

    // fetch del todos los posts del user del post 1
    fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`, (err, posts) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`All posts by user ${user.name}:`, posts);

      // fetch del todos comentarios del primer post del user del post 1
      fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`, (err, comments) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Comments on the first post:', comments);
      });
    });
  });
});



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
.catch( err => console.log(`Error: ${err}`))