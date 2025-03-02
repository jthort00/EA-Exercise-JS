console.log("Inicio");

// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios de un post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

function fetchOrderDetails() {
  getUser(1)
    .then(user => {
      return getPosts(user.id).then(posts => {
        return { user, posts };
      });
    })
    .then(data => {
      console.log("Usuario obtenido:", data.user.name);
      console.log(`El usuario tiene ${data.posts.length} posts.`);

      // Usar map para obtener los títulos de los posts
      const postTitles = data.posts.map(post => post.title);
      console.log("Títulos de los posts:", postTitles);

      return getComments(data.posts[0].id).then(comments => {
        return { posts: data.posts, comments };
      });
    })
    .then(data => {
      console.log("Comentarios del primer post:", data.comments);

      // Usar filter para encontrar comentarios largos (>50 caracteres)
      const longComments = data.comments.filter(comment => comment.body.length > 50);
      console.log(`Comentarios largos en el primer post: ${longComments.length}`);

      // Usar reduce para contar el número total de comentarios
      const totalComments = data.comments.reduce(count => count + 1, 0);
      console.log(`Total de comentarios en el primer post: ${totalComments}`);

      console.log("Fin");
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

console.log("Inicio");

fetchOrderDetails();
