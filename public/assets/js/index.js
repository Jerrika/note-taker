let noteTitle, noteText, saveNoteBtn, newNoteBtn;
let [noteList] = document.querySelectorAll('.note-list');
let activeNote = {};

const show = (elem) => {
    elem.style.display = 'inline';
};

const hide = (elem) => {
    elem.style.display = 'none';
};

const getNotes = () => {
  return fetch('/api/notes', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch notes');
      }
      return response.json();
  })
  .catch(error => {
      console.error('Error fetching notes:', error);
      return [];
  });
};

const saveNote = (note) => {
    return fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
};

const deleteNote = (id) => {
    return fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const renderNoteList = (notes) => {
    if (!notes || notes.length === 0) {
        noteList.innerHTML = '';
        noteList.append(createLi('No saved Notes', false));
    } else {
        noteList.innerHTML = '';
        notes.forEach((note) => {
            const li = createLi(note.title);
            li.dataset.note = JSON.stringify(note);
            noteList.append(li);
        });
    }
};

const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
            'fas',
            'fa-trash-alt',
            'float-right',
            'text-danger',
            'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);

        liEl.append(delBtnEl);
    }

    return liEl;
};

const getAndRenderNotes = () => {
    getNotes()
    .then(notes => {
        renderNoteList(notes);
    });
};

// Call the function to fetch and render notes
getAndRenderNotes();