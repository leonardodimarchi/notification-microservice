import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotificationCount } from "./get-recipient-notification-count";

describe('Get recipient notification count', () => {
    it('should be able to cancel a notification', async () => {
        const repository = new InMemoryNotificationRepository();
        const usecase = new GetRecipientNotificationCount(repository);

        await repository.create(makeNotification({ recipientId: 'example-id' }));
        await repository.create(makeNotification({ recipientId: 'example-id' }));
        await repository.create(makeNotification({ recipientId: 'different-one' }));

        const { count } = await usecase.execute({
            recipientId: 'example-id',
        });

        expect(count).toEqual(2);
    });
});