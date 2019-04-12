import React, { Component } from "react";

class ShowRow extends Component {
  state = {};
  render() {
    return (
      <table className="table" key={this.props.show.id}>
        <tbody>
          <td className="w-10">
            <img
              src={this.props.show.poster_src}
              alt="poster"
              style={{
                width: 80,
                height: 120
              }}
            />
          </td>
          <td className="w-75">
            <h3>{this.props.show.name}</h3>
            <span>
              <b>Release Date: </b>
              {this.props.show.first_air_date}
            </span>
            {"\n "}
            <p>{this.props.show.overview}</p>
          </td>
          <td className="w-10">
            <h4>
              <span class="badge badge-pill badge-warning">
                {(this.props.show.vote_average / 2).toFixed(2)}
              </span>
            </h4>
          </td>
        </tbody>
      </table>
    );
  }
}

export default ShowRow;
