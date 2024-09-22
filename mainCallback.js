//
// Callback
// Callback Hell
//

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

