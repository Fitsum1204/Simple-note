// Get existing notes from local storage (if any)
let notes = [];
const storedNotes = localStorage.getItem("notes");
if (storedNotes) {
  notes = JSON.parse(storedNotes);
}


// Update the notes list on page load
const updateNotesList = () => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = ""; // Clear existing list items

  // Check if there are any notes
  const hasNotes = notes.length > 0;

  notes.forEach(note => {
    const listItem = document.createElement("div");
    listItem.classList.add("note-item"); // Add class for styling
    listItem.textContent = `${note.title} - ${note.content}`;
    
    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    
    deleteButton.dataset.noteId = note.id; // Store note ID for deletion
   console.log(note.id)
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });
  // Conditionally display the note form
  const noteForm = document.getElementById("note-form");
  noteForm.style.display = hasNotes ? "none" : "block";
};

const notesList = document.getElementById("notes-list");

notesList.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    const deleteButton = event.target; // Access the clicked button directly
    const noteId = deleteButton.dataset.noteId;
   
    // Call function to delete the note with the clicked button's ID
    deleteNote(noteId);
  }
});

function deleteNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    // Confirm deletion with user (optional)
   
      notes.splice(noteIndex, 1); // Remove the note from the array
      localStorage.setItem("notes", JSON.stringify(notes)); // Update local storage
      updateNotesList(); // Update the displayed list
   
  }
}



updateNotesList(); // Call on page load


function generateUniqueId() {
  // Generate a random string (e.g., using crypto API)
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
// Add a new note
const addNote = (note) => {
  note.id = generateUniqueId();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  updateNotesList(); // Update the list after adding a note
};

const addNoteContainer = document.querySelector(".add-note-container"); // Use querySelector for class selection

addNoteContainer.addEventListener("click", function() {
  const noteForm = document.getElementById("note-form");
  noteForm.style.display = "block"; // Show the form on click
});

// Handle form submission
const noteForm = document.getElementById("note-form");
noteForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  // Check if title and content are empty
  if (!title || !content) {
    alert("Please enter a title and content for your note.");
    return; // Exit the function if validation fails
  }

  const newNote = { title, content };

  // Existing code for adding a new note
  addNote(newNote);

  this.reset(); // Clear the form after submission
});


const clearNotesButton = document.getElementById("clear-notes");
clearNotesButton.addEventListener("click", clearAllNotes);

function clearAllNotes() {
  if (confirm("Are you sure you want to delete all notes?")) {
    localStorage.clear();
    notes = []; // Reset the notes array in your code
    updateNotesList(); // Refresh the displayed list
  }
}


