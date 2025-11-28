import { useState } from "react";
import { Visibility, Weather, type NewDiaryEntry } from "../../../shared/types.ts";

interface newDiaryProps {
  addNewDiary: (d: NewDiaryEntry) => void;
}

const NewDiaryForm = ({addNewDiary}: newDiaryProps) => {
  const [formData, setFormData] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
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
      setFormData({ date: "", weather: Weather.Sunny, visibility:Visibility.Great, comment: ""});
    }} style={{display: "flex", flexDirection: "column", gap: "1rem", width: "30rem"}}>
      <input type="text" name="date" placeholder="date" value={formData.date} onChange={handleChange}/>
    <fieldset>
    <legend>Weather</legend>
    {Object.values(Weather).map(w => (
      <label key={w}>
        <input
          type="radio"
          name="weather"
          value={w}
          checked={formData.weather === w}
          onChange={() => setFormData({...formData, weather: w})}
        />
        {w}
      </label>
    ))}
  </fieldset>

  <fieldset>
    <legend>Visibility</legend>
    {Object.values(Visibility).map(v => (
      <label key={v}>
        <input
          type="radio"
          name="visibility"
          value={v}
          checked={formData.visibility === v}
          onChange={() => setFormData({...formData, visibility: v})}
        />
        {v}
      </label>
    ))}
  </fieldset>
        <textarea name="comment" placeholder="comment" value={formData.comment} onChange={handleChange} />

        <button type="submit">Add new</button>
    </form>
    </>
  );
};

export default NewDiaryForm;