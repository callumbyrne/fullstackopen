import Part from "./Part";
import { CourseParts } from "../types";

const Content = ({ parts }: { parts: CourseParts[] }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

export default Content;
