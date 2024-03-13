import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GetUser } from 'src/common/decorators/request/logged-in-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { FindAllStudentsDto } from './dto/findAll-students.dto';

@Controller('api/v1/students')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ) {
    return await this.studentService.create(createStudentDto, user.id);
  }

  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: FindAllStudentsDto,
    @GetUser() user: User,
  ) {
    return await this.studentService.findAll(user.id, query);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @GetUser() user: User,
  ) {
    return await this.studentService.findOne(id, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @GetUser() user: User,
  ) {
    return await this.studentService.update(id, updateStudentDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
    @GetUser() user: User,
  ) {
    return await this.studentService.remove(id, user.id);
  }
}
