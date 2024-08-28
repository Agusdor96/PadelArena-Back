import { PickType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UpdateUserDto extends PickType(UserDto, [
    "phone",
    "country",
    "address",
    "city",
    "category",
    "profileImg"
]){}