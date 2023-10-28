"use client";

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession(); // Access the user's session

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // You can use the searchText here to filter or perform search operations
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt'); // Fixed typo in the API endpoint
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error if fetch fails
      }
    };
    fetchPosts();
  }, []);

  // Render the feed only if the user is logged in (session exists)
  return (
    <>
      {session && (
        <section className="feed">
          <form className="relative w-full flex-center">
            <input
              type="text"
              placeholder="Search through your memories here"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="search_input peer"
            />
          </form>

          <PromptCardList
            data={posts}
            handleTagClick={() => {}}
          />
        </section>
      )}
    </>
  );
};

export default Feed;
