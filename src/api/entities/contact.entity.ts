import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Email } from './email.entity';

@Entity()
export class Contact extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@OneToMany(() => Email, (email) => email.contact, { onDelete: 'CASCADE' })
	@Transform((values) => values.map((v) => v.address))
	emails: Email[];
}
