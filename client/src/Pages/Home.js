import React, { useContext, useEffect, useState } from 'react'
import myContext from '../Context/useContext';
import '../Assets/Styles/Home.css'
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';


const Home = () => {
    const [showEditor, setShowEditor] = useState(false)
    const [saveBtn, setSaveBtn] = useState(false)
    const [deleteBtn, setDeleteBtn] = useState(1)
    const [notes, setNotes] = useState({
        title: "",
        note: ""
    })
    const [myNotes, setMyNotes] = useState([]);

    useEffect(() => {
        axios.get("/getnotes").then((res) => {
            setMyNotes(res.data.notes)
        }).catch((err) => {
            console.log(err)
        })
    }, [showEditor])
    const context = useContext(myContext);
    const saveNote = () => {
        if (notes.title !== "" && notes.note !== "") {
            axios.post("/note/create", notes).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
            setShowEditor(false);
            setSaveBtn(false)
            setNotes({
                title: "",
                note: ""
            })
        } else {
            alert("Fill Note!")
        }

    }
    const deleteNote = (id) => {
        console.log("Hello Delete")
        axios.get("/deletenote", { id: id }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className='editor-container'>
                <div className='note-editor'>
                    <div className='title' disabled="true" hidden={!showEditor}>
                        <input type="text" placeholder='Title' onChange={(e) => setNotes({ ...notes, title: e.target.value })} value={notes.title} />
                    </div>
                    <div className='text-area'>
                        <textarea placeholder='Start Typing...' cols={100} rows={showEditor ? 5 : 1} onFocus={() => setShowEditor(true)} onChange={(e) => {
                            setNotes({ ...notes, note: e.target.value })
                            setSaveBtn(e.target.value)
                        }}
                            value={notes.note} />
                    </div>
                    <div className='btn-section' hidden={!showEditor}>
                        <button className={saveBtn ? "active-btn" : "mybtn"} onClick={saveNote}>Save</button>
                        <button className='mybtn' onClick={() => {
                            setShowEditor(false)
                            setNotes({ title: "", note: "" })
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className='notes-container'>
                {
                    myNotes.length ? myNotes.map((data) => {
                        return (
                            <div className='notes-items'>
                                <div className='notes-card' onFocus={() => setDeleteBtn(0)}>
                                    <div className='title'>
                                        <h1>{data.title}</h1>
                                    </div>
                                    <div className='note'>
                                        <h3>{data.note}</h3>
                                    </div>
                                    <RiDeleteBinLine className='icons' onClick={() => deleteNote(data._id)} />
                                </div>
                            </div>
                        )
                    }) : <h2>Notes Not Found!</h2>
                }
            </div>
        </div>
    )
}

export default Home;