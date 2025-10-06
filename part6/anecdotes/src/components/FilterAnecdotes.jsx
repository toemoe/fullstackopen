import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const FilterAnecdotes = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filtered = event.target.value
    dispatch(filterChange(filtered))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default FilterAnecdotes