import { useState } from "react";

function Staff() {
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

export default Staff;
