const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note' // model name for note
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // Nos aseguramos que nunca devuelva el pass (por si acaso)
  }
})

userSchema.plugin(uniqueValidator)

const User = new model('User', userSchema) // eslint-disable-line

module.exports = User
