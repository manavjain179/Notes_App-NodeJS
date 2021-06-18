/*const fs = require('fs')
//If we do not use 'require' then --> ReferenceError: fs is not defined
fs.writeFileSync('notes.txt', 'My name is Manav Jain. ')
fs.appendFileSync('notes.txt' , 'This is my first Node.js project.')


const add = require('./utils.js') //loading the 'utils.js' file.
//even after loading 'utils.js' , app.js cannot access the variables in utils.js so we use 'module.exports'.

const sum = add(2,3)//using add function from utils.js

console.log(sum)

//Challenge*/
const notes = require('./notes.js')
/*const msg = getNotes()
console.log(msg)

//loading a 'validator' npm package.
const validator = require('validator')
console.log(validator.isEmail('manavjain179@gmail.com')) //true
console.log(validator.isEmail('gmail.com')) //false

console.log(validator.isURL('https://mead.io')) //true
console.log(validator.isURL('https/mead.io')) //false

//'chalk' package challenge*/
const chalk = require('chalk')
/*console.log(chalk.green('Success!'))
console.log(chalk.bold.red('Error!'))
console.log(chalk.bgBlue('Manav'))
console.log(chalk.blue.bgRed.bold('Jain'))//order of attributes does not matter.
console.log(chalk.inverse('Manav Jain'))//inverses text and background color.
*/
//Section-4
//console.log(process.argv)
/*
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\Udemy Node.js\\notes-app\\app.js',
  'Manav'
]
*/
/*console.log(process.argv[2])//It accepts - Manav which is given during 'node app.js Manav'.

const command = process.argv[2]

if(command === 'add'){
    console.log('Adding Note!')
}
else if(command === 'remove'){
    console.log('Removing Note!')
}
//console.log(process.argv)//node app.js add --title="This is my title" --> this is not parsed/extracted by node.js so we use npm package 'yargs'
*/
const yargs = require('yargs')
//console.log(yargs.argv)//{ _: [], '$0': 'app.js' }
/*
when we run -> node app.js add --title="This is my title"
output--> { _: [ 'add' ], title: 'This is my title', '$0': 'app.js' }
*/

//customize yargs version
yargs.version('1.1.0')

//add,remove,read,list notes.

//Create add command
yargs.command({
    command : 'add',
    describe: "Adding a Note",
    builder:{
        title : {
            describe: 'Note Title',
            demandOption : true,
            type: 'string'
        },
    body :{
        describe : 'Note body',
        demandOption : true , 
        type : 'string'
    }},
    handler : argv => {
        notes.addNote(argv.title , argv.body)
    }
}).argv
/*
node app.js add --title="shopping list" --body="This is my first note"
output-
Title:shopping list
Body:This is my first note
*/

//Create remove command
yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder:{
        title : {
            describe: 'Note Title',
            demandOption : true,
            type: 'string'
        }
    },
    handler : argv => {
        notes.removeNote(argv.title)
    }
}).argv

//creating list command
yargs.command({
    command : 'list' , 
    describe : 'Listing the notes',
    handler : argv => {
        notes.listNotes()
    }
}).argv

//Creating read command
yargs.command({
    command : 'read' ,
    describe : 'Read a note',
    builder:{
        title : {
            describe: 'Read Note Title',
            demandOption : true,
            type: 'string'
        }
    },
    handler : argv => {
        notes.readNote(argv.title)
    }
}).argv
yargs.parse()