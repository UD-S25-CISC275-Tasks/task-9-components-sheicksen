import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [numAttempts, setNumAttempts] = useState(4);
    const [quizInProgress, setQuizInProgress] = useState(false);
    function startQuiz() {
        setQuizInProgress(true);
        setNumAttempts(numAttempts - 1);
    }
    return (
        <div>
            <Button
                onClick={() => {
                    startQuiz();
                }}
                disabled={quizInProgress || numAttempts === 0}
            >
                Start Quiz
            </Button>
            <Button
                onClick={() => {
                    setQuizInProgress(false);
                }}
                disabled={!quizInProgress}
            >
                Stop Quiz
            </Button>
            <Button
                onClick={() => {
                    setNumAttempts(numAttempts + 1);
                }}
                disabled={quizInProgress}
            >
                Mulligan
            </Button>
            <br />
            Remaining attempts: {numAttempts}
        </div>
    );
}
