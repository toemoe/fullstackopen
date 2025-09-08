import type { PartType } from "../types"

interface PartProps {
    part: PartType,
}

const Part = ({part}: PartProps) => {
    return (
        <>
        <p>{part.exercises} {part.name}</p>
        </>
    )
}

export default Part;