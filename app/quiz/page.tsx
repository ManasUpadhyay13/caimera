'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Leaderboard from '@/components/Leaderboard';

let socket: Socket | null = null;

export default function Quiz() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [name, setName] = useState<string | null>(null);
    const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!socket) {
                socket = io('https://caimera-steel.vercel.app/', { path: '/api/socket' });
            }
            const url = window.location.href || ""
            const userName = url.split("=")[1]
            if (userName) {
                setName(userName);
                socket.emit('initializeUser', userName);
            }

            socket.on('newQuestion', (newQuestion: string) => {
                setQuestion(newQuestion)
            })

            socket.on('scoreUpdate', (updatedScores: { name: string; score: number }[]) => {
                setLeaderboard(updatedScores);
            });

            return () => {
                if (socket) {
                    socket.off('newQuestion');
                    socket.off('scoreUpdate');
                }
            };
        }
    }, []);

    const submitAnswer = () => {
        if (socket && name) {
            socket.emit('submitAnswer', { answer, name });
            setAnswer('');
        }
    };

    return (
        <div className="max-w-[90rem] h-[40rem] mx-auto flex items-center justify-center ">

            <div className="flex-1  h-full flex items-center justify-center gap-8 flex-col">
                <h2>
                    <span className='text-2xl font-bold'>Question:</span>
                    <span className='text-2xl ml-4'>{question}</span>
                </h2>

                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className='border-2 border-gray-400 focus:border-gray-700 outline-none px-4 py-2 rounded-md'
                />

                <button
                    className='p-4 py-2 rounded-xl cursor-pointer bg-red-500 text-white text-md border-2 border-red-500 transition-all duration-150 hover:bg-white hover:text-red-500 '
                    onClick={submitAnswer}>
                    Submit
                </button>
            </div>

            <div className="flex-1  h-full flex items-center justify-center">
                <Leaderboard scores={leaderboard} />
            </div>
        </div>
    );
}
