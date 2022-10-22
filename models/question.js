const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  marks: {
      type: Number,
      required: [true, "marks is required"]
  },
  options:{
      type: [mongoose.Schema.Types.ObjectId],
      ref:"option",
      validate: {
          validator: (v)=>{
              return v.length>2
          },
          message: ()=>"Atleast 2 options are required"
      }
  },
  correctAnswer:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"option",
      required: [true, "correctAnswer is required"],
  }
});

module.exports = mongoose.model("question", questionSchema);