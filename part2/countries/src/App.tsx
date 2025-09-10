import { useState, useEffect } from 'react'
import './styles/index.css'
import FindCountries from './components/FindCountries/FindCountries'
import CountriesService from './services/countries'
import type { Country } from './types'

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    CountriesService.getAll().then(initialCountries => {
        console.log(initialCountries)
        setCountries(initialCountries);
      })
  }, []);

  const handleSearchCountry = (value: string) => {
    setSearch(value);
  }

  const searchedCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='mainContainer'>
      <FindCountries countries={searchedCountries} search={search} onSearch={handleSearchCountry} />
    </div>
  )
}

export default App;