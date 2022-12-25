const mongoose = require("mongoose");

const MovieslistSchema = new mongoose.Schema(
  {
    listTitle: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    movieCategories: {
      type: String,
    },
    listOfMovie: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoviesList", MovieslistSchema);

// {
// "listTitle":"",
// "type":"",
// "movieCategories":"",
// "listOfMovie":""

// }
