import  { createLogger, transports, format, level } from 'winston';
import { convert } from './helper';

const { combine, timestamp, label, printf, ms, colorize, errors, json } = format;

const myFormat =  printf(({ message}) => `${message}`);
const myFormatForRequests = printf((x) => JSON.stringify(`method:${x.request.method} url:${x.request.url} query:${convert(x.request.query)} body:${convert(x.request.body)} status:${x.response.status}`));

export const loggerStart = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'loggerStart Info' }),
        myFormat
      ),
    transports: [
        new transports.Console(),
    ]
})

export const logger = createLogger({
    // exitOnError: fa1lse,
    transports: [
        new transports.Console({
            level: 'info',
            format: combine(
                label({ label: 'logger Info' }),
                // myFormat
                myFormatForRequests
                // json()
            ),
        }),
        new transports.Console({
            level: 'http',
            format: combine(
                label({ label: 'logger http' }),
                myFormatForRequests
                // json()
            ),
        }),
        new transports.File({
            level: 'warn',
            format: format.combine(
                label({ label: 'logger warn' }),
                json()
            ),
            filename: 'warn.log'
        }),
    //     new transports.Console({
    //         format: format.combine(
    //             label({ label: 'logger err handleRejections' }),
    //             errors({ stack: true }),
    //             format.timestamp(),
    //             ),
    //         level: 'error',
    //         // filename: 'err.log',
    //         handleRejections: true,
    //     }),
    // ],
    // exceptionHandlers: [
    //     new transports.Console({
    //         level: 'error',
    //         format: combine(
    //             label({ label: 'logger err exceptionHandlers' }),
    //             errors({ stack: true }),
    //             format.timestamp(),
    //           ),
    //         // filename: 'err.log'
    //     })
    ],
})

export const loggerError = createLogger({
    // exitOnError: false,
    level: 'error',
    format: combine(
        errors({ stack: true }),
        // json(),
        format.printf(x => x.message)
      ),
      transports: [
        new transports.Console({
            handleRejections: true,
        }),
      ],
    exceptionHandlers: [
        new transports.Console()
    ],
})

loggerError.exitOnError = false;



// Method:${x.request.method} url:${x.request.url} query:${x.request.query} body:${x.request.body} response status:${x.response.status}
// url:${request.url} query parameters:${request.query} body:${request.body} status code:${request.status}