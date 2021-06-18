const { default: chalk } = require('chalk')
const fs = require('fs')
//console.log('notes.js')

// const getNotes = () => {
//     return 'Your notes...'
// }

const addNote = (title , body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title)
    // const duplicateNotes = notes.filter(function (note){
    //     return note.title === title
    // })
    const duplicateNote = notes.find((note) => note.title === title) //'find()' -> stops after finding the first duplicate note.
    
    // console.log(duplicateNote) //for debugging.
    // console.log(title) //for debugging.

    //debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note added!'))
}
else{
    console.log(chalk.red.inverse('Note title taken!'))
}
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){   
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.bgRed('No note found!'))
    }
}

const listNotes = () => {
    console.log(chalk.green.inverse('Your notes : '))

    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.bgCyan('Title : ' + note.title))
        console.log('Body : ' + note.body)
    }
    else{
        console.log(chalk.bgRed('No note found.'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)//to add after the already present notes.
    }
    catch (e){
        return [] //if file is empty return empty array [].
    }
}

module.exports = {
    // getNotes: getNotes ,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}