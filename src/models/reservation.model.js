const { model, Schema } = require('mongoose')

const reservationSchema = new Schema ({
  
  livingSpace : {
    type: String,
    required: true,
},
  startTime : {
    type: Date,
    required: false,
},
  userRm: {
    type: Schema.Types.ObjectId,
    ref: 'UserRm',
    required: false,
},
  endTime: {
    type: Date,
    required: false,
},
  paidReservation: {
    type: Number,
    required: true,
},
  ocupationStatus: String, 

}, {
  timestamps: true,
})

const Reservation = model('Reservation', reservationSchema )

module.exports = Reservation;