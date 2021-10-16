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
import { TransfersService } from './transfers.service';
import { CreateTransferDto, UpdateTransferDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private transfersService: TransfersService) {}

  @Get()
  public async getAllTransfers(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const transfers = await this.transfersService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(transfers);
  }

  @Get('/:id')
  public async getTransfer(@Res() res, @Param('id') transferId: string) {
    const transfer = await this.transfersService.findOne(transferId);
    if (!transfer) {
      throw new NotFoundException('Transfer does not exist!');
    }
    return res.status(HttpStatus.OK).json(transfer);
  }

  @Get('/sender/:id')
  public async getSenderTransfers(@Res() res, @Param('id') senderId: string) {
    const transfers = await this.transfersService.findSenderTransfers(senderId);
    if (!transfers) {
      throw new NotFoundException('No Transfers in this account');
    }
    return res.status(HttpStatus.OK).json(transfers);
  }

  @Post()
  public async addTransfer(
    @Res() res,
    @Body() createTransferDto: CreateTransferDto,
  ) {
    try {
      const transfer = await this.transfersService.create(createTransferDto);
      return res.status(HttpStatus.OK).json({
        message: 'Transfer has been created successfully',
        transfer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Transfer not created! --- '+err,
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateTransfer(
    @Res() res,
    @Param('id') transferId: string,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    try {
      const transfer = await this.transfersService.update(
        transferId,
        updateTransferDto,
      );
      if (!transfer) {
        throw new NotFoundException('Transfer does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Transfer has been successfully updated',
        transfer,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Transfer not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteTransfer(@Res() res, @Param('id') transferId: string) {
    if (!transferId) {
      throw new NotFoundException('Transfer ID does not exist');
    }

    const transfer = await this.transfersService.remove(transferId);

    if (!transfer) {
      throw new NotFoundException('Transfer does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Transfer has been deleted',
      transfer,
    });
  }
}
