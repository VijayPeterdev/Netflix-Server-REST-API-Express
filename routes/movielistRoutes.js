const router = require("express").Router();
const MovieListDB = require("../modules/MovieList.js");
const verifyToken = require("../verifyToken.js");

//  CREATE MOVIELIST
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const dataList = new MovieListDB(req.body);
    try {
      const MovieList = await dataList.save();
      res.status(201).json(MovieList);
    } catch (err) {
      res.status(500).json(" Server can take time");
    }
  } else {
    res.status(500).json(" you are not allowed");
  }
});

// update Movie list

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovieList = await MovieListDB.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updateMovieList);
    } catch (err) {
      res.status(500).json(" Sorry you are not edit now! 😞");
    }
  } else {
    res.status(500).json(" You are not allow to Edit list 🔒");
  }
});

// Delete MovieList

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await MovieListDB.findByIdAndDelete(req.params.id);

      res.status(200).json(" Successfully delete the Movie list 💯");
    } catch (err) {
      res.status(500).json(" Sorry now server Slow you cannot delete 👓");
    }
  } else {
    res.status(500).json("You are not Allowed to DELETE THIS 😠");
  }
});

// GET MOVIELIST

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const findData = await MovieListDB.findById(req.params.id);

    const MovieData = await findData.save();

    res.status(200).json(MovieData);
  } catch (err) {
    res.status(500).json("Sorry you are not Get Movie List .. 🤔 ");
  }
});

router.get("/", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const categoriesQuery = req.query.categories;

  let list = [];

  try {
    if (typeQuery) {
      if (categoriesQuery) {
        list = await MovieListDB.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, movieCategories: categoriesQuery } },
        ]);
      } else {
        list = await MovieListDB.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await MovieListDB.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json("you are not allowed 😑");
  }
});

module.exports = router;
