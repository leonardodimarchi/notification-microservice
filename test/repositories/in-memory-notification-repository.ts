import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";

export class InMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(n => n.id === notificationId);

        if (!notification)
            return null;
        else
            return notification;
    }

    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }  

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(n => n.id === notification.id);

        if (notificationIndex >= 0)
            this.notifications[notificationIndex] = notification;
    }

    async countByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(n => n.recipientId === recipientId).length;
    }
}