import { ApiProperty } from '@nestjs/swagger';

export class ContactResponseDto {
	@ApiProperty({
		description: 'Contact ID',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: "Contact's first name",
		example: 'John',
	})
	firstName: string;

	@ApiProperty({
		description: "Contact's last name",
		example: 'Smith',
	})
	lastName: string;

	@ApiProperty({
		description: 'List of contact email addresses',
		example: ['contact@domain.com'],
	})
	emails: string[] = [];
}
