import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

    let question, answer;
    if (operator === '+') {
        question = `${num1} + ${num2}`;
        answer = (num1 + num2).toString();
    } else if (operator === '-') {
        question = `${num1} - ${num2}`;
        answer = (num1 - num2).toString();
    } else if (operator === '*') {
        question = `${num1} * ${num2}`;
        answer = (num1 * num2).toString();
    }

    return { question, answer };
}

let currentQuestion = generateQuestion();
let scores: Record<string, number> = {};

export default function handler(req: NextApiRequest, res: any) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            socket.emit('newQuestion', currentQuestion.question);

            socket.on('initializeUser', (name: string) => {
                if (!scores[name]) {
                    scores[name] = 0;
                    io.emit('scoreUpdate', getSortedScores());
                }
            });

            socket.on('submitAnswer', ({ answer, name }) => {
                if (answer === currentQuestion.answer) {
                    if (!scores[name]) scores[name] = 0;
                    scores[name] += 5;

                    io.emit('scoreUpdate', getSortedScores());

                    currentQuestion = generateQuestion();
                    io.emit('newQuestion', currentQuestion.question);
                } else {
                    scores[name] = scores[name] ? scores[name] - 2 : -2;
                    io.emit('scoreUpdate', getSortedScores());
                }
            });

            socket.on('resetLeaderboard', () => {
                scores = {};
                io.emit('scoreUpdate', getSortedScores());
            });
        });
    }

    res.end();
}

// sorting the leader board
function getSortedScores() {
    return Object.entries(scores)
        .map(([name, score]) => ({ name, score }))
        .sort((a, b) => b.score - a.score);
}
