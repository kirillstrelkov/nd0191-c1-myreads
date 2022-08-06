import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import MyReads from "./MyReads";
import Search from "./Search";
import Shelf from "./Shelf";
export const SHELF_IDS = ["currentlyReading", "wantToRead", "read"];
export const SHELF_MAPPING = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read",
};

const App = () => {
  // states
  const [myBooks, setMyBooks] = useState([]);
  const [updated, setUpdated] = useState(true);

  // actions
  const moveBook = (book, newShelf) => {
    const updateBook = async () => {
      await BooksAPI.update(book, newShelf);
      setUpdated(true);
    };

    updateBook();
  };

  // main
  const groupedBooks = SHELF_IDS.reduce((o, key) => ({...o, [key]: []}), {});
  myBooks.forEach((book) => groupedBooks[book.shelf].push(book));

  const bookIdsAndShelves = myBooks.reduce((result, book) => {
    result[book.id] = book.shelf;
    return result;
  }, {});

  const shelves = SHELF_IDS.map((shelfId) => (
    <Shelf
      key={shelfId}
      title={SHELF_MAPPING[shelfId]}
      books={groupedBooks[shelfId]}
      onMove={moveBook}
    />
  ));

  // effects
  useEffect(() => {
    if (updated) {
      const getBooks = async () => {
        const myBooks = await BooksAPI.getAll();
        setMyBooks(myBooks);
        setUpdated(false);
      };

      getBooks();
    }
  }, [updated]);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<MyReads shelves={shelves} />} />
        <Route
          path="/search"
          element={
            <Search onMove={moveBook} bookIdsAndShelves={bookIdsAndShelves} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
