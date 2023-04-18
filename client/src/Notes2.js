import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const Note2 = () => {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                console.log(response)
                setNotes(response)
            })
    }, [])

    if(!notes) return null

    const notesToShow = showAll ? notes : notes.filter(note=>note.important)

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/api/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id,changedNote)
            .then(response => {
                setNotes(notes.map(n => n.id !== id ? n : response))
            })
            .catch(error => {
                console.log(error)
                alert(`the note ${note.content} was already deleted from the server`)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'All'}</button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportanceOf={()=>toggleImportanceOf(note.id)}/>

                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default Note2
