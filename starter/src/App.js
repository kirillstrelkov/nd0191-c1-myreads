import React, {useEffect, useState} from "react";
import "./App.css";
import {getAll} from "./BooksAPI";
import MyReads from "./MyReads";
import Search from "./Search";
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

  const togglePage = () => {
    setShowSearchpage(!showSearchPage);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search toggle={togglePage} />
      ) : (
        <MyReads toggle={togglePage} shelves={shelves} />
      )}
    </div>
  );
};

export default App;
