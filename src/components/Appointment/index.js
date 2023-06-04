import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import  useVisualMode  from '../../hooks/useVisualMode';
import { getInterviewersForDay } from '../../helpers/selectors';
import Confirm from './Confirm';

export default function Appointment(props) { 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFRIM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.name}
        onDelete={() => {transition(CONFIRM)}}
        onEdit={() => transition(EDIT)}
      />
      )}
      {mode === CREATE && (
        <Form
         interviewers={props.interviewers}
         onCancel={back}
         bookInterview={props.bookInterview}
         onSave={save}
         cancelInterview={props.cancelInterview}
         />
      )}
      
      {mode === SAVING && 
      <Status message='SAVING' />
      }

      {mode === DELETING &&
      <Status 
      message="DELETING"
      />
      }

      {mode === CONFIRM &&
      <Confirm
      message="Are you sure you want to delete this interview?"
      onCancel={back}
      onConfirm={deleteInterview}
      />
      }

      {mode === EDIT &&
      <Form 
      name={props.name ? props.name : props.interview.student}
      interviewer={props.interview.interviewer}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />
      }
    </article>
  );
}