import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferSchema, Transfer } from './schemas/transfer.schema';
import { CustomersModule } from 'src/customers/customers.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Account, AccountSchema } from 'src/accounts/schemas/account.schema';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
      { name: Account.name, schema: AccountSchema }
    ]),
    AccountsModule
  ],
  providers: [TransfersService,AccountsService],
  controllers: [TransfersController],
})
export class TransfersModule {}
