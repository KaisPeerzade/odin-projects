
import { useState } from "react";

import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/CVPreview";

import "./App.css";

function App() {
  const [general, setGeneral] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [education, setEducation] = useState({
    school: "",
    degree: "",
    study: "",
    startDate: "",
    endDate: ""
  });

  const [experience, setExperience] = useState({
    company: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: ""
  });

  return (
    <div className="app">
      <h1 className="app-title">CV Application</h1>
      <p className="app-subtitle">
        Enter your details and create your own CV.
      </p>

      <div className="app-layout">
        <div className="forms">
          <GeneralInfo
            onSubmit={setGeneral}
            savedData={general}
          />

          <Education
            onSubmit={setEducation}
            savedData={education}
          />

          <Experience
            onSubmit={setExperience}
            savedData={experience}
          />
        </div>

        <CVPreview
          general={general}
          education={education}
          experience={experience}
        />
      </div>
    </div>
  );
}

export default App;