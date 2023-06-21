import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form(props) {

  // set the state
  
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = () => {
    // empty the values
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset();
    props.onCancel()
  }

  function validate() {
    // Ensuring name and interviewer are not left empty by the user
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("please select an interviewer");
      return;
    }
  
    setError("");
    props.onSave(student, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers}
      onChange={setInterviewer}
      value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  );
}
