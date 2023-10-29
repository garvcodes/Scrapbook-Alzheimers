"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Import necessary hooks and functions
const Feed = () => {
  // Retrieve session data using a custom hook
  const { data: session } = useSession();

  // State to store all posts
  const [allPosts, setAllPosts] = useState([]);

  // States related to the search functionality
  const [searchText, setSearchText] = useState("");           // Text entered in the search input
  const [searchTimeout, setSearchTimeout] = useState(null);   // Timeout for debouncing the search
  const [searchedResults, setSearchedResults] = useState([]); // Results after searching

  // Fetch all posts from the API
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  console.log("Search", searchText) 
  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to filter posts based on the search text
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // Case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    
    clearTimeout(searchTimeout); // Clear any existing timeout
    setSearchText(e.target.value); // Update the search text state

    

    // Debounce the search to avoid excessive computations
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  console.log("Search", searchText) 

  // Handle when a tag is clicked
  const handleTagClick = (tagName) => {
    setSearchText(tagName); // Set the search text to the tag name
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // Render the component
  return (
    // Only render if there's a user session
    session?.user && (
      <section className='feed'>
        <form className='relative w-full flex-center'>
          <input
            type='text'
            placeholder='Filter through your memories'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>
        {/* Display the search results if there's any search text, otherwise display all posts */}
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </section>
    )
  );
};

// Export the Feed component
export default Feed;
