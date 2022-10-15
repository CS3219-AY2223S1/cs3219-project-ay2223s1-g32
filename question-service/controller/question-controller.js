const QuestionRepository = require('../repository/repository')

const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionRepository.getAllQuestions()
    return res.status(200).json(questions);

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'Database failure when getting questions!'})
  }  
}

const getQuestion = async (req, res) => {
  try {
    const { id } = req.body
    const question = await QuestionRepository.getQuestion(id)
    return res.status(200).json(question);

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'Database failure when getting question!'})
  }  
}

const getRandomQuestion = async (req, res) => {
  try {
    const { prevId, difficulty, topic } = req.body
    const question = await QuestionRepository.getRandomQuestion(prevId, difficulty, topic)
    return res.status(200).json(question);

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'Database failure when getting question!'})
  }  
}

module.exports = { getAllQuestions, getQuestion, getRandomQuestion }
