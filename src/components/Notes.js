import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom'
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"});
  let navigate=useNavigate();
  useEffect(() => {
   
      if(localStorage.getItem('token'))
      {
    getNotes();
      }
      else{
        navigate("/login");
      }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id , etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
   
};
  const handleClick =(e) =>{
      console.log("Updating the note",note)
      editNote(note.id, note.etitle,note.edescription,note.etag)
      refClose.current.click();
      props.showAlert("Updated Successfully","success")
}
const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  const ref = useRef(null);
  const refClose=useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={note.etag}
                  id="tag"
                  name="etag"
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>
              
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
          <div className="container">
          {notes.length===0 && 'No notes to display'}
          </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
