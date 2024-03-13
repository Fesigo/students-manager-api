import { Module } from '@nestjs/common';
import { UserModule } from './app/users/user.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './app/students/student.module';

@Module({
  imports: [UserModule, AuthModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
