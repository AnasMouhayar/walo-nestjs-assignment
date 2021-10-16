import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  @IsNotEmpty()
  readonly balance: Number;

  @IsString()
  readonly customer: string;
}
