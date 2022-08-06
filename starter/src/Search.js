import PropTypes from "prop-types";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Book from "./Book";
import * as BooksApi from "./BooksAPI";

const Search = ({onMove, bookIdsAndShelves}) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const updateQuery = (e) => {
    const findBooks = async () => {
      const q = e.target.value;
      setQuery(q);

      const foundBooks = q ? await BooksApi.search(q, 10) : [];
      setBooks(Array.isArray(foundBooks) ? foundBooks : []);
    };

    findBooks();
  };

  const foundBooks = books.map((book) => {
    book.shelf = bookIdsAndShelves[book.id];
    return <Book key={book.id} book={book} onMove={onMove} />;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={updateQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{foundBooks}</ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  onMove: PropTypes.func.isRequired,
  bookIdsAndShelves: PropTypes.object.isRequired,
};

export default Search;
