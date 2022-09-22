// 'use strict';

// import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { FastifyReply } from 'fastify';
// import { STATUS_CODES } from 'http';
// import { QueryFailedError } from 'typeorm';

// import { ConstraintErrors } from './constraint-errors';

// @Catch(QueryFailedError)
// export class QueryFailedFilter implements ExceptionFilter {
//   constructor(public reflector: Reflector) {}

//   public catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<FastifyReply>();
//     const errorMessage = ConstraintErrors[exception.constraint];

//     const status =
//       exception.constraint && (exception.constraint.startsWith('UQ') || exception.constraint.startsWith('IDX'))
//         ? HttpStatus.CONFLICT
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     response.status(status).send({
//       statusCode: status,
//       error: STATUS_CODES[status],
//       message: errorMessage,
//     });
//   }
// }
