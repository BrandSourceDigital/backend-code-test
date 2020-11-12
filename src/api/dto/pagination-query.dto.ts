import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
	@Transform((x) => parseInt(x))
	@IsNumber()
	page?: number;

	@Transform((x) => parseInt(x))
	@IsNumber()
	itemsPerPage?: number;
}
