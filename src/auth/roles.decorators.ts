import { SetMetadata } from "@nestjs/common";






export const Role_key = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(Role_key, roles);






