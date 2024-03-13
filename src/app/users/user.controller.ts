import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindUserSwagger } from './swagger/find-user.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { ConflictSwagger } from 'src/helpers/swagger/conflict.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('api/v1/users')
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new User.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: FindUserSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Conflict - There is already a User registered with this email!',
    type: ConflictSwagger,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'List all Users.' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find a User by ID.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update an existing User.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FindUserSwagger,
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Conflict - There is already a User registered with this email!',
    type: ConflictSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update an existing User.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, type: 'number' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content - User deleted.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: NotFoundSwagger,
  })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.remove(id);
  }
}
