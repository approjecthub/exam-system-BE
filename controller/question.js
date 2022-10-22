const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const Option = require("../models/options");

router.post("/", async (req, res) => {
  try {
    const { options, title, correctOptionIndex, marks } = req.body;
    if (correctOptionIndex > options.length) {
      throw new Error("Correct option index is incorrect");
    }

    const optionsObjArr = options.map((option) => ({
      title: option,
    }));

    const optionsCreationResult = await Option.insertMany(optionsObjArr);
    const correctOptionId = optionsCreationResult[correctOptionIndex - 1]._id;
    const allOptionIds = optionsCreationResult.map((option) => option._id);

    const newQuestion = {
      title,
      marks: +marks,
      options: allOptionIds,
      correctAnswer: correctOptionId,
    };

    const questionCreationResult = await new Question(newQuestion).save();
    newQuestion._id = questionCreationResult._id;
    delete newQuestion.correctAnswer;
    res.status(201).send(newQuestion);
    console.info("question is successfully created");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({}, "-correctAnswer").populate([
      "options",
    ]);
    res.status(200).send(questions);
    console.info("all questions fetched successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
