import { Injectable } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";
import { OnModuleDestroy } from "@nestjs/common";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notification',
                brokers: ['broker'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'username',
                    password: 'password',
                },
                ssl: true,
            }
        });
    }

    async onModuleDestroy() {
        await this.close();
    }
}