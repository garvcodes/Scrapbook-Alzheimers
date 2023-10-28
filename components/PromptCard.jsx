"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'; 

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    return (
        <div className = "prompt_card"> 
            <div className = 'flex justify-between items-start gap-5'>
                <p>{post.prompt}</p>
            </div>

        
        </div>
    )
}

export default PromptCard