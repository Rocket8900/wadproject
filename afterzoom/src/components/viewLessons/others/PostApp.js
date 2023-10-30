import React, { useState } from 'react';
import PostForm from './PostForm'; // Import the PostForm component

const App = () => {
  const [posts, setPosts] = useState([]);
  const user = { name: 'John', role: 'instructor' }; // Replace with actual user data or authentication

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <h1>Post Mechanism</h1>
      {user.role === 'instructor' && ( // Render PostForm only for instructors
        <PostForm user={user} onPost={handlePost} />
      )}
      <PostList posts={posts} />
    </div>
  );
};

export default App;
