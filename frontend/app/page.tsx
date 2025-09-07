"use client";

import { useState, useEffect } from "react";


  useEffect(() => {
    fetch('http://localhost:8000/api/posts/')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error)); 
  }, []);

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const response = await fetch('http://localhost:8000/api/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const newPost = await response.json();
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
  };

  const deletePost = async (id: number) => {
    await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'DELETE',
    });
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Simple Blog</h1>
      <form onSubmit={addPost} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
            style={{ padding: '8px', width: '100%', height: '100px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Add Post
        </button>
      </form>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id} 
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button
                onClick={() => deletePost(post.id)}
                style={{ padding: '5px 10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
