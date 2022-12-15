import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotificationCount } from "./get-recipient-notification-count";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipient notifications', () => {
    it('should be able to recipient notifications', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new GetRecipientNotifications(repository);

        await repository.create(makeNotification({ recipientId: 'example-id' }));
        await repository.create(makeNotification({ recipientId: 'example-id' }));
        await repository.create(makeNotification({ recipientId: 'different-one' }));

        const { notifications } = await usecase.execute({
            recipientId: 'example-id',
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'example-id' }),
            expect.objectContaining({ recipientId: 'example-id' }),
        ]))
    });
});