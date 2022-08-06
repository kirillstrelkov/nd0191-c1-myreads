import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const MyReads = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>{props.shelves}</div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

MyReads.propTypes = {
  shelves: PropTypes.array.isRequired,
};

export default MyReads;
