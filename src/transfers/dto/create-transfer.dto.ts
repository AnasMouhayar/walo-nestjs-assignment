import { MaxLength, IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: Number;

  @IsString()
  @IsNotEmpty()
  readonly senderId: string;

  @IsString()
  @IsNotEmpty()
  readonly receiverId: string;
}
