const http = require('http')
const {v4: uuidv4} = require('uuid')
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendOptionsResponse,
} = require('./responseHandler')

const todos = []
const requestListener = (req, res) => {
  let body = ''
  // OPTIONS 是 CORS 預檢請求，想說先判斷
  if (req.method === 'OPTIONS') {
    sendOptionsResponse(res)
    return
  }
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  if (req.url === '/todos' && req.method === 'GET') {
    sendSuccessResponse(res, todos)
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      try {
        const {title} = JSON.parse(body)
        if (typeof title !== 'string' || title.trim() === '') {
          sendErrorResponse(res)
          return
        }
        const newTodo = {
          id: uuidv4(),
          title: title.trim(),
          completed: false,
        }
        todos.push(newTodo)
        sendSuccessResponse(res, todos)
      } catch (error) {
        sendErrorResponse(res)
      }
    })
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0
    sendSuccessResponse(res, todos)
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop()
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      sendErrorResponse(res)
      return
    }
    todos.splice(index, 1)
    sendSuccessResponse(res, todos)
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      try {
        const id = req.url.split('/').pop()
        const index = todos.findIndex((todo) => todo.id === id)
        const {title, completed} = JSON.parse(body)
        if (
          index === -1 ||
          typeof title !== 'string' ||
          title.trim() === '' ||
          typeof completed !== 'boolean'
        ) {
          sendErrorResponse(res)
          return
        }
        todos[index] = {...todos[index], title: title.trim(), completed}
        sendSuccessResponse(res, todos)
      } catch (error) {
        sendErrorResponse(res)
      }
    })
  } else {
    sendErrorResponse(res, 404, '無此路由')
  }
}
const server = http.createServer(requestListener)
server.listen(3005)
