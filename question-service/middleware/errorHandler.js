const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id formatting' })
  } 

  next(error)
}

module.exports = errorHandler
