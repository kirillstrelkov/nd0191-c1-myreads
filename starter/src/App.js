import React, {useEffect, useState} from "react";
import "./App.css";
import {getAll} from "./BooksAPI";
import Shelf from "./Shelf";

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [groupedBooks, setGroupedBooks] = useState({});

  const shelfNaming = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  const shelves = Object.entries(groupedBooks).map((entry) => {
    const shelfId = entry[0];
    const books = entry[1];
    const title = shelfNaming[shelfId];
    return <Shelf key={shelfId} title={title} books={books} />;
  });

  useEffect(() => {
    const shelfIds = ["currentlyReading", "wantToRead", "read"];

    const getBooks = async () => {
      const books = await getAll();
      const groupedBooks = Object.fromEntries(
        shelfIds.map((shelfId) => [
          shelfId,
          books.filter((book) => book.shelf === shelfId),
        ])
      );
      setGroupedBooks(groupedBooks);
    };

    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>{shelves}</div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
