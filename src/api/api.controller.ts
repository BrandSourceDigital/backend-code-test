import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { ContactDto } from './dto/contact.dto';

import { classToPlain } from 'class-transformer';
import { ContactResponseDto } from './dto/contact-response.dto';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactResponsePaginatedDto } from './dto/contact-response-paginated.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ApiController {
	constructor(private apiService: ApiService) {}

	@ApiExcludeEndpoint()
	@Get()
	async getContacts(): Promise<ContactResponseDto[]> {
		const results = await this.apiService.getContacts();
		return classToPlain(results) as ContactResponseDto[];
	}

	@Get('/paginated')
	async getContactsPaginated(
		@Query() pagination: PaginationQueryDto
	): Promise<ContactResponsePaginatedDto> {
		const [results, count] = await this.apiService.getContactsPaginated(
			pagination.page,
			pagination.itemsPerPage
		);

		const response = {
			contacts: classToPlain(results) as ContactResponseDto[],
			page: Math.max(1, pagination.page),
			itemsPerPage: pagination.itemsPerPage,
			totalItems: count,
		};

		return response;
	}

	@ApiResponse({ status: 404 })
	@Get('/:contactId')
	async getContact(
		@Param('contactId') contactId: number
	): Promise<ContactResponseDto> {
		const results = await this.apiService.getContactById(contactId);
		return classToPlain(results) as ContactResponseDto;
	}

	@Post()
	async createContact(
		@Body() createContactDto: ContactDto
	): Promise<ContactResponseDto> {
		const result = await this.apiService.createContact(createContactDto);
		return classToPlain(result) as ContactResponseDto;
	}

	@Put('/:contactId')
	async updateContact(
		@Param('contactId') contactId: number,
		@Body() updateContactDto: ContactDto
	): Promise<ContactResponseDto> {
		const result = await this.apiService.fullUpdateContact(
			contactId,
			updateContactDto
		);
		return classToPlain(result) as ContactResponseDto;
	}

	@ApiResponse({ status: 200 })
	@ApiResponse({ status: 404 })
	@Delete('/:contactId')
	async deleteContact(@Param('contactId') contactId: number) {
		await this.apiService.deleteContactById(contactId);
	}
}
