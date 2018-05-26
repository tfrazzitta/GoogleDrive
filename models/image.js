var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var ImageSchema = new Schema({
      fileId:String,
      filename: {type: String},
      date: String,
      city:String,
      state:String,
      location:String,
      link:String,
      mimetype:String
      // path:{type:String},
      // type: String,
      // wear: String,
      //outfitMatches:Array,
      //outfitId:String,
      // season: String,                                                            
      // data: Buffer,
      // id:{type: Schema.Types.ObjectId}  
});










// Create the Model
var Image = mongoose.model("Image", ImageSchema);

// Export it for use elsewhere
module.exports = Image;
