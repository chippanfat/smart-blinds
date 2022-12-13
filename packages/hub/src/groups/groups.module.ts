import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupSchema } from 'src/groups/schemas/group.schema';
import { Group } from 'src/groups/dao/group';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'groups', schema: GroupSchema }]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, Group],
})
export class GroupsModule {}
