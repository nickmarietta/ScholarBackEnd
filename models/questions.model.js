const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    prompt: { 
        type: String, 
        required: true 
    },
    choices: {
      type: [String],
      validate: [arr => arr.length === 4, 'Exactly 4 choices are required']
    },
    answer: { 
        type: String, 
        required: true 
    },
    levelRequired: { 
        type: Number, 
        default: 0 
    }
  });
  
  const testSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    xpReward: { 
        type: Number, 
        default: 0 
    },
    questions: [questionSchema]
  });
  
  module.exports = mongoose.model('Test', testSchema);