import mongoose from 'mongoose';

const recipySchema = mongoose.Schema({
    name: String,
    description: String,
    ingredients: [String],
    selectedFile: String, //image base64 string

});


const Recipe = mongoose.model('Recipe', recipySchema); 
export default Recipe;