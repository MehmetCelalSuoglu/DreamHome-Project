import { useState } from "react";

function Branches() {
  const [updateForm, setUpdateForm] = useState({
    branchno: "",
    street: "",
    city: "",
    postcode: "",
  });
  const [newForm, setNewForm] = useState({
    branchno: "",
    street: "",
    city: "",
    postcode: "",
  });
  const [message, setMessage] = useState("");

  const handleChangeUpdate = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleChangeNew = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:1521/api/branch/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Branch updated successfully ✅");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Failed: " + err.message);
    }
  };

  const submitNew = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:1521/api/branch/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("New branch created successfully 🎉");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Failed: " + err.message);
    }
  };

  return (
    <section className="card">
      <h1 className="card-title">Branches</h1>
      <p className="card-subtitle">
        Update an existing branch or register a new office for DreamHome.
      </p>

      <div className="card-section">
        <h2 className="section-title">Update Branch Address</h2>
        <form onSubmit={submitUpdate} className="form-grid">
          <div className="form-row">
            <label>Branch No</label>
            <input
              name="branchno"
              value={updateForm.branchno}
              onChange={handleChangeUpdate}
              placeholder="B003"
              required
            />
          </div>
          <div className="form-row">
            <label>Street</label>
            <input
              name="street"
              value={updateForm.street}
              onChange={handleChangeUpdate}
              placeholder="920 King St W"
            />
          </div>
          <div className="form-row">
            <label>City</label>
            <input
              name="city"
              value={updateForm.city}
              onChange={handleChangeUpdate}
              placeholder="Toronto"
            />
          </div>
          <div className="form-row">
            <label>Postcode</label>
            <input
              name="postcode"
              value={updateForm.postcode}
              onChange={handleChangeUpdate}
              placeholder="M5V 0V9"
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>

      <div className="card-section">
        <h2 className="section-title">Add New Branch</h2>
        <form onSubmit={submitNew} className="form-grid">
          <div className="form-row">
            <label>Branch No</label>
            <input
              name="branchno"
              value={newForm.branchno}
              onChange={handleChangeNew}
              placeholder="B010"
              required
            />
          </div>
          <div className="form-row">
            <label>Street</label>
            <input
              name="street"
              value={newForm.street}
              onChange={handleChangeNew}
              placeholder="645 Queen St W"
            />
          </div>
          <div className="form-row">
            <label>City</label>
            <input
              name="city"
              value={newForm.city}
              onChange={handleChangeNew}
              placeholder="Toronto"
            />
          </div>
          <div className="form-row">
            <label>Postcode</label>
            <input
              name="postcode"
              value={newForm.postcode}
              onChange={handleChangeNew}
              placeholder="M5V 2B7"
            />
          </div>

          <button type="submit" className="btn-primary">
            Create Branch
          </button>
        </form>
      </div>

      {message && <div className="status-message success">{message}</div>}
    </section>
  );
}

export default Branches;
