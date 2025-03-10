import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

interface ChangeColorProps {
    changeColor: () => void;
}

function ChangeColor({ changeColor }: ChangeColorProps): React.JSX.Element {
    return <Button onClick={changeColor}>Next Color</Button>;
}

function ColorPreview({ colorInd }: { colorInd: number }): React.JSX.Element {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: COLORS[colorInd],
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px",
            }}
        ></div>
    );
}

export function ColoredBox(): React.JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    const increaseColor = () => {
        setColorIndex((1 + colorIndex) % COLORS.length);
    };
    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {COLORS[DEFAULT_COLOR_INDEX]}</span>
            <div>
                <ChangeColor changeColor={increaseColor}></ChangeColor>
                <ColorPreview colorInd={colorIndex}></ColorPreview>
            </div>
        </div>
    );
}
