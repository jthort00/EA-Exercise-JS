
//
// Async await
//

// Función que hace una solicitud a la API usando fetch y devuelve una promesa
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Fetch error: ${err.message}`);
  }
}

// Definir una función asíncrona
async function fetchComments() {
  try {
    // Obtener el primer post
    const post = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Post:', post);

    // Obtener el usuario basado en el userId del post
    const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    console.log('User:', user);

    // Obtener todos los posts del usuario
    const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    console.log(`All posts by user:`, posts);

    // Obtener todos los comentarios de todos posts del usuario
    // map devuelve un array de promesas
    const commentsPromises = posts.map(post => 
      fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
    );
    const comments = await Promise.all(commentsPromises);
    console.log('All comments by user:', comments);
    result = comments.flat()
      .map(comment => comment.name)
      .join(', ');
    console.log('Result:', result);
  } catch (error) {
    // Manejo de errores
    console.error(error);
  }
}

// Llamar a la función asíncrona
fetchComments();
