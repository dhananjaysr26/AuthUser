import React, { useContext, useState } from 'react'
import myContext from '../Context/useContext';
import '../Assets/Styles/Home.css'
import { RiDeleteBinLine } from "react-icons/ri";


const Home = () => {
    const [showEditor, setShowEditor] = useState(false)
    const [saveBtn, setSaveBtn] = useState(false)
    const [deleteBtn, setDeleteBtn] = useState(1)
    const [notes, setNotes] = useState({
        title: "",
        note: ""
    });
    const context = useContext(myContext);

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
                        <button className={saveBtn ? "active-btn" : "mybtn"} onClick={() => console.log(notes)}>Save</button>
                        <button className='mybtn' onClick={() => {
                            setShowEditor(false)
                            setNotes({ title: "", note: "" })
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className='notes-container'>
                <div className='notes-items'>
                    <div className='notes-card' onFocus={() => setDeleteBtn(0)}>
                        <div className='title'>
                            <h1>Title</h1>
                        </div>
                        <div className='note'>
                            <h3>My Notes ksnknsnfnns</h3>
                        </div>
                        <RiDeleteBinLine className='icons' />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;