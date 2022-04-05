import { CourseParts } from "../types";

const Part = ({ part }: { part: CourseParts }) => {
    return (
        <p>
            {part.name} {part.exerciseCount}
        </p>
    );
};

export default Part;
