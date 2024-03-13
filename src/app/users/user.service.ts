import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailExists) {
      throw new ConflictException(
        'There is already a User registered with this email!',
      );
    }

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

  async findOneByEmail(email: string) {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { email },
      })
      .catch(() => {
        throw new NotFoundException(`User not Found!`);
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const emailExists = await this.prismaService.user.findUnique({
      where: { email: updateUserDto.email },
    });

    if (emailExists && emailExists.id != id) {
      throw new ConflictException(
        'There is already a User registered with this email!',
      );
    }

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
