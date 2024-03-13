import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginBodySwagger } from './swagger/login-body.swagger';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { LoginUnauthorizedSwagger } from './swagger/login-unauthorized.swagger';
import { LoginResponseSwagger } from './swagger/login-response.swagger';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login.' })
  @ApiBody({ type: LoginBodySwagger })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully.',
    type: LoginResponseSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `${MessagesHelper.INCORRECT_EMAIL_OR_PASSWORD}.`,
    type: LoginUnauthorizedSwagger,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
