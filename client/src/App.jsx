import { useState } from "react";
import "./App.css";

/* ---------- STAFF FORM COMPONENT ---------- */
function StaffForm() {
  const [form, setForm] = useState({
    staffno: "",
    fname: "",
    lname: "",
    position: "",
    sex: "",
    dob: "",
    salary: "",
    branchno: "",
    telephone: "",
    mobile: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1521/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Staff added successfully! 🎉");
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1 className="card-title">Add New Staff</h1>
      <p className="card-subtitle">
        Register a new staff member into the DreamHome system.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label>Staff No</label>
          <input
            name="staffno"
            value={form.staffno}
            onChange={handleChange}
            placeholder="S950"
            required
          />
        </div>

        <div className="form-row">
          <label>First Name</label>
          <input
            name="fname"
            value={form.fname}
            onChange={handleChange}
            placeholder="John"
            required
          />
        </div>

        <div className="form-row">
          <label>Last Name</label>
          <input
            name="lname"
            value={form.lname}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
        </div>

        <div className="form-row">
          <label>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Manager"
          />
        </div>

        <div className="form-row">
          <label>Sex</label>
          <input
            name="sex"
            value={form.sex}
            onChange={handleChange}
            placeholder="M / F"
          />
        </div>

        <div className="form-row">
          <label>Date of Birth</label>
          <input
            name="dob"
            value={form.dob}
            onChange={handleChange}
            placeholder="1999-01-04"
          />
        </div>

        <div className="form-row">
          <label>Salary</label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="115000"
          />
        </div>

        <div className="form-row">
          <label>Branch No</label>
          <input
            name="branchno"
            value={form.branchno}
            onChange={handleChange}
            placeholder="B003"
          />
        </div>

        <div className="form-row">
          <label>Telephone</label>
          <input
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            placeholder="4161231111"
          />
        </div>

        <div className="form-row">
          <label>Mobile</label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="6476715611"
          />
        </div>

        <div className="form-row full">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Staff"}
        </button>
      </form>

      {message && (
        <div
          className={
            "status-message " +
            (message.startsWith("Staff added") ? "success" : "error")
          }
        >
          {message}
        </div>
      )}
    </section>
  );
}

/* ---------- BRANCHES FORM COMPONENT ---------- */
function BranchesForm() {
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

/* ---------- CLIENTS FORM COMPONENT ---------- */
function ClientsForm() {
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
        setMessage("Client registered successfully 🎉");
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
        setMessage("Client updated successfully ✅");
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
              placeholder="CR900"
              required
            />
          </div>
          <div className="form-row">
            <label>First Name</label>
            <input
              name="fname"
              value={addForm.fname}
              onChange={handleChangeAdd}
              placeholder="Test"
            />
          </div>
          <div className="form-row">
            <label>Last Name</label>
            <input
              name="lname"
              value={addForm.lname}
              onChange={handleChangeAdd}
              placeholder="Client"
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
              placeholder="client@example.com"
            />
          </div>
          <div className="form-row">
            <label>Preferred Type</label>
            <input
              name="preftype"
              value={addForm.preftype}
              onChange={handleChangeAdd}
              placeholder="House / Flat"
            />
          </div>
          <div className="form-row">
            <label>Max Rent</label>
            <input
              name="maxrent"
              value={addForm.maxrent}
              onChange={handleChangeAdd}
              placeholder="450"
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
              placeholder="CR900"
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
              placeholder="House / Flat"
            />
          </div>
          <div className="form-row">
            <label>Max Rent</label>
            <input
              name="maxrent"
              value={updateForm.maxrent}
              onChange={handleChangeUpdate}
              placeholder="500"
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

/* ---------- MAIN APP ---------- */
function App() {
  const [tab, setTab] = useState("staff"); // 'staff' | 'branches' | 'clients'

  return (
    <div className="app-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo-dot" />
          <span className="nav-title">DreamHome Real Estate</span>
        </div>
        <div className="nav-right">
          <button
            className={"nav-link-btn " + (tab === "staff" ? "active" : "")}
            onClick={() => setTab("staff")}
          >
            Staff
          </button>
          <button
            className={"nav-link-btn " + (tab === "branches" ? "active" : "")}
            onClick={() => setTab("branches")}
          >
            Branches
          </button>
          <button
            className={"nav-link-btn " + (tab === "clients" ? "active" : "")}
            onClick={() => setTab("clients")}
          >
            Clients
          </button>
        </div>
      </nav>

      {/* MAIN PAGE */}
      <main className="page">
        <div className="page-inner">
          {tab === "staff" && <StaffForm />}
          {tab === "branches" && <BranchesForm />}
          {tab === "clients" && <ClientsForm />}
        </div>
      </main>
    </div>
  );
}

export default App;




