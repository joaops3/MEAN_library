import { PartialType } from '@nestjs/swagger';
import { User } from '../../user/user.schema';
import { CreateUserDto } from '../../user/userDto/create-user.dto';

export class BuyBookDto extends PartialType(CreateUserDto) {
  _id: string;
}
