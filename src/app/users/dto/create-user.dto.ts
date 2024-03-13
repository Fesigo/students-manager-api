import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.INVALID_PASSWORD,
  })
  password: string;
}
