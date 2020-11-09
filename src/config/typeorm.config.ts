import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'contacts',
	password: 'contacts',
	database: 'contacts',
	entities: [__dirname + '/../**/*.entity.{js, ts}'],
	// namingStrategy: new SnakeNamingStrategy(),
	synchronize: true, // WARNING: change this!
	logging: 'all',
};
