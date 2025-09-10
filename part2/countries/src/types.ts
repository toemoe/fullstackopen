export interface Country {
    name: {
      common: string
      official: string
    };
    capital?: string[];
    population: number;
    area: number;
    languages: { ara: string };
    latlng: [number, number];
    flags: {
      svg: string
      png: string
    };
}