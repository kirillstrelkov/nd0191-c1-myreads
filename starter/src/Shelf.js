import PropTypes from "prop-types";
import React from "react";
import Book from "./Book";

const Shelf = ({title, books, onMove}) => {
  const booksView = books.map((book) => (
    <Book key={book.id} book={book} onMove={onMove} />
  ));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{booksView}</ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Shelf;
