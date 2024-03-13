import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Test', description: `Name of the User` })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'test@email.com',
    description: `Email address of the User`,
  })
  email: string;
}
