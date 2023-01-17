import { IsString, IsInt, MaxLength, IsEmpty, Length,   } from 'class-validator';

export class CreateBookDto {
  
  @IsString()
  @Length(1, 150)
  @IsEmpty()
  author: string;

  @IsString()
  @Length(1, 150)
  @IsEmpty()
  country?: string;

  @IsString()
  @IsEmpty()
  imageLink: string;

  @IsString()
  @Length(1, 150)
  @IsEmpty()
  title: string;

  @IsString()
  @Length(1, 150)
  language?: string;

  @IsString()
  @Length(1, 150)
  link?: string;

  @IsInt()
  @Length(1, 20)
  pages?: number;

  @IsInt()
  @Length(1, 5)
  year?: number;
}
