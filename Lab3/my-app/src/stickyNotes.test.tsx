import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" }, });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});

describe("note deletion", () => {
    test("deletes note", () => {
        render(<StickyNotes />);
    
        const noteTitle = screen.getByText("test note 1 title");
        const noteContent = screen.getByText("test note 1 content");
        const deleteButtons = screen.getAllByRole('button', { name: /x/i });
        fireEvent.click(deleteButtons[0]);

    
        expect(noteTitle).not.toBeInTheDocument();
        expect(noteContent).not.toBeInTheDocument();
    });
});

describe("editing note", () => {
    test("edit note title", () => {
        render(<StickyNotes/>);

        const noteTitle = screen.getByText("test note 1 title");

        expect(noteTitle).toBeInTheDocument();
       
        fireEvent.focus(noteTitle);
        fireEvent.input(noteTitle, { target: {innerText: "Edited Title"}});
        fireEvent.blur(noteTitle);
    

        const newNoteTitle = screen.getByText("Edited Title");

        expect(newNoteTitle).toBeInTheDocument();

    });

    test("edit note content", () => {
        render(<StickyNotes/>);

        const noteContent = screen.getByText("test note 1 content");

        expect(noteContent).toBeInTheDocument();

        fireEvent.focus(noteContent);
        fireEvent.input(noteContent, { target: {innerText: "Edited Content"}});
        fireEvent.blur(noteContent);

        const newNoteContent = screen.getByText("Edited Content");

        expect(newNoteContent).toBeInTheDocument();

    });
});

