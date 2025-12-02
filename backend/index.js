import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import oracledb from "oracledb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING, 
};

async function executePlsql(sql, binds = {}) {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    await conn.execute(sql, binds, { autoCommit: true });
    return { success: true };
  } catch (err) {
    console.error("DB ERROR:", err);
    return { success: false, error: err.message };
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (e) {
        console.error("Close error:", e);
      }
    }
  }
}

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "DreamHome backend is running" });
});

// 1) STAFF ADD
app.post("/api/staff", async (req, res) => {
  const {
    staffno,
    fname,
    lname,
    position,
    sex,
    dob,
    salary,
    branchno,
    telephone,
    mobile,
    email,
  } = req.body;

  const result = await executePlsql(
    `
    BEGIN
      add_staff_sp(
        :staffno,
        :fname,
        :lname,
        :position,
        :sex,
        TO_DATE(:dob, 'YYYY-MM-DD'),
        :salary,
        :branchno,
        :telephone,
        :mobile,
        :email
      );
    END;
  `,
    {
      staffno,
      fname,
      lname,
      position,
      sex,
      dob,
      salary,
      branchno,
      telephone,
      mobile,
      email,
    }
  );

  res.json(result);
});

// 2) BRANCH ADRES UPDATE
app.post("/api/branch/update", async (req, res) => {
  const { branchno, street, city, postcode } = req.body;

  const result = await executePlsql(
    `
    BEGIN
      update_branch_sp(
        :branchno,
        :street,
        :city,
        :postcode
      );
    END;
  `,
    { branchno, street, city, postcode }
  );

  res.json(result);
});

// 3) NEW BRANCH 
app.post("/api/branch/new", async (req, res) => {
  const { branchno, street, city, postcode } = req.body;

  const result = await executePlsql(
    `
    BEGIN
      new_branch(
        :branchno,
        :street,
        :city,
        :postcode
      );
    END;
  `,
    { branchno, street, city, postcode }
  );

  res.json(result);
});

// 4) NEW CLIENT ADD
app.post("/api/client/new", async (req, res) => {
  const {
    clientno,
    fname,
    lname,
    telno,
    street,
    city,
    email,
    preftype,
    maxrent,
  } = req.body;

  const result = await executePlsql(
    `
    BEGIN
      add_client_sp(
        :clientno,
        :fname,
        :lname,
        :telno,
        :street,
        :city,
        :email,
        :preftype,
        :maxrent
      );
    END;
  `,
    {
      clientno,
      fname,
      lname,
      telno,
      street,
      city,
      email,
      preftype,
      maxrent,
    }
  );

  res.json(result);
});

// 5) CLIENT update
app.post("/api/client/update", async (req, res) => {
  const {
    clientno,
    telno,
    street,
    city,
    email,
    preftype,
    maxrent,
  } = req.body;

  const result = await executePlsql(
    `
    BEGIN
      update_client_sp(
        :clientno,
        :telno,
        :street,
        :city,
        :email,
        :preftype,
        :maxrent
      );
    END;
  `,
    {
      clientno,
      telno,
      street,
      city,
      email,
      preftype,
      maxrent,
    }
  );

  res.json(result);
});

// SERVER
const PORT = process.env.PORT || 1521;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

