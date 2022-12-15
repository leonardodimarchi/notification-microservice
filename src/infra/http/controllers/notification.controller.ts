import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/usecases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';

@Controller()
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const {
      recipientId,
      category,
      content,
    } = body;

    const { notification } =  await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification,
    };
  }
}
