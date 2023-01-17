import { IsEmpty, IsString, Length } from "class-validator";
import { Role } from "../../../types"

export class CreateUserDto {

  @IsString()
  @Length(1, 150)
  @IsEmpty()
  email: string;

  @IsString()
  @Length(1, 150)
  @IsEmpty()
  password: string;

  role?: Role[];
}