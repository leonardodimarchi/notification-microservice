import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification,
}

@Injectable()
export class SendNotification {
    constructor(
        private readonly repository: NotificationRepository,
    ) { }

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const {
            recipientId,
            category,
            content,
        } = request;

        const notification = new Notification({
            recipientId,
            category,
            content: new Content(content),
        });

        await this.repository.create(notification);

        return {
            notification,
        };
    }
}