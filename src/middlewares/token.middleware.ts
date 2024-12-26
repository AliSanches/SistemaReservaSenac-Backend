import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const key = process.env.SECRETY_KEY;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    {
      try {
        const header = req.headers['authorization'];

        if (!header) {
          return res.status(401).json({ message: 'Token JWT não fornecido!' });
        }

        const token = header.split(' ')[1];

        const decoded = jwt.verify(token, process.env.SECRETY_KEY);
        req.body.id = decoded;

        next();
      } catch {
        res.status(401).json('Unauthorized request');
      }
    }
  }
}
