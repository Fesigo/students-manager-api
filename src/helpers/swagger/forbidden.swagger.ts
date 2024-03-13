import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenSwagger {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Error Message' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}
