import Part from "./Part";

interface PartType {
    name: string;
    exercises: number;
}

interface ContentProps {
    parts: PartType[];
}

const Content = ({parts}: ContentProps) => {
    return (
        <>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
        </>
    )
}

export default Content;