import type { CountryCardProps } from "./FindCountries/FindCountries.types";
import CountryWeather from "./CountryWeather";

const CountryCard = ({country, onClose}: CountryCardProps) => {

    return (
        <div className="card">            
            <br/>{onClose && <button onClick={onClose}>close</button>}
            <h1>{country.name.common}</h1>
            <p><b>Capital: </b>{country.capital}</p>
            <p><b>Population: </b>{country.population}</p>
            <p><b>Area: </b>{country.area}</p>
            <p><b>Languages: </b></p>
            <ul>
            {Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
            </ul>
            <CountryWeather country={country}/>
            <p><b>Flag:</b><br/><br/>
            <img src={country.flags.svg} alt="flag" width={250}/>
            </p>
        </div>
    )
}

export default CountryCard;