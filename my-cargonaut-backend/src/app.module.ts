import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { OffersModule } from "./offers/offers.module";
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
    imports: [OffersModule, TypeOrmModule.forRoot(), UsersModule, AuthModule, VehiclesModule],
    controllers: [AppController, UsersController],
    providers: [AppService],
})
export class AppModule {}
