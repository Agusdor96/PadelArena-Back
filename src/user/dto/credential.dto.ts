import { PickType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class CredentialsDto extends PickType(UserDto, [
    'email',
    'password'
]){}