import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("vehicles")
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create({
            ...createVehicleDto,
            owner: req.user.sub,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req) {
        return this.vehiclesService.findAllByOwner(req.user.sub);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.vehiclesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateVehicleDto: UpdateVehicleDto
    ) {
        return this.vehiclesService.update(+id, updateVehicleDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.vehiclesService.remove(+id);
    }
}
