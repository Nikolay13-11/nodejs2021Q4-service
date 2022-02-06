import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from 'src/common/config';
import { UsersModule } from 'src/users/users.module';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
  ],
  exports: [JwtModule],
})
export class LoginModule {}
