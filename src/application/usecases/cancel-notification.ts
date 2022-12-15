import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found.error";

interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(
        private readonly repository: NotificationRepository,
    ) { }

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const {
            notificationId
        } = request;

        const notification = await this.repository.findById(notificationId);

        if (!notification)
            throw new NotificationNotFound();

        notification.cancel();

        await this.repository.save(notification);
    }
}