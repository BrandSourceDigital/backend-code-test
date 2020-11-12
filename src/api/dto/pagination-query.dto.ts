import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
	@Transform((x) => parseInt(x))
	@IsNumber()
	@IsOptional()
	page?: number;

	@Transform((x) => parseInt(x))
	@IsNumber()
	@IsOptional()
	itemsPerPage?: number;
}
