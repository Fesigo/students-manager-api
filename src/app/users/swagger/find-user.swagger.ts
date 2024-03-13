import { ApiProperty } from '@nestjs/swagger';

export class FindUserSwagger {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Test' })
  name: string;

  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
