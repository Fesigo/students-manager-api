import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/app/users/user.service';
import { compareHash } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      user: { id: user.id, name: user.name },
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, passport: string) {
    let user: User;

    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareHash(passport, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
