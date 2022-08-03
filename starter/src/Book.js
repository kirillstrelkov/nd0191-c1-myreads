import Action from "./Action";

function Book(props) {
  const authors = props.book.authors.join(", ");

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${props.book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <Action shelf={props.book.shelf} />
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
}

export default Book;
