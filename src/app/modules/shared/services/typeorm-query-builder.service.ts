import { FindOneOptions, FindOptionsWhere, SelectQueryBuilder } from 'typeorm';

import { CriteriaResult } from '../interfaces/criteria-result.interface';
import { SortOrder } from '../types/sort-order.type';

export class TypeOrmQueryBuilder<T> {
	constructor(
		private readonly _queryBuilder: SelectQueryBuilder<T>,
		private readonly alias: string,
	) {}

	where(where: FindOptionsWhere<T> | FindOneOptions<T>): void {
		this._queryBuilder.where(where);
	}

	addOrderByColumn(column: string, sortOrder?: SortOrder): void {
		this._queryBuilder.addOrderBy(`${this.alias}.${column}`, sortOrder);
	}

	addOrderByColumnCase(column: string, value: string, sortOrder?: SortOrder): void {
		if (value) {
			this._queryBuilder.addOrderBy(
				`CASE WHEN ${column} = :${column} THEN 0 ELSE 1 END`,
				sortOrder,
			);
			this._queryBuilder.setParameters({ [`${column}`]: value });
		}
	}

	addOrderByDateApproximation(column: string, sortOrder?: SortOrder): void {
		this._queryBuilder.addOrderBy(`ABS(EXTRACT(EPOCH FROM "${column}" - NOW()))`, sortOrder);
		this._queryBuilder.setParameters({ [`${column}`]: column });
	}

	pagination(take: number, skip: number): void {
		this._queryBuilder.take(take);
		this._queryBuilder.skip(skip);
	}

	paginationWithRelations(limit: number, offset: number): void {
		this._queryBuilder.limit(limit);
		this._queryBuilder.offset(offset);
	}

	async executeGetManyAndCount(): Promise<CriteriaResult<T>> {
		const [data, count] = await this._queryBuilder.getManyAndCount();

		return { data, count };
	}

	async executeGetOne(): Promise<T> {
		return this._queryBuilder.getOne();
	}

	get queryBuilder(): SelectQueryBuilder<T> {
		return this._queryBuilder;
	}
}
