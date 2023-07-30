const {
    addNoteHandler,
    getALLNotesHandler,
    getNoteByIdHeadler,
    editNoteByIdHandler, 
    deleteNoteByIdHandler} = require('./handlers');

const routes =[
    {
        method : "POST",
        path : "/notes",
        handler : addNoteHandler,
    },
    
    {
        method : 'GET',
        path : "/notes",
        handler : getALLNotesHandler,
    },

    {
        method : 'GET',
        path : '/notes/{id}',
        handler : getNoteByIdHeadler
    },

    {
        method : 'PUT',
        path : '/notes/{id}',
        handler : editNoteByIdHandler,
    },

    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler : deleteNoteByIdHandler,
    },

];


module.exports = routes;