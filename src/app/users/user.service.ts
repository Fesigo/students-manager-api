import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import { hashPassord } from 'src/utils/bcrypt';
import { User } from '@prisma/client';
import { selectUserFields } from 'src/utils/selectFields';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'updatedAt'>> {
    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: await hashPassord(createUserDto.password),
      },
      select: selectUserFields,
    });

    return user;
  }

  async findAll() {
    return await this.prismaService.user.findMany({ select: selectUserFields });
  }

  async findOne(id: number) {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { id },
        select: selectUserFields,
      })
      .catch(() => {
        throw new NotFoundException(`User not Found! Id: ${id}`);
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.prismaService.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
      },
      select: selectUserFields,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prismaService.user.delete({ where: { id } });
  }
}
