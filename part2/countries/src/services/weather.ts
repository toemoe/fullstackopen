import axios from "axios"

export interface WeatherData {
    temperature: number
    precipitation: number
    clouds: number
}

const getWeather = (lat: number, lon: number): Promise<WeatherData> => {
    const baseUrl = `https://api.open-meteo.com/v1/forecast`;
    const request = axios.get(baseUrl, {
        params: {
            latitude: lat,
            longitude: lon,
            hourly: "temperature_2m,precipitation,cloudcover",
            timezone: "auto"
        }
    }).then(response => {
        const hourly = response.data.hourly;
        const index = hourly.time.findIndex((t: string) => new Date(t) > new Date());
        if (!hourly.temperature_2m.length) throw new Error("No weather data found");
        return {
            temperature: hourly.temperature_2m[index],
            precipitation: hourly.precipitation[index],
            clouds: hourly.cloudcover[index],
        };
    });

    return request;
}

export default { getWeather }