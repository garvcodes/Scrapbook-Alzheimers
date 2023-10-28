"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'; 

const PromptCard = ({ post, handleTagClick }) => (
    <div className="prompt_card">
      <p className="prompt_text">{post.prompt}</p>
      <p className="post_tag">
        <strong onClick={() => handleTagClick(post.tag)}>{post.tag}</strong>
      </p>
    </div>
  );


export default PromptCard