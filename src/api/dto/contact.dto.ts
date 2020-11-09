import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactDto {
	@ApiProperty({
		description: "Contact's first name",
		example: 'John',
	})
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({
		description: "Contact's last name",
		example: 'Smith',
	})
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({
		description: 'List of contact email addresses',
		example: ['contact@domain.com'],
	})
	@IsEmail({}, { each: true })
	emails: string[] = [];
}
