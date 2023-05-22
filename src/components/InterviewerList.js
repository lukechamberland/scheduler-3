import React from "react";
import './InterviewerList.scss';
import { action } from '@storybook/addon-actions';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const handleInterviewerSelection = (interviewerId) => {
    action(`Selected interviewer: ${interviewerId}`)();
    props.onChange(interviewerId);
  };

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => handleInterviewerSelection(interviewer.id)}    
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}