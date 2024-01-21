import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
  name:String,
  questions:[  {
    question: String,
    options: [String],
    correctAnswer: String,
    difficulty: String,
    scores:Array
  },]
});

const language =mongoose.models.Language || mongoose.model('Language', languageSchema);

export default language;