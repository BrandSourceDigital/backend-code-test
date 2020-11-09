import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';
import { Email } from './entities/email.entity';

@Injectable()
export class ApiService {
	constructor(
		@InjectRepository(Contact)
		private contactRepository: Repository<Contact>
	) {}

	async getContacts(): Promise<Contact[]> {
		const query = this.contactRepository.createQueryBuilder('contact');

		const contacts = await query
			.leftJoinAndSelect('contact.emails', 'emails')
			.getMany();

		return contacts;
	}

	async createContact(createContactDto: ContactDto): Promise<Contact> {
		const { firstName, lastName, emails } = createContactDto;

		const contact = new Contact();

		contact.firstName = firstName;
		contact.lastName = lastName;
		contact.emails = emails.map((address) => {
			const newEmail = new Email();
			newEmail.address = address;
			return newEmail;
		});

		await this.contactRepository.manager.transaction(async (manager) => {
			await manager.save(contact.emails);
			await manager.save(contact);
		});

		await this.cleanUpOrphanedAddresses();

		return contact;
	}

	async fullUpdateContact(
		contactId: number,
		updateContactDto: ContactDto
	): Promise<Contact> {
		const { firstName, lastName, emails } = updateContactDto;

		const contact = await this.getContactById(contactId);

		contact.firstName = firstName;
		contact.lastName = lastName;

		contact.emails = emails.map((address) => {
			const newEmail = new Email();
			newEmail.address = address;
			return newEmail;
		});

		await this.contactRepository.manager.transaction(async (manager) => {
			await manager.save(contact.emails);
			await manager.save(contact);
		});

		await this.cleanUpOrphanedAddresses();

		return contact;
	}

	async deleteContactById(id: number) {
		const contact = await this.getContactById(id);

		if (contact) {
			this.contactRepository.manager.transaction(async (manager) => {
				if (contact.emails) {
					await manager.remove(contact.emails);
				}
				await manager.remove(contact);
			});
		}
	}

	async getContactById(id: number) {
		const query = this.contactRepository.createQueryBuilder('contact');

		const contact = await query
			.where('contact.id = :id', { id })
			.leftJoinAndSelect('contact.emails', 'emails')
			.getOne();

		if (!contact) {
			throw new NotFoundException(`Contact with ID ${id} not found`);
		}

		return contact;
	}

	private async cleanUpOrphanedAddresses() {
		const connection = this.contactRepository.manager.connection;
		const repo = connection.getRepository(Email);

		await repo.delete({ contact: { id: null } });
	}
}
