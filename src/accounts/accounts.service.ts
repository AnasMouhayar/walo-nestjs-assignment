import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAccount } from './interfaces/account.interface';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { Account } from './schemas/account.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Account[]> {
    const { limit, offset } = paginationQuery;
    return await this.accountModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('customer')
      .exec();
  }

  public async findOne(accountId: string): Promise<Account> {
    const account = await this.accountModel
      .findById({ _id: accountId })
      .populate('customer')
      .exec();

    if (!account) {
      throw new NotFoundException(`Account #${accountId} not found`);
    }
    return account;
  }

  public async findOneBalance(accountId: string): Promise<Account> {
    const account = await this.accountModel
      .findById({ _id: accountId })
      .select('balance -customer')
      .populate('customer')
      .exec();

    if (!account) {
      throw new NotFoundException(`Account #${accountId} not found`);
    }
    return account;
  }

  public async create(
    createAccountDto: CreateAccountDto,
  ): Promise<IAccount> {
    const account = await new this.accountModel(
      createAccountDto,
    );
    return account.save();
  }

  public async update(
    accountId: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<IAccount> {
    const existingAccount = await this.accountModel.findByIdAndUpdate(
      { _id: accountId },
      updateAccountDto,
      { new: true },
    );

    if (!existingAccount) {
      throw new NotFoundException(`Customer #${accountId} not found`);
    }
    return existingAccount;
  }

  public async remove(accountId: string): Promise<any> {
    const account = await this.accountModel.findByIdAndRemove(
      accountId,
    );
    return account;
  }
}
