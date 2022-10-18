const QuestionRepository = require('../repository/repository')

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await QuestionRepository.getAllQuestions()
    return res.status(200).json(questions);

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const getQuestion = async (req, res, next) => {
  try {
    const { id } = req.body
    const question = await QuestionRepository.getQuestion(id)
    return question
      ? res.status(200).json(question)
      : res.status(404).json({message: "Question not found."});

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const getRandomQuestion = async (req, res, next) => {
  try {
    const { prevId, difficulty, topic } = req.body
    const question = await QuestionRepository.getRandomQuestion(prevId, difficulty, topic)
    return question
      ? res.status(200).json(question)
      : res.status(404).json({message: "Question not found."});

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

module.exports = { getAllQuestions, getQuestion, getRandomQuestion }
