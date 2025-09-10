import PrintCountries from "./PrintCountries";
import type { FindCountriesProps } from "./FindCountries.types";

const FindCountries = ({ countries, search, onSearch }: FindCountriesProps) => {
    return (
      <div className="countriesList">
        <label htmlFor="country">Find countries:</label>
        <input id="country" value={search} onChange={(event) => onSearch(event.target.value)}/>
        <PrintCountries countries={countries} search={search} onSearch={onSearch}/>
      </div>
    );
};
  

export default FindCountries;