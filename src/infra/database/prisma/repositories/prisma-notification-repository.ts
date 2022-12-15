import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async save(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data: {
                id: notification.id,
                recipientId: notification.recipientId,
                content: notification.content.value,
                category: notification.category,
                readAt: notification.readAt,
                createdAt: notification.createdAt,
            }
        })
    }
}