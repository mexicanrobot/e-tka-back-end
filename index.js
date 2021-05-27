const express = require('express')
const cors = require('cors')
const serverConf = require('./src/config/server.config')
const { apiRouter } = require('./src/api')

const app = express()
const corsOptions = {
    origin: serverConf.CLIENT_ORIGIN
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api',apiRouter)
    
app.listen(serverConf.SERVER_PORT, serverConf.SERVER_HOST)