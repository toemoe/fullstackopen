import { useEffect, useState } from "react";
import axios from "axios";

import { apiBaseUrl } from "./constants";
import type { Diary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
        setDiaries(response.data);
      } catch (err) {
        console.error("Error fetching diaries:", err);
      }
    };
    void fetchData();
  }, []);
  
  return (
    <div className="App">
      <h1>Flight Diary App</h1>
      <button>add new</button>
      {diaries.map((d) => (
        <li key={d.id}>
        <strong>{d.date}</strong> – {d.weather}, {d.visibility}
        <p><strong>comment:</strong> {d.comment}</p>
        </li>
      ))}
    </div>
  );
};

export default App;
