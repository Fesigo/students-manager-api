import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
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

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.INVALID_PASSWORD,
  })
  @ApiProperty({
    example: 'Test@123',
    description:
      'Password of the user. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}
