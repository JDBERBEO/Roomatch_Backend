
const { model, Schema, models } = require('mongoose')
const bcrypt = require('bcrypt')

const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const inspectorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true,'last name is required'],
  },
  email: {
    type: String,
    trum: true,
    required: [true, 'email is required'],
    unique: true,
    match: [emailRegexp, 'email invalido'],
    validate: [{

      async validator(email){
        try {

          const user = models.Inspector.findOne({email})
          return !user
        } catch(error) {
          return false
        }
      },
      message: 'email already exists'
    }]
  },
  password:{
    type: String,
    require: [true, 'password is required'],
    trim: true,
  },
  age: {
    type: Number,
    require: [true, 'age is required'],
  },
  profession: {
    type: String,
    require: [true, 'professión is required'],
    trim: true,
  },
  experience: {
    type: String,
    require: [true, 'experience is required'],
    trim: true,
  },
  degrees: {
    type: Array,
    require: [true,'degrees are required'],
  },
  documents: {
    type: Array,
    require: [true,'documents are required'],
  },
  personalReferences: {
    type: Array,
    require: [true, 'personal References are required'],
  },
  timestamps: true, 
})

inspectorSchema.pre('save', async function() {
  if(this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,8)
  }
})

const Inspector = model('Inspector', inspectorSchema)

module.exports = Inspector