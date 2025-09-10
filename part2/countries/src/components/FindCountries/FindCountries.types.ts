import type { Country } from "../../types";

export interface FindCountriesProps {
    countries: Country[];
    search: string;
    onSearch: (country: string) => void;
}

export interface CountryCardProps {
    country: Country;
    onClose?: () => void;
}