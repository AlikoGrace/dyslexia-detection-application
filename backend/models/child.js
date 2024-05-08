const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true
     },

  age: {
     type: Number,
      required: true
     },
  grade: {
     type: Number,
      required: true },

parent: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
