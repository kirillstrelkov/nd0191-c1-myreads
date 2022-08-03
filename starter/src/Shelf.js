import Book from "./Book";

function Shelf(props) {
  const books = props.books.map((book) => <Book key={book.id} book={book} />);

  return (
    <div className="bookshelf" key={props.id}>
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
}

export default Shelf;
