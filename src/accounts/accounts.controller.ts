import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  public async getAllAccount(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const accounts = await this.accountsService.findAll(
      paginationQuery,
    );
    return res.status(HttpStatus.OK).json(accounts);
  }

  @Get('/:id')
  public async getAccount(
    @Res() res,
    @Param('id') accountId: string,
  ) {
    const account = await this.accountsService.findOne(
      accountId,
    );
    if (!account) {
      throw new NotFoundException('account does not exist!');
    }
    return res.status(HttpStatus.OK).json(account);
  }

  @Get('/balance/:id')
  public async getAccountBalance(
    @Res() res,
    @Param('id') accountId: string,
  ) {
    const account = await this.accountsService.findOneBalance(
      accountId,
    );
    if (!account) {
      throw new NotFoundException('account does not exist!');
    }
    return res.status(HttpStatus.OK).json(account);
  }

  @Post()
  public async addAccount(
    @Res() res,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    try {
      const account = await this.accountsService.create(
        createAccountDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'account has been created successfully',
        account,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Account not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateAccount(
    @Res() res,
    @Param('id') accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const account = await this.accountsService.update(
        accountId,
        updateAccountDto,
      );
      if (!account) {
        throw new NotFoundException('account does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'account has been successfully updated',
        account,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Account not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteAccount(
    @Res() res,
    @Param('id') accountId: string,
  ) {
    if (!accountId) {
      throw new NotFoundException('account ID does not exist');
    }

    const account = await this.accountsService.remove(accountId);

    if (!account) {
      throw new NotFoundException('account does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'account has been deleted',
      account,
    });
  }
}
