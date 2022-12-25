const router = require("express").Router();

const MOVIEDB = require("../modules/Movie.js");
const verifyToken = require("../verifyToken.js");

// CREATE NEW MOVIE

router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const NewMovie = new MOVIEDB(req.body);
    try {
      const SavedMovie = await NewMovie.save();
      res.status(201).json(SavedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create movie");
  }
});

// Update Movie

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const UpdateMovie = await MOVIEDB.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(UpdateMovie);
    } catch (err) {
      res.status(500).json("You are not update movies");
    }
  } else {
    res.status(500).json("You are not Allowed");
  }
});

// Delete Movie

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin ) {
    try {
      await MOVIEDB.findByIdAndDelete(req.params.id);
      res.status(200).json("Successfully Delete Movies");
    } catch (err) {
      res.status(500).json("You are not delete now , server slow");
    }
  } else {
    res.status(401).json(" You are not allowed to delete");
  }
});

// GET SINGLE MOVIE

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movieData = await MOVIEDB.findById(req.params.id);

    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json("You are not Allowed to get Movie");
  }
});

// Banner Random Movies

router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;

  let movie;

  try {
    if (type === "series") {
      movie = await MOVIEDB.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
        movie = await MOVIEDB.aggregate([

            {$match : {isSeries : false}},
            {$sample : {size : 1}},
        ]);
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(" You are not allowed");
  }
});

// GET ALL MOVIES

router.get("/", verifyToken, async (req, res) => {
    console.log("get all movie route working")
  if (req.user.isAdmin) {
    try {
      const AllMovie = await MOVIEDB.find();
      res.status(200).json(AllMovie.reverse());
    }catch(err){
      res.status(500).json(" You are not See All Movies");
    }
  } else {
    res.status(405).json(" You are not Allowed");
  }
});

module.exports = router;
