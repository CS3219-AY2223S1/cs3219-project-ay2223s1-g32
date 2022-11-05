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
    const { id } = req.params
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
    const { prevId, difficulty } = req.query
    const question = await QuestionRepository.getRandomQuestion(prevId, difficulty)
    return question
      ? res.status(200).json(question)
      : res.status(404).json({message: "Question not found."});

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

module.exports = { getAllQuestions, getQuestion, getRandomQuestion }
