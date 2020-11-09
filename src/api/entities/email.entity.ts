import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Email extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Contact, (contact) => contact.emails)
	contact: Contact;

	@Column()
	address: string;
}
