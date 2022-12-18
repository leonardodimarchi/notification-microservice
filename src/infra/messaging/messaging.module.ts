import { SendNotification } from "@application/usecases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { NotificationController } from "./kafka/controllers/notification.controller";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        KafkaConsumerService,
        SendNotification,
    ],
    controllers: [
        NotificationController,
    ]
})
export class MessagingModule { }