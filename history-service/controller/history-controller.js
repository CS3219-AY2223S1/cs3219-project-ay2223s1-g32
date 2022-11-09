const HistoryRepository = require('../repository/repository')

const getAllHistories = async (req, res, next) => {
  try {
    const histories = await HistoryRepository.getAllHistories()
    return res.status(200).json(histories);

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const getHistory = async (req, res, next) => {
  try {
    const { id } = req.params
    const history = await HistoryRepository.getHistory(id)
    return history
      ? res.status(200).json(history)
      : res.status(404).json({message: "History not found."});

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const getUserHistory = async (req, res, next) => {
  try {
    const { userId } = req.params
    const history = await HistoryRepository.getUserHistory(userId)
    return history
      ? res.status(200).json(history)
      : res.status(404).json({message: "History not found."});

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const createHistory = async (req, res, next) => {
  try {
    const { user, question, content } = req.body
    if (!isValidHistory(user, question, content)) {
      return res.status(400).json({message: "History field(s) missing: please provide at least user, and question"})
    }

    const history = await HistoryRepository.createHistory(user, question, content)

    return res.status(200).json(history)

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params
    await HistoryRepository.deleteHistory(id)
    res.status(204).end()

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const deleteUserHistory = async (req, res, next) => {
  try {
    const { userId } = req.params
    await HistoryRepository.deleteUserHistory(userId)
    res.status(204).end()

  } catch (error) {
    console.log(error)
    next(error)
  }  
}

const isValidHistory = (user, question, content) => {
  return user && question
}

module.exports = { 
  getAllHistories, 
  getHistory, 
  getUserHistory, 
  createHistory,
  deleteHistory,
  deleteUserHistory
}