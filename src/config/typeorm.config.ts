import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'contacts',
	password: 'contacts',
	database: 'contacts',
	entities: [__dirname + '/../**/*.entity.{js, ts}'],
	synchronize: true,
	logging: 'all',
};

if (process.env.DATABASE_URL) {
	typeOrmConfig = {
		type: 'postgres',
		url: process.env.DATABASE_URL,
		entities: [__dirname + '/../**/*.entity.{js, ts}'],
		extra: {
			ssl: true,
		},
		synchronize: true,
	};
}

export { typeOrmConfig };

// export const typeOrmConfig: TypeOrmModuleOptions = {
// 	type: 'postgres',
// 	host: 'localhost',
// 	port: 5432,
// 	username: 'contacts',
// 	password: 'contacts',
// 	database: 'contacts',
// 	entities: [__dirname + '/../**/*.entity.{js, ts}'],
// 	// namingStrategy: new SnakeNamingStrategy(),
// 	synchronize: true, // WARNING: change this!
// 	logging: 'all',
// };
