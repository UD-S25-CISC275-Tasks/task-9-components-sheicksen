import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [dieOneSide, setDieOneSide] = useState(6);
    const [dieTwoSide, setDieTwoSide] = useState(4);

    return (
        <div>
            {dieOneSide === dieTwoSide ?
                dieOneSide === 1 ?
                    <p>Lose</p>
                :   <p>Win</p>
            :   <p>Roll</p>}
            <Button
                onClick={() => {
                    setDieOneSide(d6);
                }}
            >
                Roll Left
            </Button>
            <Button
                onClick={() => {
                    setDieTwoSide(d6);
                }}
            >
                Roll Right
            </Button>
            <br></br>
            <span data-testid="left-die">{dieOneSide}</span>
            <span data-testid="right-die">{dieTwoSide}</span>
        </div>
    );
}
