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
          return res.redirect('/');
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, key);
        req.body.id = decoded;

        return next();
      } catch (err) {
        return res.redirect('/');
      }
    }
  }
}
