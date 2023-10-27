'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

import React from 'react'

const CreateMemory = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createMemory = async (e) =>{

    }

  return (
    <Form
        type = "Create"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {createPrompt}
        />
  )
}

export default page