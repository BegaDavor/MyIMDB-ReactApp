import React, { Component } from "react";

class MovieRow extends Component {
  render() {
    return (
      <table className="table" key={this.props.movie.id}>
        <tbody
          style={{
            height: 150
          }}
        >
          <td className="w-10">
            <img
              src={this.props.movie.poster_src}
              alt="poster"
              style={{
                width: 80,
                height: 120
              }}
            />
          </td>
          <td className="w-75">
            <h4>{this.props.movie.title}</h4>
            <span>
              <b>Release Date: </b>
              {this.props.movie.release_date}
            </span>
            {"\n "}
            <p>{this.props.movie.overview}</p>
          </td>
          <td className="w-20">
            <h4>
              <span className="badge badge-pill badge-warning">
                {(this.props.movie.vote_average / 2).toFixed(2)}
              </span>
            </h4>
          </td>
        </tbody>
      </table>
    );
  }
}

export default MovieRow;
