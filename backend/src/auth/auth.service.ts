import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { email: username },
    });

    if (user && user.motDePasse === password) {
      return user;
    }
    return null;
  }
}
