const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    "lastName": { 
        type: String,
        required: true,
        minlength: [1, 'last name is required']
    },
    email: {
        type: String,
        required: true,
        validate: [
          {
            async validator(email) {
             try {
                const userRm = await models.UserRm.findOne({ email })
                return !userRm
              } catch(error) {
                return false
              }
            },
            message: 'email is required'
          }
        ]
      },
    password: String,
    age: { 
        type: Number,
        required: true,
    },
    description: {
      type : String,
      required: false,
    },
    ranking : [],
},{
    timestamps: true 
})

userSchema.pre('save', async function() {
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
})

const UserRm = model('UserRm' , userSchema)

module.exports = UserRm;
