import { ApiProperty } from '@nestjs/swagger';

export class FindStudentSwagger {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Test Student' })
  name: string;

  @ApiProperty({ example: 'Course' })
  course: string;

  @ApiProperty({ example: new Date() })
  birthDate: Date;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: 1 })
  userId: number;
}
