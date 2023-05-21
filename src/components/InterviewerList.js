import React from "react";
import './InterviewerList.scss';
import { action } from '@storybook/addon-actions';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers } = props;

  const handleInterviewerSelection = (interviewerId) => {
    action(`Selected interviewer: ${interviewerId}`)();
    props.onChange(interviewerId);
  };

  const interviewerLists = interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={() => handleInterviewerSelection(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerLists}</ul>
    </section>
  );
}
