import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Chinese NY, St. Patties Day, Halloween, Krampus Day, Christmas
type holidays = "🐉" | "🍀" | "🎃" | "🐐" | "🎄";
const holidayTime: Record<holidays, holidays> = {
    "🐉": "🍀",
    "🍀": "🎃",
    "🎃": "🐐",
    "🐐": "🎄",
    "🎄": "🐉",
};
const holidayAlph: Record<holidays, holidays> = {
    "🐉": "🎄",
    "🎄": "🎃",
    "🎃": "🐐",
    "🐐": "🍀",
    "🍀": "🐉",
};

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<holidays>("🎃");
    return (
        <div>
            Cycle Holiday
            <br></br>
            <Button
                onClick={() => {
                    setHoliday(holidayTime[holiday]);
                }}
            >
                Advance by Year
            </Button>
            <Button
                onClick={() => {
                    setHoliday(holidayAlph[holiday]);
                }}
            >
                Advance by Alphabet
            </Button>
            <br />
            <span style={{ fontSize: "60px" }}>Holiday: {holiday}</span>
        </div>
    );
}
