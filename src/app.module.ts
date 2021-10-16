import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://anas:MongoPassWaloTest123@walo.dkfrf.mongodb.net/walo?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }),
    }),
    CustomersModule,
    AccountsModule,
    TransfersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
