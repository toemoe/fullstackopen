interface FilterProps {
    filter: string
    onFilterChange: (value: string) => void
}

const Filter = ({filter, onFilterChange}: FilterProps) => {
    return (
        <>
        <label htmlFor="filter">filter shown with:</label>
        <input value={filter} onChange={(event) => onFilterChange(event.target.value)} id="filter"/> <br/>
        </>
    )
}

export default Filter;