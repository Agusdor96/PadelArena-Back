import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "src/user/roles.enum";

export const Roles = (...roles: RoleEnum[]) => SetMetadata("roles", roles)