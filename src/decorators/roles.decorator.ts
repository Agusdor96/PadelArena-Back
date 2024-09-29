import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../enums/roles.enum";

export const Roles = (...roles: RoleEnum[]) => SetMetadata("roles", roles)