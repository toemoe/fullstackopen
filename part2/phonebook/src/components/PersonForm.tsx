interface PersonFormProps {
    addPerson: (event: React.FormEvent<HTMLFormElement>) => void;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    newName: string;
    newNumber: string;
}

const PersonForm = ({addPerson, handleNameChange, handleNumberChange, newName, newNumber}: PersonFormProps) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">name:</label> <input value={newName} onChange={handleNameChange} id="name"/> <br/>
          <label htmlFor="number">number:</label> <input value={newNumber} onChange={handleNumberChange} id='number'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;