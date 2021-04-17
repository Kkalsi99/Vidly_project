import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    selectedItem,
    valueProperty,
    onItemSelect,
  } = props;
  return (
    <div className="container mt-2">
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "list-group-item clickable active"
                : "list-group-item clickable"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
