import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Contact } from './entities/contact.entity';

@Module({
	controllers: [ApiController],
	providers: [ApiService],
	imports: [TypeOrmModule.forFeature([Contact])],
})
export class ApiModule {}
