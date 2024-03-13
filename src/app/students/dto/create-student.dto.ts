import { Student } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateStudentDto
  implements Omit<Student, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  course: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: MessagesHelper.INVALID_DATE_FORMAT })
  birthDate: Date;
}
