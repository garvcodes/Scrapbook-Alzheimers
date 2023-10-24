"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {
    const isUserLoggedIn = true
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href = "/" className = "flex gap-2 flex-center">
            <Image 
            src = "https://mario.wiki.gallery/images/8/8b/SuperMushroom_-_2D_art.svg"
            alt = "NailFungus Logo"
            width = {30}
            height = {30}
            className = "object-contain"
            />

            <p className = "logo_text">NailFungus</p>
            </Link>
    </nav>
  )
}

export default Nav