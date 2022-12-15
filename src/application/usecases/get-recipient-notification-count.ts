import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface GetRecipientNotificationCountRequest {
    recipientId: string;
}

interface GetRecipientNotificationCountResponse {
    count: number;
};

@Injectable()
export class GetRecipientNotificationCount {
    constructor(
        private readonly repository: NotificationRepository,
    ) { }

    async execute(request: GetRecipientNotificationCountRequest): Promise<GetRecipientNotificationCountResponse> {
        const {
            recipientId,
        } = request;

        const count = await this.repository.countByRecipientId(recipientId);

        return { count };
    }
}