import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseSwagger {
  @ApiProperty({ example: { id: 1, name: 'Test' } })
  user: {
    id: number;
    name: string;
  };

  @ApiProperty({ example: 'abcd.abcd.abcd', description: 'JWT' })
  token: string;
}
