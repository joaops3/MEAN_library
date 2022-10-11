import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }
    const validation = await this.userService.comparePassword(password, user.password);
    if (!validation) {
      throw new HttpException('Email ou senha invalidos', 401);
    }
    return user;
  }

  async generateToken(user: any) {
    const payload = { username: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload, { secret: '123' }) };
  }
}
