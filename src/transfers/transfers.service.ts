import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITransfer } from './interfaces/transfer.interface';
import { CreateTransferDto, UpdateTransferDto } from './dto';
import { Transfer } from './schemas/transfer.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Account } from 'src/accounts/schemas/account.schema';
import { UpdateAccountDto } from '../accounts/dto';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer.name) private readonly transferModel: Model<Transfer>,
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly accountsService: AccountsService
  ) { }

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Transfer[]> {
    const { limit, offset } = paginationQuery;

    return await this.transferModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findOne(transferId: string): Promise<Transfer> {
    const transfer = await this.transferModel
      .findById({ _id: transferId })
      .exec();

    if (!transfer) {
      throw new NotFoundException(`Transfer #${transferId} not found`);
    }

    return transfer;
  }

  public async findSenderTransfers(senderId: string): Promise<Transfer[]> {
    const transfers = await this.transferModel
      .find({ senderId: senderId })
      .exec();

    if (!transfers) {
      throw new NotFoundException(`This account has no transfers`);
    }

    return transfers;
  }

  public async create(
    createTransferDto: CreateTransferDto,
  ): Promise<ITransfer> {
    const senderAccount = await this.accountsService.findOne(
      createTransferDto.senderId,
    );
    const receiverAccount = await this.accountsService.findOne(
      createTransferDto.receiverId,
    );

    if( senderAccount.balance < createTransferDto.amount ){
      throw new NotFoundException(`insufficient balance`);
    }

    let newSenderBalance: any;
    newSenderBalance = senderAccount.balance as any - (createTransferDto.amount as any);
    let newReceiverBalance: any;
    newReceiverBalance = receiverAccount.balance as any + (createTransferDto.amount as any);

    const senderAccountUpdate = await this.accountsService.update(
      createTransferDto.senderId,
      { balance: newSenderBalance },
    );
    const receiverAccountUpdate = await this.accountsService.update(
      createTransferDto.receiverId,
      { balance: newReceiverBalance },
    );

    const newTransfer = await new this.transferModel({...createTransferDto, date: Date.now()});
    return newTransfer.save();
  }

  public async update(
    transferId: string,
    updateTransferDto: UpdateTransferDto,
  ): Promise<ITransfer> {
    const existingTransfer = await this.transferModel.findByIdAndUpdate(
      { _id: transferId },
      updateTransferDto,
    );

    if (!existingTransfer) {
      throw new NotFoundException(`Transfer #${transferId} not found`);
    }

    return existingTransfer;
  }

  public async remove(transferId: string): Promise<any> {
    const deletedTransfer = await this.transferModel.findByIdAndRemove(
      transferId,
    );
    return deletedTransfer;
  }
}
