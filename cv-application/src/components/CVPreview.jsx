
function CVPreview({ general, education, experience }) {
  return (
    <div className="cv-preview">
      <h2>CV Preview</h2>

      <div className="cv-paper">
        <header className="cv-header">
          <h1>{general.name || "Your Name"}</h1>
          <p>
            {general.email || "your@email.com"}
            {general.phone && ` | ${general.phone}`}
          </p>
        </header>

        <section className="cv-content">
          <h2>Education</h2>
          <h3>{education.school || "School / College"}</h3>
          <p>{education.degree} in {education.study}</p>
          <p>
            {education.startDate}
            {education.endDate && ` - ${education.endDate}`}
          </p>
        </section>

        <section className="cv-content">
          <h2>Experience</h2>
          <h3>{experience.position || "Position Title"}</h3>
          <p>{experience.company}</p>
          <p>{experience.responsibilities}</p>
          <p>
            {experience.startDate}
            {experience.endDate && ` - ${experience.endDate}`}
          </p>
        </section>
      </div>
    </div>
  );
}

export default CVPreview;