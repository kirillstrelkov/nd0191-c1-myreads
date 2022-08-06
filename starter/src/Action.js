import PropTypes from "prop-types";
import React from "react";
import {SHELF_IDS, SHELF_MAPPING} from "./App";

const Action = ({book, onMove}) => {
  const onChange = (e) => {
    onMove(book, e.target.value);
  };

  const options = SHELF_IDS.map((shelfId) => (
    <option value={shelfId} key={shelfId}>
      {SHELF_MAPPING[shelfId]}
    </option>
  ));

  return (
    <select defaultValue={book.shelf || "none"} onChange={onChange}>
      <option value="move" disabled>
        Move to...
      </option>
      {options}
      <option value="none">None</option>
    </select>
  );
};

Action.propTypes = {
  book: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Action;
