

//
// Promise
//

// Importar fetch en Node.js
//const fetch = require('node-fetch');

// Función que hace una solicitud a la API usando fetch y devuelve una promesa
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(err => {
      throw new Error(`Fetch error: ${err.message}`);
    });
}

// Uso de fetch y promesas para evitar el callback hell
fetchData('https://jsonplaceholder.typicode.com/posts/1')
  .then(post => {
    console.log('Post:', post);
    return fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  })
  .then(user => {
    console.log('User:', user);
    return fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
  })
  .then(posts => {
    console.log(`All posts by user:`, posts);
    return fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
  })
  .then(comments => {
    console.log('Comments on the first post:', comments);
  })
  .catch(err => {
    console.error(err);
  });
