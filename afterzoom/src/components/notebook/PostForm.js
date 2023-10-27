import React, { useState } from 'react';

const PostForm = ({ user, onPost }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() === '') return;
    onPost({ content: postContent, user });
    setPostContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={`Write a post as ${user.role === 'instructor' ? 'Instructor' : 'Student'}`}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
