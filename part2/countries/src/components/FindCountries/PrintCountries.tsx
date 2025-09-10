import type { Country } from "../../types";
import type { FindCountriesProps } from "./FindCountries.types";
import { useState } from "react";
import CountryCard from "../CountryCard";

const PrintCountries = ({countries}: FindCountriesProps) => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleClickShowCard = (country: Country) => {
        setSelectedCountry(country);
    }

    if (selectedCountry) {
        return (
            <CountryCard country={selectedCountry} onClose={() => setSelectedCountry(null)}/>
        )
    }

    return (
        <div className="list">
            {countries.length > 10 ? (
                <p>Too many matches, specify another filter</p>)
                : countries.length === 1 ? (
                    <CountryCard country={countries[0]}/>
                ) :
                countries.map(country => (
                <div className="countryName">
                <p key={country.name.common}>{country.name.common}
                </p>
                <button onClick={() => handleClickShowCard(country)}>Show</button>
                </div>
            ))}
      </div>
    )
}

export default PrintCountries;