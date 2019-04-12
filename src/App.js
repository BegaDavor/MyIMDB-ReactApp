import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import MovieRow from "./components/MovieRow.js";
import ShowRow from "./components/ShowRow.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { row: [], typeOfSearch: "movies", limit: 10 };
    this.showTopRated = this.showTopRatedMovies.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("load", this.showTopRatedMovies());
  }

  performSearch(searchTerm, typeOfSearch) {
    if (typeOfSearch === "movies") {
      const urlString =
        "https://api.themoviedb.org/3/search/movie?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1&include_adult=false&query=" +
        searchTerm;
      $.ajax({
        url: urlString,
        success: searchResult => {
          console.log("Fetched data successfully!");
          const results = searchResult.results.sort(function(a, b) {
            return b.vote_average / 2 - a.vote_average / 2;
          });

          var moviesRows = [];

          results.forEach(movie => {
            movie.poster_src =
              "http://image.tmdb.org/t/p/w185" + movie.poster_path;
            console.log(movie);
            const movieRow = <MovieRow key={movie.id} movie={movie} />;
            moviesRows.push(movieRow);
          });
          this.setState({ rows: moviesRows.slice(0, this.state.limit) });
        },
        error: (xhr, status, err) => {
          console.log("Failed to fetch data!");
        }
      });
    } else if (typeOfSearch === "shows") {
      const urlString =
        "https://api.themoviedb.org/3/search/tv?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1&query=" +
        searchTerm;
      $.ajax({
        url: urlString,
        success: searchResult => {
          console.log("Fetched data successfully!");
          const results = searchResult.results.sort(function(a, b) {
            return b.vote_average / 2 - a.vote_average / 2;
          });

          var showsRows = [];

          results.forEach(show => {
            show.poster_src =
              "http://image.tmdb.org/t/p/w185" + show.poster_path;
            console.log(show);
            const showRow = <ShowRow key={show.id} show={show} />;
            showsRows.push(showRow);
          });
          this.setState({ rows: showsRows.slice(0, this.state.limit) });
        },
        error: (xhr, status, err) => {
          console.log("Failed to fetch data!");
        }
      });
    }
  }

  showTopRatedMovies() {
    const urlString =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1";
    return $.ajax({
      url: urlString,
      success: topMovies => {
        console.log("Fetched data successfully!");
        const results = topMovies.results;

        var moviesRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie);
          const showRow = <MovieRow key={movie.id} movie={movie} />;
          moviesRows.push(showRow);
        });
        this.setState({ rows: moviesRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  showTopRatedShows() {
    const urlString =
      "https://api.themoviedb.org/3/tv/top_rated?api_key=7b5e1cda23eb7882119f179972b71070&language=en-US&page=1";
    return $.ajax({
      url: urlString,
      success: topShows => {
        console.log("Fetched data successfully!");
        const results = topShows.results;

        var showsRows = [];

        results.forEach(show => {
          show.poster_src = "http://image.tmdb.org/t/p/w185" + show.poster_path;
          console.log(show);
          const showRow = <ShowRow key={show.id} show={show} />;
          showsRows.push(showRow);
        });
        this.setState({ rows: showsRows.slice(0, this.state.limit) });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch data!");
      }
    });
  }

  searchTermHandle(e) {
    const searchTerm = e.target.value;

    if (searchTerm.length > 1)
      this.performSearch(searchTerm, this.state.typeOfSearch);
    else {
      this.state.typeOfSearch === "movies"
        ? this.showTopRatedMovies()
        : this.showTopRatedShows();
    }
  }

  handleMovieClick = () => {
    this.setState({
      typeOfSearch: "movies"
    });
    this.showTopRatedMovies();
    console.log(this.state.typeOfSearch);
  };

  handleShowClick = () => {
    this.setState({
      typeOfSearch: "shows"
    });
    this.showTopRatedShows();
    console.log(this.state.typeOfSearch);
  };

  handleShowMoreClick = () => {
    this.setState(state => ({
      limit: this.state.limit + 10
    }));
    if (this.state.typeOfSearch === "movies") {
      this.showTopRatedMovies();
    } else {
      this.showTopRatedShows();
    }
    console.log(this.state.limit);
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <table
          style={{
            display: "block",
            align: "center"
          }}
        >
          <tbody>
            <tr>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={this.handleMovieClick.bind(this)}
                >
                  Movies
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={this.handleShowClick.bind(this)}
                >
                  TV Shows
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="md-form mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            onChange={this.searchTermHandle.bind(this)}
          />
        </div>
        {this.state.rows}
        <button
          className="btn btn-primary m-2"
          onClick={() => this.handleShowMoreClick()}
        >
          Show more...
        </button>
      </React.Fragment>
    );
  }
}

export default App;
