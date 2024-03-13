import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto, userId: number) {
    const student = this.prismaService.student.create({
      data: {
        name: createStudentDto.name,
        course: createStudentDto.course,
        birthDate: createStudentDto.birthDate,
        userId,
      },
    });

    return student;
  }

  async findAll(userId: number): Promise<Student[]> {
    return this.prismaService.student.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Student> {
    const student = await this.prismaService.student
      .findUniqueOrThrow({ where: { id } })
      .catch(() => {
        throw new NotFoundException(`Student not Found! Id: ${id}`);
      });

    if (student.userId != userId) {
      throw new ForbiddenException(
        'Access denied. This student belongs to another user.',
      );
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto, userId: number) {
    await this.findOne(id, userId);

    return await this.prismaService.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prismaService.student.delete({ where: { id } });
  }
}
