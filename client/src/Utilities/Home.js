function Home() {

  return (
      <div className="text-center">
          <h1 className="display-3">LogOut Hiking</h1>
          <img className="img-fluid mt-5" src={process.env.PUBLIC_URL + "/images/home" + Math.floor(Math.random() * 9 + 1) + ".svg"} alt="404 Not Found" />
      </div>
  );
}

export default Home;
