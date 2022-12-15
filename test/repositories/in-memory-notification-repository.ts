import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";

export class InMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];

    async save(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }  
}