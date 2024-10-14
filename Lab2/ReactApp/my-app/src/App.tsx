import React, {useState, useContext} from 'react';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themesContext";


function App() {
	const [notes, setNotes] = useState(dummyNotesList); 
	const initialNote = {
	id: -1,
	title: "",
	content: "",
	label: Label.other,
	favourite: false,
	};

	const [createNote, setCreateNote] = useState(initialNote);
	const [favourites, setFavourites] = useState<string[]>([]);

	const createNoteHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent page reload

		// Create a new note object with a unique ID
		const newNote = { ...createNote, id: Date.now() }; // Use Date.now() as a unique ID

		// Add the new note to the list of notes
		setNotes([...notes, newNote]);

		// Reset the createNote state (clears the form)
		setCreateNote(initialNote);
		
		
	};
	const toggleFavouriteHandler = (id: number) => {
	setNotes(notes.map(note => {
		if (note.id === id) {
		const updatedNote = { ...note, favourite: !note.favourite}; // Toggle favorite state
		// Update favorites list
		if (updatedNote.favourite) {
			setFavourites(prev => [...prev, updatedNote.title]); // Add title to favorites
		} else {
			setFavourites(prev => prev.filter(title => title !== updatedNote.title)); // Remove title from favorites
		}
		return updatedNote;
		}
		return note;
	}));
	};
	const deleteNoteHandler = (id: number) => {
	setNotes(notes.filter(note => note.id !== id)); // Remove the note with the matching ID
	setFavourites(favourites.filter(favouriteTitle => favouriteTitle !== notes.find(note => note.id === id)?.title));
	};

	const [currentTheme, setCurrentTheme] = useState(themes.light);

	const toggleTheme = () => {
		setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
	  };
	

	return (
		<ThemeContext.Provider value={currentTheme}>
		<div className='app-container'style={{ background: currentTheme.background, color: currentTheme.foreground }}>
		<form className="note-form" onSubmit={createNoteHandler}>
			<div>
			<input
				placeholder="Note Title"
				value={createNote.title}
				onChange={(event) =>
				setCreateNote({ ...createNote, title: event.target.value})}
				required>
			</input>
			</div>

			<div>
			<textarea
				value={createNote.content}
				onChange={(event) =>
				setCreateNote({ ...createNote, content: event.target.value})}
				required>
			</textarea>
			</div>

	<div>
		<select 
		value={createNote.label}
		onChange={(event) =>
			setCreateNote({ ...createNote, label: event.target.value as Label})}
		required>
		<option value={Label.personal}>Personal</option>
		<option value={Label.study}>Study</option>
		<option value={Label.work}>Work</option>
		<option value={Label.other}>Other</option>
		</select>
	</div>

		<div><button type="submit">Create Note</button></div>
		<button onClick={toggleTheme}>Toggle Theme</button>
		<div className='favourites-list'>
        <h3>List of Favourites:</h3>
        <ul>
          {favourites.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
		</form>

		<div className="notes-grid" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
			{notes.map((note) => (
			<div
				key={note.id}
				className="note-item"
				style={{ background: currentTheme.background, color: currentTheme.foreground }}
			>
				<div className="notes-header">
				<button onClick={() => toggleFavouriteHandler(note.id)}>
                {note.favourite ? '❤' : '♡'}
              </button>
			  <button onClick={() => deleteNoteHandler(note.id)}>x</button>
				</div>
				<h2 contentEditable="true"> {note.title} </h2>
				<p contentEditable="true"> {note.content} </p>
				<p contentEditable="true"> {note.label} </p>
			</div>
			))}
		</div>
		</div> 
		</ThemeContext.Provider>
	);
	
	}

	export default App;
