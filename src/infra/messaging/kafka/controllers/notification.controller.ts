import { SendNotification } from "@application/usecases/send-notification";
import { Controller } from "@nestjs/common"
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationPayload {
    content: string;
    category: string;
    recipientId: string;
}

@Controller()
export class NotificationController {

    constructor(
        private readonly sendNotificationUsecase: SendNotification,
    ) {}

    @EventPattern('notifications.send-notification')
    async handleSendNotification(@Payload() { content, category, recipientId }: SendNotificationPayload) {
        await this.sendNotificationUsecase.execute({
            content,
            category,
            recipientId,
        });
    }
}