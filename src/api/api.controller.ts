import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { ContactDto } from './dto/contact.dto';

import { classToPlain } from 'class-transformer';
import { ContactResponseDto } from './dto/contact-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contacts')
export class ApiController {
	constructor(private apiService: ApiService) {}

	@Get()
	async getContacts(): Promise<ContactResponseDto[]> {
		const results = await this.apiService.getContacts();
		return classToPlain(results) as ContactResponseDto[];
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
