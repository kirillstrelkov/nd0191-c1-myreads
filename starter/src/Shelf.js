import PropTypes from "prop-types";
import React from "react";
import Book from "./Book";

const Shelf = (props) => {
  const books = props.books.map((book) => <Book key={book.id} book={book} />);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default Shelf;
