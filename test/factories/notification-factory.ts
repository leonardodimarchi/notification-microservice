import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";

export function makeNotification(override: Partial<Notification> = {}): Notification {
    return new Notification({
        category: 'social',
        content: new Content('Solicitação de amizade'),
        recipientId: 'example-id',
        ...override,
    })
}