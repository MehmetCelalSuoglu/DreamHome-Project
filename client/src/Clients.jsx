import { useState } from "react";

function Clients() {
  const [addForm, setAddForm] = useState({
    clientno: "",
    fname: "",
    lname: "",
    telno: "",
    street: "",
    city: "",
    email: "",
    preftype: "",
    maxrent: "",
  });

  const [updateForm, setUpdateForm] = useState({
    clientno: "",
    telno: "",
    street: "",
    city: "",
    email: "",
    preftype: "",
    maxrent: "",
  });

  const [message, setMessage] = useState("");

  const handleChangeAdd = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleChangeUpdate = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const submitAdd = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:1521/api/client/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Client registered successfully!");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Failed: " + err.message);
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:1521/api/client/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Client updated successfully! ");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Failed: " + err.message);
    }
  };

  return (
    <section className="card">
      <h1 className="card-title">Clients</h1>
      <p className="card-subtitle">
        Register new clients or update their contact & preference information.
      </p>

      <div className="card-section">
        <h2 className="section-title">Add New Client</h2>
        <form onSubmit={submitAdd} className="form-grid">
          <div className="form-row">
            <label>Client No</label>
            <input
              name="clientno"
              value={addForm.clientno}
              onChange={handleChangeAdd}
              placeholder=""
              required
            />
          </div>
          <div className="form-row">
            <label>First Name</label>
            <input
              name="fname"
              value={addForm.fname}
              onChange={handleChangeAdd}
              placeholder=""
            />
          </div>
          <div className="form-row">
            <label>Last Name</label>
            <input
              name="lname"
              value={addForm.lname}
              onChange={handleChangeAdd}
              placeholder=""
            />
          </div>
          <div className="form-row">
            <label>Phone</label>
            <input
              name="telno"
              value={addForm.telno}
              onChange={handleChangeAdd}
              placeholder="555 1234"
            />
          </div>
          <div className="form-row">
            <label>Street</label>
            <input
              name="street"
              value={addForm.street}
              onChange={handleChangeAdd}
              placeholder="525 Adelaide Street"
            />
          </div>
          <div className="form-row">
            <label>City</label>
            <input
              name="city"
              value={addForm.city}
              onChange={handleChangeAdd}
              placeholder="Toronto"
            />
          </div>
          <div className="form-row full">
            <label>Email</label>
            <input
              name="email"
              value={addForm.email}
              onChange={handleChangeAdd}
              placeholder="lebronjames@example.com"
            />
          </div>
          <div className="form-row">
            <label>Preferred Type</label>
            <input
              name="preftype"
              value={addForm.preftype}
              onChange={handleChangeAdd}
              placeholder="House / Flat / Masion"
            />
          </div>
          <div className="form-row">
            <label>Max Rent</label>
            <input
              name="maxrent"
              value={addForm.maxrent}
              onChange={handleChangeAdd}
              placeholder="3000"
            />
          </div>

          <button type="submit" className="btn-primary">
            Register Client
          </button>
        </form>
      </div>

      <div className="card-section">
        <h2 className="section-title">Update Existing Client</h2>
        <form onSubmit={submitUpdate} className="form-grid">
          <div className="form-row">
            <label>Client No</label>
            <input
              name="clientno"
              value={updateForm.clientno}
              onChange={handleChangeUpdate}
              placeholder=""
              required
            />
          </div>
          <div className="form-row">
            <label>Phone</label>
            <input
              name="telno"
              value={updateForm.telno}
              onChange={handleChangeUpdate}
              placeholder="555 1234"
            />
          </div>
          <div className="form-row">
            <label>Street</label>
            <input
              name="street"
              value={updateForm.street}
              onChange={handleChangeUpdate}
              placeholder="New Street"
            />
          </div>
          <div className="form-row">
            <label>City</label>
            <input
              name="city"
              value={updateForm.city}
              onChange={handleChangeUpdate}
              placeholder="New City"
            />
          </div>
          <div className="form-row full">
            <label>Email</label>
            <input
              name="email"
              value={updateForm.email}
              onChange={handleChangeUpdate}
              placeholder="updated@example.com"
            />
          </div>
          <div className="form-row">
            <label>Preferred Type</label>
            <input
              name="preftype"
              value={updateForm.preftype}
              onChange={handleChangeUpdate}
              placeholder="House / Flat / Masion"
            />
          </div>
          <div className="form-row">
            <label>Max Rent</label>
            <input
              name="maxrent"
              value={updateForm.maxrent}
              onChange={handleChangeUpdate}
              placeholder="4000"
            />
          </div>

          <button type="submit" className="btn-primary">
            Update Client
          </button>
        </form>
      </div>

      {message && <div className="status-message success">{message}</div>}
    </section>
  );
}

export default Clients;
