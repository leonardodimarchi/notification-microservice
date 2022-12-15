import { Content } from "./content";
import { Notification } from "./notification";

describe('Notification', () => {
    it('should be able to create a content', () => {
        const notification = new Notification({
            recipientId: 'example-id',
            content: new Content('My content'),
            category: 'social',
        });

        expect(notification).toBeTruthy();
    });
});