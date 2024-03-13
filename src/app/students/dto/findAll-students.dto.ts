import { Student } from '@prisma/client';
import {
  IsOptional,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { IPagination } from 'src/types/pagination';

@ValidatorConstraint()
export class CheckSelectOptions implements ValidatorConstraintInterface {
  public async validate(select: string) {
    const allowedSelects: IPagination<Student>['select'] = [
      'id',
      'name',
      'course',
      'birthDate',
      'createdAt',
      'updatedAt',
      'userId',
    ];

    const selectOptions = select || [];

    for (const option of selectOptions) {
      if (!allowedSelects.includes(option)) {
        return false;
      }
    }

    return true;
  }
}

export class FindAllStudentsDto
  implements Omit<IPagination<Student>, 'select'>
{
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  order: 'ASC' | 'DESC';

  @IsOptional()
  orderBy: keyof Student;

  @IsOptional()
  @Validate(CheckSelectOptions, {
    message: MessagesHelper.INVALID_SELECT_OPTION,
  })
  select: string[];
}
