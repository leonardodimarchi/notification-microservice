import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface GetRecipientNotificationsRequest {
    recipientId: string;
}

interface GetRecipientNotificationsResponse {
    notifications: Notification[];
};

@Injectable()
export class GetRecipientNotifications {
    constructor(
        private readonly repository: NotificationRepository,
    ) { }

    async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const {
            recipientId,
        } = request;

        const notifications = await this.repository.findManyByRecipientId(recipientId);

        return { notifications };
    }
}