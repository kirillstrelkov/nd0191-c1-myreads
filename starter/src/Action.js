function Action(props) {
  const shelfIds = ["currentlyReading", "wantToRead", "read"];
  const shelfNaming = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  const options = shelfIds.map((shelfId) => {
    const shelfName = shelfNaming[shelfId];
    if (shelfId === props.shelf) {
      return (
        <option selected value={shelfId}>
          {shelfName}
        </option>
      );
    } else {
      return <option value={shelfId}>{shelfName}</option>;
    }
  });

  return (
    <select>
      <option value="none" disabled>
        Move to...
      </option>
      {options}
      <option value="none">None</option>
    </select>
  );
}

export default Action;
