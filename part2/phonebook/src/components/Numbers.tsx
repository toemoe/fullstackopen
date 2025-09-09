import type { Person } from "../types.ts";

interface NumbersProps {
    persons: Person[],
    deletePerson: (id: string, name: string) => void,
}

const Numbers = ({persons, deletePerson}: NumbersProps) => {
    return (
        <>
        <h2>Numbers</h2>
        {persons.map(person => (
            <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </p>
        ))}
        </>
    )
}

export default Numbers;