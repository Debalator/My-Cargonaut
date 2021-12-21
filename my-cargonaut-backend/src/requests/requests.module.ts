import { Module } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { RequestsController } from "./requests.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/request.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Request])],
    controllers: [RequestsController],
    providers: [RequestsService],
})
export class RequestsModule {}
