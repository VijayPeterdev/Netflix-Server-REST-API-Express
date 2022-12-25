const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const MovieSchema = new mongoose.Schema(
  {
    moviename: {
      type: String,
      required: true,
    },
    movieShortDetails: {
      type: String,
    },
    movieLogo: {
      type: String,
    },
    moviethmb: {
      type: String,
      required: true,
    },
    movieAnimationThmb: {
      type: String,
      required: true,
    },
    movietype: {
      type: Array,
      default: [],
      required: true,
    },
    ageLimit: {
      type: Number,
    },
    movieReleasedate: {
      type: String,
      required: true,
    },
    movieVideo: {
      type: String,
      required: true,
    },
    movieDuration: {
      type: String,
      required: true,
    },
    movieOverview: {
      type: String,
    },
    Characters: {
      type: Array,
      default: [],
    },
    Director: {
      type: Array,
      default: [],
    },
    isSeries : {
        type : Boolean,
        default : false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);

// {
// "moviename":"" 
// "movieShortDetails":"" 
// "movieLogo":""
// "moviethmb": ""
// "movieAnimationThmb":""
// "movietype": ""
// "ageLimit":"" 
// "movieReleasedate":"" 
// "movieVideo":"" 
// "movieDuration":"" 
// "movieOverview":"" 
// "Characters":"" 
// "Director": ""
// "isSeries" :""

// }