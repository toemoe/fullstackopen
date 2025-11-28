import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import type { DiaryEntry, NewDiaryEntry } from "../../shared/types.ts";
import NewDiaryForm from "./components/NewDiaryForm";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotificattion] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotificattion(message);
    setTimeout(() => { setNotificattion(null); }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
        setDiaries(response.data);
      } catch (err) {
        console.error("Error fetching diaries:", err);
      }
    };
    void fetchData();
  }, []);

  const addNewDiary = async (entry: NewDiaryEntry) => {
    try {
      const response = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, entry);
      setDiaries((prev) => [...prev, response.data]);
      showNotification("Add new diary");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.error || "Unknown error";
        showNotification(msg);
      } else {
        showNotification("An unexpected error occurred");
      }
    }
  };

  
  return (
    <div className="App">
      <h1>Flight Diary App</h1>
      <Notification message={notification} />
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
