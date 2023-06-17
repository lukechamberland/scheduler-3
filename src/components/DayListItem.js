import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

function formatSpots(numOfSpots) {
  
  // Displaying correct number of spots
  
  if (numOfSpots === 1) {
    return "1 spot remaining";
  } else if (numOfSpots === 0) {
    return "no spots remaining";
  } else {
    return `${numOfSpots} spots remaining`;
  }
}

export default function DayListItem(props) {
  const { spots, selected } = props;

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}