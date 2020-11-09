import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	const options = new DocumentBuilder()
		.setTitle('Contacts')
		.setDescription('Contacts API for AVB applicants')
		.setVersion('1.0')
		.addTag('contacts')
		.build();
	const document = SwaggerModule.createDocument(app, options, {
		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
	});
	SwaggerModule.setup('api-docs', app, document);

	app.enableCors();
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
