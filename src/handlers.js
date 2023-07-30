const {nanoid} = require('nanoid');
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;

    const id = nanoid(16)

    const createtAt = new Date().toISOString();
    const updateAt = createtAt;

    const newNotes = {
        title,
        tags,
        body,
        id,
        createtAt,
        updateAt,
    };


    notes.push(newNotes);

    const isSuccess = notes.filter((notes) => notes.id = id).length > 0;

    if (isSuccess){
        const response = h.response({
            status : 'success',
            message : 'Berhasil menambahkan catatan',
            data : {
                notesid : id,
            },
        });
        
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal ditambahkan'
    });
    response.code(500);
    return response;

};

const getALLNotesHandler = () => ({
    status : 'success',
    data : {
        notes,
    }
});

const getNoteByIdHeadler = (request, h) => {
    const {id} = request.params;

    const note = notes.filter((n) => n.id === id )[0];

    if(note !== undefined) {
        return {
            status : "success",
            message : "berhasil menampilkan catatan",
            data : {
                note,
            },
        };
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) =>{
    const { id } = request.params;

    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        }
    }
    const response = h.response({
        status : "success",
        message : "Berhasil merubah catatan"
    })

    response.code(200);
    return response;
};

const deleteNoteByIdHandler = (request, h) =>{
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status : "success",
            message : "Catatn berhasil dihapus"
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status : "fail",
        message : "Catatan gagal dihapus, Id tidak ditemukan"
    });
    response.code(404);
    return response;


};

module.exports = {
    addNoteHandler,
    getALLNotesHandler,
    getNoteByIdHeadler,
    editNoteByIdHandler,
    deleteNoteByIdHandler};