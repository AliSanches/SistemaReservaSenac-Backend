import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { AuthenticateUser } from './dto/authenticate.dto';
import jwt from 'jsonwebtoken';
import { hash } from 'crypto';

const key = process.env.SECRETY_KEY;

@Injectable()
export class AuthenticateService {
  constructor(private prisma: PrismaService) {}

  async authenticate(data: AuthenticateUser) {
    const mail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const passwdHash = hash(data.password, '8');

    console.log(passwdHash);

    if (mail?.senha === data.password && data.password === passwdHash) {
      const token = jwt.sign({ mail, key });

      return { mail, token };
    }
  }
}
