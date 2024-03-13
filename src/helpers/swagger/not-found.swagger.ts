import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Error Message' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}
