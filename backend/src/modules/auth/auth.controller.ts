import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: {email: string, password: string}) {
    if (!body.email || !body.password) {
      throw new HttpException('email e senha obrigatorios', 400);
    }
    const user = await this.authService.validate(body.email, body.password);
    
    return this.authService.generateToken(user);
  }

  @Post("/refreshtoken")
  async generateToken(@Body() body: {refreshToken: string} ){
    return this.authService.generateNewToken(body.refreshToken)
  }
}
