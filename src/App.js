import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [article, setArticle] = useState([]);
  const [limit, setLimit] = useState();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `http://www.reddit.com/search.json?q=${term}&limit=${limit}`
    );
    console.log(response.data.data.children);
    setArticle(response.data.data.children);
  };

  const renderArticles = () => {
    return article.map((art, index) => {
      let image = art.preview
        ? art.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      return (
        <div className="card mb-2" key={index}>
          <img className="card-img-top" src={image} alt="Cardcap" />
          <div className="card-body">
            <h5 className="card-title">{art.data.title}</h5>
            <p className="card-text">
              {truncateString(art.data.selftext, 100)}
            </p>
            <a
              href={art.data.url}
              target="_blank
          "
              className="btn btn-primary"
            >
              Read More
            </a>
            <hr />
            <span className="badge badge-secondary">
              Subreddit: ${art.data.subreddit}
            </span>
            <span className="badge badge-dark">Score: ${art.data.score}</span>
          </div>
        </div>
      );
    });
  };

  function truncateString(myString, limit) {
    const shortened = myString.indexOf(" ", limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <span className="navbar-brand">Finddit</span>
        </div>
      </nav>
      <div id="search-container" className="container">
        <div id="search" className="card card-body bg-light mb-2">
          <h4>Search Reddit</h4>
          <form id="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="search-input"
                className="form-control mb-3"
                placeholder="Search Term..."
                onChange={handleChange}
              />
            </div>
            <h5 className="mt-2">Limit: </h5>
            <div className="form-group">
              <select
                name="limit"
                id="limit"
                className="form-control"
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25" selected>
                  25
                </option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-block mt-4"
              onSubmit={handleSubmit}
            >
              Search
            </button>
          </form>
          {renderArticles()}
        </div>
      </div>
    </div>
  );
}

export default App;
