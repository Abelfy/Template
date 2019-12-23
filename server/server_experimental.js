//--- Express ---//
const bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = require('express')();
const cors = require('cors');
//--- SocketIO ---//
const server = require('http').Server(app);
const io = require('socket.io')(server);
//--- Logger ---//
const winston = require('winston');
const myWinstonOptions = {
    transports: [new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
}
if (process.env.NODE_ENV !== 'production') {
    myWinstonOptions.transports[2] = new winston.transports.Console({ format: winston.format.simple(), level: 'debug' })
}
const logger = new winston.createLogger(myWinstonOptions);
// Init logger 
function logRequest(req, res, next) {
    logger.info('[' + new Date().toLocaleString() + '] : ' + req.url)
    next()
}

function logError(err, req, res, next) {
    logger.error('[' + new Date().toLocaleString() + '] : ' + err)
    next()
}
//--- MiddleWares ---//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logRequest);
app.use(logError);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(require(`${__dirname}/middlewares/auth`)(logger));




var port = 8080;

let model = require('./db/model')();
fs.readdir(`${__dirname}/routes`, (err, files) => {
    if (err) throw err;
    files.forEach(file => require(`${__dirname}/routes/${file}`)(app, model));
});

io.on('connection', socket => {
    socket.on('demande_refresh', (data) => {
        io.emit('message', 'hello friends!');
    });
});

server.listen(port);