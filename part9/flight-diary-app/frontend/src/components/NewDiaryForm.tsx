import { useState } from "react";
import type { NewDiary } from "../types.ts";

interface newDiaryProps {
  addNewDiary: (d: NewDiary) => void;
}

const NewDiaryForm = ({addNewDiary}: newDiaryProps) => {
  const [formData, setFormData] = useState<NewDiary>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
      addNewDiary(formData);
      setFormData({ date: "", weather: "", visibility: "", comment: ""});
    }} style={{display: "flex", flexDirection: "column", gap: "1rem", width: "20rem"}}>
      <input type="text" name="date" placeholder="date" value={formData.date} onChange={handleChange}/>
        <input type="text" name="weather" placeholder="weather" value={formData.weather} onChange={handleChange}/>
        <input type="text" name="visibility" placeholder="visibility" value={formData.visibility} onChange={handleChange}/>
        <textarea name="comment" placeholder="comment" value={formData.comment} onChange={handleChange} />

        <button type="submit">Add new</button>
    </form>
    </>
  );
};

export default NewDiaryForm;