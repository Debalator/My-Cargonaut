import { createConnection, EntitySchema } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

type Entity = Function | string | EntitySchema<any>;

export const createTestConfiguration = (
    entities: Entity[]
): TypeOrmModuleOptions => ({
    type: "sqlite",
    database: ":memory:",
    entities,
    synchronize: true,
    dropSchema: true,
    logging: false,
});
