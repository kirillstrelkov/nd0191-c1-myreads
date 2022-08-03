import PropTypes from "prop-types";
import React from "react";

const Action = (props) => {
  const shelfIds = ["currentlyReading", "wantToRead", "read"];
  const shelfNaming = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  const options = shelfIds.map((shelfId) => (
    <option value={shelfId} key={shelfId}>
      {shelfNaming[shelfId]}
    </option>
  ));

  return (
    <select defaultValue={props.shelf}>
      <option value="none" disabled>
        Move to...
      </option>
      {options}
      <option value="none">None</option>
    </select>
  );
};

Action.propTypes = {
  shelf: PropTypes.string.isRequired,
};

export default Action;
