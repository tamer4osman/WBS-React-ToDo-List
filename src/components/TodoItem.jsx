import { useRef, useState } from "react";
import OkCancelButtons from "./OkCancelButtons";

/* eslint-disable react/prop-types */
const TodoItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [isDone, setIsDone] = useState(props.done);

  // we need a reference on the field in order for the ok/cancel button to work
  // as we need to be able to get the value of the field if it's not the event target
  const inputFieldRef = useRef(null);

  // extract handlers from props
  const { doneHandler, editHandler, deleteHandler } = props;

  // svg image paths for checked and unchecked items
  const uncheckedPath =
    "M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z";
  const checkedPath =
    "m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z";

  // changes status of todo to done
  const changeDoneStatus = () => {
    setIsDone(!isDone);
    doneHandler(props.id, !isDone);
  };

  // edit is finished (one way or another)
  const editFinished = (event) => {
    if (event.key === "Escape") {
      setEditMode(false);
    }

    if (event.key === "Enter") {
      setEditMode(false);
      if (event.target.value !== "") editHandler(props.id, event.currentTarget.value);
    }

    if (event.type === "click") {
      if (inputFieldRef.current.value !== "") {
        setEditMode(false);
        editHandler(props.id, inputFieldRef.current.value);
      }
    }
  };

  // delete has been confirmed
  const deleteConfirmed = () => {
    deleteHandler(props.id);
  };

  return (
    <div className="row align-items-center flex-nowrap g-1 g-md-4 mb-2">
      {/* Done Checkbox */}
      <div className="col">
        <button className="btn" onClick={() => changeDoneStatus()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={isDone ? "#1D8757" : "#6C7580"} d={isDone ? checkedPath : uncheckedPath} />
          </svg>
        </button>
      </div>

      {/* Text / Edit Field */}
      <div className="col-7 col-md-9 text-start">
        {/* Text */}
        {!editMode && (
          <div
            onDoubleClick={() => setEditMode(true)}
            style={{ cursor: "pointer" }}
            className={isDone ? "text-decoration-line-through text-secondary" : ""}
          >
            {props.text}
          </div>
        )}

        {/* Input Field */}
        {editMode && (
          <input
            type="text"
            className="form-control"
            ref={inputFieldRef}
            defaultValue={props.text}
            onKeyDown={(event) => editFinished(event)}
            autoFocus
          />
        )}
      </div>

      {/* Edit Button */}
      <div className="col">
        {/* Edit Button */}
        {!editMode && (
          <button className="btn btn-warning" onClick={() => setEditMode(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM4 21q-.425 0-.713-.288T3 20v-2.825q0-.2.075-.388t.225-.337l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225T6.825 21H4ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"
              />
            </svg>
          </button>
        )}

        {/* Ok Cancel Buttons */}
        {editMode && <OkCancelButtons okHandler={(event) => editFinished(event)} cancelHandler={() => setEditMode(false)} />}
      </div>

      {/* Delete Button */}
      <div className="col">
        {/* Delete Button */}
        {!deleteMode && (
          <button className="btn btn-danger" onClick={() => setDeleteMode(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
              />
            </svg>
          </button>
        )}

        {/* Ok Cancel Buttons */}
        {deleteMode && <OkCancelButtons okHandler={deleteConfirmed} cancelHandler={() => setDeleteMode(false)} />}
      </div>
    </div>
  );
};

export default TodoItem;
