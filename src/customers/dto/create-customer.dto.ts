import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
}
