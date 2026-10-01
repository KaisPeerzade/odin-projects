
import { useState } from "react";

function GeneralInfo({ onSubmit, savedData }) {
  const [name, setName] = useState(savedData.name || "");
  const [email, setEmail] = useState(savedData.email || "");
  const [phone, setPhone] = useState(savedData.phone || "");
  const [isEditing, setIsEditing] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({ name, email, phone });
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <section className="form-section">
      <h2>General Information</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {savedData.name}</p>
          <p><strong>Email:</strong> {savedData.email}</p>
          <p><strong>Phone:</strong> {savedData.phone}</p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default GeneralInfo;