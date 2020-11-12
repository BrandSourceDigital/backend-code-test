import { ApiProperty } from '@nestjs/swagger';
import { ContactResponseDto } from './contact-response.dto';

export class ContactResponsePaginatedDto {
	contacts: ContactResponseDto[];

	@ApiProperty({
		description: 'Current page of results',
	})
	page: number;

	@ApiProperty({
		description: 'Items per page of results',
	})
	itemsPerPage: number;

	@ApiProperty({
		description: 'Total items available to view',
	})
	totalItems: number;
}
