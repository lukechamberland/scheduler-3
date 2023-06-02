import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';


export default function InterviewerListItem(props) {
  
 const classInterviewer = classNames({'interviewers__item--selected': props.selected})

  return (
    <li className={classInterviewer} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.selected && props.name}
</li>
  );
}