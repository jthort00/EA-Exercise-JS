

//
// Promise
//

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

// Uso de fetch y promesas

// fetch del post 1
fetchData('https://jsonplaceholder.typicode.com/posts/1')
  .then(post => {
    console.log('Post:', post);
    // fetch del user del post 1
    return fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  })
  .then(user => {
    console.log('User:', user);
    // fetch del todos los posts del user del post 1
    return fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
  })
  .then(posts => {
    console.log(`All posts by user:`, posts);
    
    // fetch del todos comentarios de todos los posts del user del post 1
    // map devuelve un array de promesas
    const commentsPromises = posts.map(post => 
      fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    );

    // Esperamos a que todas las promesas se resuelvan
    return Promise.all(commentsPromises);
  })
  .then(comments => {
    console.log('All comments:', comments);
    result = comments.flat()
      .map(comment => comment.name)
      .join(', ');
    console.log('Result:', result);
  })
  .catch(err => {
    console.error(err);
  });
