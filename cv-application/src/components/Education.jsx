
import { useState } from "react";

function Education({ onSubmit, savedData }) {
  const [school, setSchool] = useState(savedData.school || "");
  const [degree, setDegree] = useState(savedData.degree || "");
  const [study, setStudy] = useState(savedData.study || "");
  const [startDate, setStartDate] = useState(savedData.startDate || "");
  const [endDate, setEndDate] = useState(savedData.endDate || "");
  const [isEditing, setIsEditing] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({ school, degree, study, startDate, endDate });
    setIsEditing(false);
  }

  return (
    <section className="form-section">
      <h2>Educational Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>School / College</label>
          <input
            type="text"
            value={school}
            onChange={(event) => setSchool(event.target.value)}
            placeholder="Enter school or college"
            required
          />

          <label>Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(event) => setDegree(event.target.value)}
            placeholder="e.g. Bachelor's Degree"
            required
          />

          <label>Field of Study</label>
          <input
            type="text"
            value={study}
            onChange={(event) => setStudy(event.target.value)}
            placeholder="e.g. Computer Engineering"
            required
          />

          <label>Start Date</label>
          <input
            type="text"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            placeholder="e.g. 2023"
            required
          />

          <label>End Date</label>
          <input
            type="text"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            placeholder="e.g. 2027"
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>School:</strong> {savedData.school}</p>
          <p><strong>Degree:</strong> {savedData.degree}</p>
          <p><strong>Study:</strong> {savedData.study}</p>
          <p><strong>Dates:</strong> {savedData.startDate} - {savedData.endDate}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default Education;