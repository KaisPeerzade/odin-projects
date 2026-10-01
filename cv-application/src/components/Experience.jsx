
import { useState } from "react";

function Experience({ onSubmit, savedData }) {
  const [company, setCompany] = useState(savedData.company || "");
  const [position, setPosition] = useState(savedData.position || "");
  const [responsibilities, setResponsibilities] = useState(
    savedData.responsibilities || ""
  );
  const [startDate, setStartDate] = useState(savedData.startDate || "");
  const [endDate, setEndDate] = useState(savedData.endDate || "");
  const [isEditing, setIsEditing] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      company,
      position,
      responsibilities,
      startDate,
      endDate
    });

    setIsEditing(false);
  }

  return (
    <section className="form-section">
      <h2>Practical Experience</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Enter company name"
            required
          />

          <label>Position Title</label>
          <input
            type="text"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            placeholder="e.g. Web Developer Intern"
            required
          />

          <label>Main Responsibilities</label>
          <textarea
            value={responsibilities}
            onChange={(event) => setResponsibilities(event.target.value)}
            placeholder="Describe your work"
            rows="4"
            required
          />

          <label>Start Date</label>
          <input
            type="text"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            placeholder="e.g. Jan 2025"
            required
          />

          <label>End Date</label>
          <input
            type="text"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            placeholder="e.g. Present"
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>Company:</strong> {savedData.company}</p>
          <p><strong>Position:</strong> {savedData.position}</p>
          <p><strong>Responsibilities:</strong> {savedData.responsibilities}</p>
          <p><strong>Dates:</strong> {savedData.startDate} - {savedData.endDate}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default Experience;