import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [article, setArticle] = useState([]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `http://www.reddit.com/search.json?q=${term}`
    );
    console.log(response.data.data.children);
    setArticle(response.data.data.children);
  };

  const renderArticles = () => {
    return article.map((art) => {
      let image = art.preview
        ? art.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      return (
        <div class="card mb-2">
          <img class="card-img-top" src={`${image}`} alt="Cardcap" />
          <div class="card-body">
            <h5 class="card-title">${art.data.title}</h5>
            <p class="card-text">{art.data.selftext}</p>
            <a
              href={art.data.url}
              target="_blank
          "
              class="btn btn-primary"
            >
              Read More
            </a>
            <hr />
            <span class="badge badge-secondary">
              Subreddit: ${art.data.subreddit}
            </span>
            <span class="badge badge-dark">Score: ${art.data.score}</span>
          </div>
        </div>
      );
    });
  };

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
