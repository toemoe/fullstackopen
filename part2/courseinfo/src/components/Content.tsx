import Part from "./Part";
import type { PartType } from "../types";

interface ContentProps {
    parts: PartType[]
}

const Content = ({parts}: ContentProps) => {
    return (
        <>
        {parts.map((part, index) => (
            <Part part={part} key={index}/>
        ))}
        </>
    )
}

export default Content;