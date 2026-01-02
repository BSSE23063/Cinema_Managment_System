import { Controller, Post, Body, UnauthorizedException, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BlacklistService } from 'src/blacklist/blacklist.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistservice:BlacklistService
  ) {
    
    console.log('AuthController Constructor Called');
  }

  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    console.log('Login Endpoint Hit:', body);
    const user = await this.authService.validateUser(body.name, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    let tkn =await this.authService.login(user);
    console.log(tkn);
    let obj = {
      token: tkn,
      password: user.password,
      role: user.role,
      name:user.name,
      id:user.id
    };
    console.log(obj+"check");
    
    return obj;
  }

    @Post('logout')
async logout(@Headers('authorization') tokenHeader: string) {
  console.log("blacklist");

  if (!tokenHeader) {
    throw new UnauthorizedException('No token provided');
  }

  const token = tokenHeader.replace('Bearer ', '').trim();

  return await this.authService.logout(token);
}

}
