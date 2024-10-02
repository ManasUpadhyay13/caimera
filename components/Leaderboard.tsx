interface LeaderboardProps {
    scores: { name: string; score: number }[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
    return (
        <div className=" flex flex-col gap-4">
            <span>
                For every right answer +5 points <br />
                Wrong answer -2 points
            </span>
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <ul className="flex flex-col gap-3">
                {scores.map((user, index) => (
                    <li key={index}>
                        <span className="text-2xl font-bold">{user.name}:</span>
                        <span className="text-2xl ml-4">{user.score} points</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
