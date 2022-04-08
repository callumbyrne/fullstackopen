import { CoursePart } from "../types";

//  Helper function for exhaustive type checking
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p>{part.description}</p>
                    <hr></hr>
                </div>
            );

        case "groupProject":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p>groupProjectCount {part.groupProjectCount}</p>
                    <hr></hr>
                </div>
            );

        case "submission":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p>{part.description}</p>
                    <a href={part.exerciseSubmissionLink}>Link</a>
                    <hr></hr>
                </div>
            );

        case "special":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <p>{part.description}</p>
                    <p>Required skills: {part.requirements.join(", ")}</p>
                    <hr></hr>
                </div>
            );

        default:
            return assertNever(part);
    }
};

export default Part;
