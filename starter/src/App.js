import React, {useEffect, useState} from "react";
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
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  // actions
  const togglePage = () => {
    setShowSearchpage(!showSearchPage);
  };

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
      move={moveBook}
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
      {showSearchPage ? (
        <Search
          toggle={togglePage}
          move={moveBook}
          bookIdsAndShelves={bookIdsAndShelves}
        />
      ) : (
        <MyReads toggle={togglePage} shelves={shelves} />
      )}
    </div>
  );
};

export default App;
