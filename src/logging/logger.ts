import  { createLogger, transports, format } from 'winston';

const { combine, printf } = format;

const myFormat =  printf(({ message}) => `${message}`);
const myFormatForRequests = printf((x) => `method:${x.request.method} url:${x.request.url} query:${JSON.stringify(x.request.query)} body:${JSON.stringify(x.request.body)} status:${x.response.status}`);
const myFormatForWarn = printf((x) => JSON.stringify(`method:${x.request.method} url:${x.request.url} status:${x.response.status}`));

export const loggerStart = createLogger({
    level: 'info',
    format: combine(
        myFormat
      ),
    transports: [
        new transports.Console(),
    ]
})

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: combine(
                myFormatForRequests,
            ),
        }),
        new transports.File({
            level: 'http',
            format: combine(
                myFormatForRequests,
            ),
            filename: 'http.log'
        }),
        new transports.File({
            level: 'warn',
            format: format.combine(
                myFormatForWarn
            ),
            filename: 'warn.log'
        }),
    ],
})

export const loggerError = createLogger({
    level: 'error',
    format: combine(
        format.printf(err => `${err.date} Error: ${err.message}`)
      ),
      transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            handleExceptions: true,
            handleRejections: true,
        }),
        new transports.Console({
            handleExceptions: true,
            handleRejections: true,
        })
      ],
})

loggerError.exitOnError = false;

