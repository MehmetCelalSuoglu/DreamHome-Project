import logo from "./assets/DHRES.png";

function Home() {
  return (
    <section className="card home-center">
      
      <img src={logo} alt="Dream Home Logo" className="home-logo" />

      <h1 className="card-title home-title">Welcome to Dream Home</h1>

      <p className="card-subtitle home-text">
        Please use the navigation bar to manage staff, branches, and clients in the
        Dream Home Oracle database.
      </p>

    </section>
  );
}

export default Home;




