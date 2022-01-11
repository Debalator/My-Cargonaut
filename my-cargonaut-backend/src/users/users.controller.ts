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
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrdersService } from "../orders/orders.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "./file-upload.utils";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly orderService: OrdersService
    ) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("orders")
    getOrders(@Request() req) {
        return this.orderService.findOrdersByUser(req.user.id);
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    remove(@Request() req) {
        return this.usersService.remove(req.user.id);
    }

    @Get(":id/ratings")
    getRatings(@Param("id") id: number) {
        return this.orderService.findRatingsByUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            dest: "uploads/",
            storage: diskStorage({
                destination: "uploads/",
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits: { fileSize: 10000000 }, //fileSize 10000000 Bytes = 10 MB
        })
    )
    uploadProfilePicture(
        @Request() req,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.usersService.addProfilePicture(req.user.id, file.path);
    }
}
