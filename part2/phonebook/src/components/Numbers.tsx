
interface NumbersProps {
    persons: Person[],
}

interface Person {
    name: string,
    number: string,
}

const Numbers = ({persons}: NumbersProps) => {
    return (
        <>
        <h2>Numbers</h2>
        {persons.map(person => (
            <p key={person.name}>
            {person.name} {person.number}
            </p>
        ))}
        </>
    )
}

export default Numbers;