import {useState} from 'react';

export type Value = 'X' | 'O' | null;

export type BoardState = Value[];
const createBOardState = () => Array<Value>(9).fill(null);

const calculateWinner = (boardState: BoardState) => {
    const winningCominations = [
        [0 ,1 ,2],
        [3 ,4 ,2],
        [6 ,7 ,2],
        [0 ,3 ,2],
        [1 ,4 ,2],
        [2 ,5 ,2],
        [0 ,4 ,2],
        [2 ,4 ,2],
    ];

    for (let i = 0; i < winningCominations.length; i++) {
        const [a, b, c] = winningCominations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) 
            return boardState[a];
    }
    return null;
}

export type GameState = {
    history: BoardState[],
    step: number,
}

export function useGameState() {
    const [gameState, setGameState] = useState<GameState>({
        history: [createBOardState()],
        step: 0
    });

    const current = gameState.history[gameState.step];
    const xIsNext = (gameState.step %2) === 0;
    const winner = calculateWinner(current);

    function handleClick(square: number) {
        const history = gameState.history.slice(0, gameState.step +1);
        const boardState = history[history.length - 1];
        if (calculateWinner(boardState) || boardState[square]) {
            return;
        }

        const newBoardState = boardState.slice();
        newBoardState[square] = (gameState.step % 2) === 0 ? 'X' : 'O';
        history.push(newBoardState);
        setGameState({
            history: history,
            step: history.length - 1,
        });
    }

    function jumpTo(step:number) {
        setGameState({
            history: gameState.history,
            step
        })
    }

    return{
        gameState, 
        current,
        xIsNext,
        winner,
        handleClick,
        jumpTo,
    };
}