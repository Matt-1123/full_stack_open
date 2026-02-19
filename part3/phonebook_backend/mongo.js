const mongoose = require('mongoose')

// ----------------------------- //
// -------- Validation --------- //
// ----------------------------- //
if (process.argv.length < 3) {
  console.log('Password is missing. Please follow the command format: `node mongo.js <password>` to view all contacts. Provide the following command to add a contact to the phonebook: `node mongo.js <password> <name: String> <number: String>`')
  process.exit(1)
}

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log('Missing argument. Please follow the command format: `node mongo.js <password> <name: String> <number: String>`')
  process.exit(1)
}

// ------------------------- //
// -------- Config --------- //
// ------------------------- //
const password = process.argv[2]

const url = `mongodb+srv://matt:${password}@cluster0.2nzv8d5.mongodb.net/people?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// ----------------------------------- //
// -------- Get all contacts --------- //
// ----------------------------------- //
if(process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

// ------------------------------- //
// -------- Save contact --------- //
// ------------------------------- //
if(process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number
    })

    person.save().then(result => {
        console.log(`added ${name} to phonebook with number ${number}`)
        mongoose.connection.close()
    })
}






