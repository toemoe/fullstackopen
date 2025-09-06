interface PartProps {
    part: {
        name: string;
        exercises: number;
    };
}


const Part = ({part}: PartProps) => {
    return (
        <>
        <p>{part.exercises} {part.name}</p>
        </>
    )
}

export default Part;