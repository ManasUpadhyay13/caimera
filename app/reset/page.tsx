'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import io from 'socket.io-client';

const Reset = () => {

    const router = useRouter()

    useEffect(() => {
        let socket = io('http://localhost:3000', { path: '/api/socket' });
        socket.emit('resetLeaderboard');
        router.push("/")
    })

    return (
        <div></div>
    )
}

export default Reset