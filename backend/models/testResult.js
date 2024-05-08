
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  },
  testType: {
    type: String,
    required: true
  },
  result: {
    type: String,
    enum: ['dyslexic', 'not dyslexic'],
    required: true
  }
});

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
