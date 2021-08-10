const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const log = require('simple-node-logger').createSimpleLogger('frontend.log');

const port = process.env.PORT || 3001;

const logRequestStart = (req, res, next) => {
    log.info(`${req.method} ${req.originalUrl}`) 

    const cleanup = () => {
        res.removeListener('finish', logFn)
        res.removeListener('close', abortFn)
        res.removeListener('error', errorFn)
    }

    const logFn = () => {
        cleanup();
        log.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    }

    const abortFn = () => {
        cleanup()
        log.warn('Request aborted by the client')
    }

    const errorFn = err => {
        cleanup()
        log.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error

    next()
}

app.use(logRequestStart);

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

app.get('/qr/getUrl',function(req,res){
    res.send('http://190.151.54.74:3001/#/qrcode/');
    log.info('url enviada');
})

app.get('/service/getUrl',function(req,res){
    res.send('http://localhost:3002/');
    log.info('url enviada');
})

const server = http.createServer(app);

server.listen(port,(req, res) => log.info('Servidor corriendo...'));
