import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion, duplicateQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let publishedQs: Question[] = questions.filter(
        (question: Question) => question.published,
    );
    return publishedQs;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let validQs: Question[] = questions.filter(
        (question: Question): boolean =>
            !(
                question.body === "" &&
                question.expected === "" &&
                question.options.length === 0
            ),
    );
    console.log("Valid qs:", validQs);
    return validQs;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    let foundQ = questions.find((question: Question) => question.id === id);
    return foundQ ? foundQ : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let filteredQuestions = questions.filter(
        (question: Question) => question.id !== id,
    );
    return filteredQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let names: string[] = questions.map(
        (question: Question): string => question.name,
    );
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let initialVal: number = 0;
    let points: number[] = questions.map(
        (question: Question): number => question.points,
    );
    let sum: number = points.reduce(
        (accumulator: number, val: number) => accumulator + val,
        initialVal,
    );
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let pQuestions: Question[] = getPublishedQuestions(questions);

    return sumPoints(pQuestions);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let stringQs: string[] = questions.map(
        (question: Question) =>
            "\n" +
            question.id.toString() +
            "," +
            question.name +
            "," +
            question.options.length.toString() +
            "," +
            question.points.toString() +
            "," +
            question.published.toString(),
    );
    let csv: string = stringQs.reduce(
        (accumulator, val) => accumulator + val,
        "id,name,options,points,published",
    );
    return csv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 *
 */
function makeBlankAnwer(id: number): Answer {
    return { questionId: id, text: "", submitted: false, correct: false };
}
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = questions.map((question: Question) =>
        makeBlankAnwer(question.id),
    );
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let publishedQs: Question[] = [];
    for (let i = 0; i < questions.length; i++) {
        let newQ: Question = { ...questions[i] };
        newQ.options = [...questions[i].options];
        newQ.published = true;
        publishedQs.push(newQ);
    }
    return publishedQs;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    return (
        questions.every(
            (question) => question.type === "multiple_choice_question",
        ) ||
        questions.every((question) => question.type === "short_answer_question")
    );
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let copyQs: Question[] = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));
    let target: number = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    console.log("Returned id:", target);
    if (target !== -1) {
        copyQs[target].name = newName;
    }
    return copyQs;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let copyQs: Question[] = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));
    let target: number = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    if (target !== -1) {
        if (
            copyQs[target].type === "multiple_choice_question" &&
            newQuestionType !== "multiple_choice_question"
        ) {
            copyQs[target].options = [];
        }
        copyQs[target].type = newQuestionType;
    }
    return copyQs;
}

function deepCopyQuestions(questions: Question[]) {
    let copyQs: Question[] = questions.map((question: Question) => ({
        ...question,
        options: [...question.options],
    }));
    return copyQs;
}
/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let copyQs: Question[] = deepCopyQuestions(questions);
    let target: number = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    if (target !== -1) {
        if (targetOptionIndex === -1) {
            copyQs[target].options.push(newOption);
        } else {
            copyQs[target].options[targetOptionIndex] = newOption;
        }
    }
    return copyQs;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let copyQs: Question[] = deepCopyQuestions(questions);
    let target: number = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    if (target !== -1) {
        let copyQ: Question = duplicateQuestion(newId, copyQs[target]);
        console.log("Copy Question ", copyQ);
        copyQs.splice(target + 1, 0, copyQ);
    }

    return copyQs;
}
