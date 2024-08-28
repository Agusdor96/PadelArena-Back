import { PickType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UpdateUserCategoryDto extends PickType(UserDto, [
    "category",
]){}