import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(userName: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        UserName: userName,
        Password: password,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Sai tài khoản hoặc mật khẩu',
      );
    }

    const token = this.jwtService.sign({
      userId: user.IdUser,
      userName: user.UserName,
    });

    user.Token = token;
    await this.userRepository.save(user);

    return {
      message: 'Đăng nhập thành công',
      access_token: token,
    };
  }
}