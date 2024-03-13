import { ApiProperty } from '@nestjs/swagger';

export class ConflictSwagger {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Error Message' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}
