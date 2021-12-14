export class CreateUserDto {
    username: string;
    birthDate: Date;
    mail: string;
    password: string;
    profilePicturePath: string = "default.png";
}
