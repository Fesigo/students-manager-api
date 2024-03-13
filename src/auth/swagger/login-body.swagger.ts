import { ApiProperty } from '@nestjs/swagger';

export class LoginBodySwagger {
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @ApiProperty({ example: 'Test@123' })
  password: string;
}
