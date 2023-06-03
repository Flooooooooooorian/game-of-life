import React, {useEffect, useState} from 'react';
import './App.css';
import {nextCycle} from "./gameOfLifeService";

function App() {

    const [cells, setCells] = React.useState<number[][]>(Array(80).fill(Array(80).fill(0)))
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [cycleCount, setCycleCount] = useState(0)
    const [auto, setAuto] = React.useState<boolean>(false)
    const [speed, setSpeed] = useState(5)

    useEffect(() => {
        drawCells()
    }, [cells])

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined
        if (auto) {
            timer = setTimeout(() => {
                handleNextCycle()
            }, (11 - speed) * 100)
        }
        else {
        }
        return () => {
            clearTimeout(timer)
        }
    }, [auto, cells])

    const drawCells = () => {
        const context = canvasRef.current!.getContext('2d')!
        context.clearRect(0, 0, 500, 500)

        for (let y = 0; y < cells.length; y++) {
            const row = cells[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                //console.log("draw: ", x, y, cell)
                if (cell) {
                    drawDot(x * 10, y * 10, 'black')
                } else {
                    drawBorder(x * 10, y * 10)
                }
            }
        }
    }

    const drawDot = (x: number, y: number, color: string) => {
        const context = canvasRef.current!.getContext('2d')!

        context.fillStyle = color
        context.fillRect(x, y, 10, 10)
    }

    const drawBorder = (x: number, y: number) => {
        const context = canvasRef.current!.getContext('2d')!

        context.fillStyle = 'white'
        context.strokeStyle = 'grey'
        context.fillRect(x + 1, y + 1, 8, 8)
        context.strokeRect(x, y, 10, 10)
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        const x = Math.floor((event.clientX - canvasRef.current!.offsetLeft) / 10)
        const y = Math.floor((event.clientY - canvasRef.current!.offsetTop) / 10)

        //console.log("x: ", x, "y: ", y)
        setCells(prevState => {
            const newState = prevState.map((row) => [...row])
            newState[y][x] = newState[y][x] ? 0 : 1
            return newState
        })
    }

    const handleNextCycle = () => {
        setCycleCount(prevState => prevState + 1)
        setCells(prevState => {
            return nextCycle(prevState)
        })
    }

    return (
        <div className="App">
            <p>Conways Game of Life</p>
            <canvas ref={canvasRef} width={800} height={800} style={{border: "1px solid black"}} onClick={handleClick}/>
            <p>{cycleCount}</p>
            <button onClick={handleNextCycle}>Next</button>
            <button onClick={() => setAuto(prevState => !prevState)}>{auto ? "Stop" : "Play"}</button>
            <input min={1} max={10} type={"range"} value={speed}
                   onChange={event => setSpeed(Number(event.target.value))}/>
        </div>
    );
}

export default App;
