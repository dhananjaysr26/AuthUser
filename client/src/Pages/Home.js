import React, { useContext, useEffect, useState } from 'react'
import '../Assets/Styles/Home.css'
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import myContext from '../Context/useContext';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const [showEditor, setShowEditor] = useState(false)
    const [saveBtn, setSaveBtn] = useState(false)
    const [deleteBtn, setDeleteBtn] = useState(1)
    const [notes, setNotes] = useState({
        title: "",
        note: ""
    })
    const [myNotes, setMyNotes] = useState([]);
    const context = useContext(myContext)
    useEffect(() => {
        axios.get("http://localhost:5000/getnotes").then((res) => {
            setMyNotes(res.data.notes)
        }).catch((err) => {
            console.log(err)
        })

    }, [showEditor])
    const saveNote = () => {
        if (Object.keys(context).length !== 0) {
            if (notes.title !== "" && notes.note !== "") {
                axios.post("http://localhost:5000/note/create", notes).then((res) => {
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
        } else {
            alert("Login to save your Note!")
            navigate("/login")
        }


    }
    const deleteNote = (id) => {
        console.log("Hello ID")
        console.log(id)
        axios.patch("http://localhost:5000/deletenote", { id: id }).then((res) => {
            console.log(res)
            setShowEditor(0)
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