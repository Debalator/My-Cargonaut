import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { OffersModule } from "./offers/offers.module";
import { VehiclesModule } from "./vehicles/vehicles.module";
import { RequestsModule } from "./requests/requests.module";
import { AddressesModule } from "./addresses/addresses.module";
import { OrdersModule } from "./orders/orders.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
    imports: [
        OffersModule,
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        VehiclesModule,
        RequestsModule,
        AddressesModule,
        OrdersModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "angular"),
        }),
    ],
    controllers: [AppController, UsersController],
    providers: [AppService],
})
export class AppModule {}
