import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import {getAll} from "./BooksAPI";
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

  // actions
  const moveBook = (book, newShelf) => {
    const bookId = book.id;
    const bookIds = myBooks.map((book) => book.id);
    let newBooks;

    if (SHELF_IDS.includes(newShelf)) {
      if (bookIds.includes(bookId)) {
        newBooks = myBooks.map((book) => {
          book.shelf = book.id === bookId ? newShelf : book.shelf;
          return book;
        });
      } else {
        book.shelf = newShelf;
        newBooks = myBooks.concat([book]);
      }
    } else {
      newBooks = myBooks.filter((book) => book.id !== bookId);
    }

    setMyBooks(newBooks);
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
    const getBooks = async () => {
      const myBooks = await getAll();
      setMyBooks(myBooks);
    };

    getBooks();
  }, []);

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
