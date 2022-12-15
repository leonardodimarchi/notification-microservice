import { Notification } from "../entities/notification";

export abstract class NotificationRepository {
    abstract save(notification: Notification): Promise<void>;
}