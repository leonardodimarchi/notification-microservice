import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found.error";

describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new CancelNotification(repository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Solicitação de amizade'),
            recipientId: 'example-id',
        });

        await repository.create(notification);

        await usecase.execute({
            notificationId: notification.id,
        });

        expect(repository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should not be able to cancel when it doest not exist', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new CancelNotification(repository);

        const call = async () => await usecase.execute({
            notificationId: 'fake id',
        });

        expect(call).rejects.toThrow(NotificationNotFound);
    });
});