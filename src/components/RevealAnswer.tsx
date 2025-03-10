import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <Button
                onClick={() => {
                    setIsVisible(!isVisible);
                }}
            >
                Reveal Answer
            </Button>
            {isVisible && <p>42</p>}
        </div>
    );
}
