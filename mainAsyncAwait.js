
//
// Async await
//

// Definir una función asíncrona
async function fetchData() {
  try {
    // Obtener el primer post
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!postResponse.ok) throw new Error(`HTTP error! Status: ${postResponse.status}`);
    const post = await postResponse.json();
    console.log('Post:', post);

    // Obtener el usuario basado en el userId del post
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);
    const user = await userResponse.json();
    console.log('User:', user);

    // Obtener todos los posts del usuario
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    if (!postsResponse.ok) throw new Error(`HTTP error! Status: ${postsResponse.status}`);
    const posts = await postsResponse.json();
    console.log(`All posts by user:`, posts);

    // Obtener los comentarios del primer post de la lista de posts del usuario
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
    if (!commentsResponse.ok) throw new Error(`HTTP error! Status: ${commentsResponse.status}`);
    const comments = await commentsResponse.json();
    console.log('Comments on the first post:', comments);

  } catch (error) {
    // Manejo de errores
    console.error(error);
  }
}

// Llamar a la función asíncrona
fetchData();
