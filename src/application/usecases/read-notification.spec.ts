import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found.error";
import { ReadNotification } from "./read-notification";

describe('Read notification', () => {
    it('should be able to read a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new ReadNotification(repository);

        const notification = makeNotification();

        await repository.create(notification);

        await usecase.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('should not be able to read when it doest not exist', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new ReadNotification(repository);

        const call = async () => await usecase.execute({
            notificationId: 'fake id',
        });

        expect(call).rejects.toThrow(NotificationNotFound);
    });
});