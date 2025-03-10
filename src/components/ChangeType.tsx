import React, { useState } from "react";
import { QuestionType } from "../interfaces/question";
import { Button } from "react-bootstrap";

export function ChangeType(): React.JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        "short_answer_question",
    );
    return (
        <div>
            <Button
                onClick={() => {
                    setQuestionType(
                        questionType === "short_answer_question" ?
                            "multiple_choice_question"
                        :   "short_answer_question",
                    );
                }}
            >
                Change Type
            </Button>
            {questionType === "short_answer_question" ?
                <p>Short Answer</p>
            :   <p>Multiple Choice</p>}
        </div>
    );
}
