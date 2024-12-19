import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { AuthenticateUser } from './dto/authenticate.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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

    const compare = await bcrypt.compare(data.password, mail.senha);

    if (compare) {
      const token = jwt.sign({ mail }, key);

      return { mail, token };
    } else {
      return null;
    }
  }
}
