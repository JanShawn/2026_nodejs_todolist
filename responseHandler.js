// responseHandler.js

const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-Type': 'application/json',
}

const sendSuccessResponse = (res, data, statusCode = 200) => {
  res.writeHead(statusCode, headers)
  res.write(
    JSON.stringify({
      status: 'success',
      data,
    }),
  )
  res.end()
}

const sendErrorResponse = (
  res,
  statusCode = 400,
  message = '欄位未填寫正確，或無此 todo id',
) => {
  res.writeHead(statusCode, headers)
  res.write(
    JSON.stringify({
      status: 'error',
      message,
    }),
  )
  res.end()
}

const sendOptionsResponse = (res) => {
  res.writeHead(200, headers)
  res.end()
}

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendOptionsResponse,
}
