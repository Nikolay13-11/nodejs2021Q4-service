import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private userService: UsersService,
    private JwtService: JwtService,
  ) {}

  async login(userLogin: LoginDto) {
    const user = await this.userService.getOneByName(userLogin.login);

    const { login, password } = userLogin;

    if (!login || !password) {
      throw new HttpException(
        'All input are requared',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.FORBIDDEN);
    } else {
      const payload = { id: user.id, login: userLogin.login };
      const token = await this.JwtService.sign(payload);
      return {
        token: token,
      };
    }
  }
}
