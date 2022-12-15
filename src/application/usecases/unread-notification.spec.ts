import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found.error";
import { UnreadNotification } from "./unread-notification";

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new UnreadNotification(repository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await repository.create(notification);

        await usecase.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to unread when it doest not exist', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new UnreadNotification(repository);

        const call = async () => await usecase.execute({
            notificationId: 'fake id',
        });

        expect(call).rejects.toThrow(NotificationNotFound);
    });
});