import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { RolesModule } from '../roles/roles.module'; // Import RolesModule
import { BlacklistModule } from '../blacklist/blacklist.module'; // Import BlacklistModule

@Module({
  imports: [
    RolesModule, // This provides RoleGuard
    BlacklistModule, // This provides BlacklistService
  ],
  controllers: [UploadController]
})
export class UploadModule {}