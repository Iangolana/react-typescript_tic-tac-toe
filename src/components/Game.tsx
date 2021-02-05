import * as React from 'react';
import styled from 'styled-components';
import { useGameState, BoardState, Value } from './GameStatus';

type LayoutProps = {
    gap : number
}

const Row = styled.div<LayoutProps>`
    display: flex;
    flex-direction: Row;
    gap: ${(props) => props.gap}px;
`;

const Column = styled.div<LayoutProps>`
    display: flex;
    flex-direction: Column;
    gap: ${(props) => props.gap}px;
`;

type BoardProps = {
    board: BoardState,
    onClick: (square: number) => void
}

const Board = ({board, onClick} : BoardProps) => {

    const createProps = (square: number) : SquareProps => {
        return {
            value: board[square],
            onClick: () => onClick(square),
        }
    }

    return (
        <Column gap={0}>
        <Row gap={0}>
            <Square {...createProps(0)} />
            <Square {...createProps(1)} />
            <Square {...createProps(2)} />
        </Row>
        <Row gap={0}>
            <Square {...createProps(3)} />
            <Square {...createProps(4)} />
            <Square {...createProps(5)} />
        </Row>
        <Row gap={0}>
            <Square {...createProps(6)} />
            <Square {...createProps(7)} />
            <Square {...createProps(8)} />
        </Row>
    </Column>
    )
}

type LogProps = {
    history: BoardState[],
    jumpTo: (step: number) => void,
}

const Log = (props: LogProps) => {
    return(
        <ol>
            {props.history.map((_, index) => {
                return(
                    <li key={index}>
                        <button onClick = {() => props.jumpTo(index)} >
                                Go to { index === 0 ? 'start' : `move #${index}` }
                        </button>
                    </li>
                )
            })}
        </ol>
    )
}

const StyledSquare = styled.button`
    width: 34px;
    height: 34px;
    background: #fff;
    border: 1px dolid #999;
    padding: 0;
    font-size: 24px;
    font-weight: bold;
`;

type SquareProps = {
    value: Value,
    onClick: () => void,
}

const Square = (props: SquareProps) => {
    return(
        <StyledSquare onClick={props.onClick} >
            {props.value}
        </StyledSquare>
    )
}

const Game = () => {

    const {
        gameState, 
        current,
        xIsNext,
        jumpTo,
        winner,
        handleClick,
    } = useGameState();

    return(
        <Row gap={20}>
            <Column gap={20}>
                <div>
                    <h1>Tic Tac Toe (Morpion)</h1>
                    <h2>Les membres du groupe (IMTICIA 5) : </h2>
                    <ul>
                        <li>RAMELSON Iangolana Riantsoa n°4 </li>
                        <li>ANDRIFIONONANA Herimanambatra Seraphin n°3</li>
                        <li>RASOAHARINIRINA Sidonie Fanomezantsoa n°6</li>
                    </ul>
                    { winner ? `Winner ${winner}` : `Next Player ${xIsNext ? 'X' : 'O'}` }
                </div>
                <Board board={current} onClick={handleClick} />
            </Column>
            <Log history={gameState.history} jumpTo={jumpTo} />
        </Row>
    )
}

export default Game