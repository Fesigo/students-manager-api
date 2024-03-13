import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateStudentDto
  implements Omit<Student, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @ApiProperty({ example: 'Test Student', description: `Name of the Student` })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Course', description: `Course of the Student` })
  course: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: MessagesHelper.INVALID_DATE_FORMAT })
  @ApiProperty({
    description: `BirthDate of the Student. Accepted formats: YYYY-MM-DD and MM-DD-YYYY`,
  })
  birthDate: Date;
}
