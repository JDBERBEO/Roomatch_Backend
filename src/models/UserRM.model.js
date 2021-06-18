const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    "last-name": { 
        type: String,
        required: true,
        minlength: [6, 'el nombre es requerido']
    },
    email: { 
        type: String,
        required: [true, 'el campo email es requerido'],
    },
    age: { 
        type: Number,
        required: true,
    },
    description: String,
    ranking : [],
},{
    timestamps: true 
})

const UserRm = model('UserRm' , userSchema)

module.exports = UserRm;
