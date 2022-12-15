import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification.mapper";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId,
            }
        });

        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId,
            }
        });

        if (!notification)
            return null

        return PrismaNotificationMapper.toDomain(notification);
    }

    async countByRecipientId(recipientId: string): Promise<number> {
        return await this.prisma.notification.count({
            where: { recipientId },
        });
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.create({
            data: raw,
        });
    }

    async save(notification: Notification): Promise<void> {
        await this.prisma.notification.update({
            data: PrismaNotificationMapper.toPrisma(notification),
            where: {
                id: notification.id,
            }
        });
    }
}