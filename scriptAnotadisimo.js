//Seleccionamos el formulario, los inputs y la lista de notas
const noteForm = document.getElementById('note-form');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const notesList = document.getElementById('notes-list');

//Cargamos las notas almacenadas en el local storage al cargar la pagina
document.addEventListener('DOMContentLoaded', loadNotes);

//Añadimos un event listener al formulario para controlar el evento de enviar
noteForm.addEventListener('submit', function(event){
    event.preventDefault(); //prevenimos el comportamiento por defecto del formulario

    //Obtenemos los valores de los inputs y creamos una nueva nota
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    if(title !== '' && content !== '') {
        addNote({ title, content }, true);
        noteTitleInput.value = ''; //Limpiamos el input de titulo
        noteContentInput.value = ''; //Limpiamos el input de contenido
    }
});

//funcion para añadir una nueva nota
function addNote(note, save = false) {
    const li = document.createElement('li'); //Creamos un nuevo elemnto de lista
    
    const h2 = document.createElement('h2'); //Creamos un elemento h2 para el titulo de la nota
    h2.textContent = note.title;
    li.appendChild(h2); //añadimos el titulo al elemento li creado anteriormente

    const p = document.createElement('p'); //Creamos un elemento p para el contenido de la nota
    p.textContent = note.content;
    li.appendChild(p);

    const deleteButton = document.createElement('button'); //Creamos un elemento boton por cada nota agregada
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        notesList.removeChild(li); //Eliminamos la nota de la lista
        removeNoteFromLocalStorage(note); //Eliminamos la nota del local storage
    });

    li.appendChild(deleteButton); //Añadimos el boton de eliminar a cada nota agregada
    notesList.appendChild(li); //Añadimos la nota a la lista

    if (save) {
        saveNoteToLocalStorage(note); //Guardamos la nota creada en el local storage
    }
    
}

//funcion para cargar las notas del local storage
function loadNotes() {
    const notes = getNotesFromLocalStorage(); //obtenemos las notas desde el local storage
    notes.forEach(note => addNote(note)); //agregamos cada nota obtenida a la lista
}

//funcion para obtener las notas del local storage
function getNotesFromLocalStorage() {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
}

//funcion para guardar las notas en el local storage
function saveNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

//funcion para eliminar del local storage
function removeNoteFromLocalStorage(noteToRemove) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(note => note.title !== noteToRemove.title ||note.content !== noteToRemove.content);
    localStorage.setItem('notes', JSON.stringify(notes));
}
