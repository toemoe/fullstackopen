import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import type { Diary, NewDiary } from "./types";
import NewDiaryForm from "./components/NewDiaryForm";

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

  const addNewDiary = async (entry: NewDiary) => {
    try {
      const response = await axios.post<Diary>(`${apiBaseUrl}/diaries`, entry);
      setDiaries((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching new diary:", error instanceof Error ? error.message : error);
    }
  };
  
  
  return (
    <div className="App">
      <h1>Flight Diary App</h1>
      <NewDiaryForm addNewDiary={addNewDiary}/>
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
