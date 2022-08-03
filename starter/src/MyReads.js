import PropTypes from "prop-types";
import React from "react";

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
        <a onClick={props.toggle} href="#toggle">
          Add a book
        </a>
      </div>
    </div>
  );
};

MyReads.propTypes = {
  toggle: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};

export default MyReads;
