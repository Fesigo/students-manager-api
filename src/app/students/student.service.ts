import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma, Student } from '@prisma/client';
import { FindAllStudentsDto } from './dto/findAll-students.dto';
import { processPaginationParams } from 'src/utils/paginationParams';

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

  async findAll(
    userId: number,
    query: FindAllStudentsDto,
  ): Promise<Partial<Student>[]> {
    const paginationParamsProcessed = processPaginationParams(
      query.limit,
      query.page,
      query.select,
    );

    const options = {
      where: { userId },
      ...paginationParamsProcessed,
      orderBy: {
        [query.orderBy || 'name']: (
          query.order || 'ASC'
        ).toLowerCase() as Prisma.SortOrder,
      },
    };

    return this.prismaService.student.findMany(options);
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
