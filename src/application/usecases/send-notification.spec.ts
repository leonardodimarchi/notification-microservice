import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";

describe('Send notification', () => {
    it('should be able to send a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new SendNotification(repository);

        const { notification } = await usecase.execute({
            content: 'testing',
            category: 'social',
            recipientId: 'example-id'
        });

        expect(repository.notifications).toHaveLength(1);
        expect(repository.notifications[0]).toEqual(notification);
    });
});