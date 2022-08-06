import Action from "./Action";

import PropTypes from "prop-types";

const Book = ({book, onMove}) => {
  const authors = book.authors ? book.authors.join(", ") : "";
  const image = book.imageLinks ? book.imageLinks.thumbnail : "";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${image}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <Action onMove={onMove} book={book} />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Book;
