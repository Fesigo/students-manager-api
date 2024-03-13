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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindStudentSwagger } from './swagger/find-student.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';
import { ForbiddenSwagger } from 'src/helpers/swagger/forbidden.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('api/v1/students')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Student')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Student.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: FindStudentSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @GetUser() user: User,
  ) {
    return await this.studentService.create(createStudentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all Students of the logged in User.' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @ApiQuery({ name: 'select', required: false, type: 'string', isArray: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindStudentSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
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
  @ApiOperation({ summary: 'Find a Student by ID.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
    description: 'ID of the Student',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindStudentSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied. This student belongs to another user.',
    type: ForbiddenSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: NotFoundSwagger,
  })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @GetUser() user: User,
  ) {
    return await this.studentService.findOne(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing Student.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
    description: 'ID of the Student',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindStudentSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied. This student belongs to another user.',
    type: ForbiddenSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @GetUser() user: User,
  ) {
    return await this.studentService.update(id, updateStudentDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update an existing Student.' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
    description: 'ID of the Student',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content - Student deleted.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied. This student belongs to another user.',
    type: ForbiddenSwagger,
  })
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
    @GetUser() user: User,
  ) {
    return await this.studentService.remove(id, user.id);
  }
}
