// imagine making a listGroup component

import { Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";

interface ListGroupProps {
  animals_base: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ animals_base, heading, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [animals, setAnimals] = useState(animals_base);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;

      if (!target.closest(".list-group")) {
        setSelectedAnimal("");
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // could imagine each item
  return (
    <>
      {animals.length === 0 && <p>No items</p>}
      <h1>{heading}</h1>
      <ul className="list-group">
        {animals.map((animal, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={animal}
            onClick={() => {
              setSelectedIndex(index);
              setSelectedAnimal(animal);
              onSelectItem(animal);
            }}
            // onClick={(e) => handleClick(e, animal)}// this function is called
          >
            {animal}
          </li>
        ))}
      </ul>
      <br></br>
      {selectedAnimal && (
        <p> THE {selectedAnimal.toUpperCase()} HAS BEEN CHOSEN</p>
      )}
    </>
  );
}

export default ListGroup;
