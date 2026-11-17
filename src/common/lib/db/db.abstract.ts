import {Model, QueryFilter, QueryOptions, Types} from "mongoose";

export abstract class DBAbstract<T> {
    protected constructor(protected readonly model:Model<T>) {
    }
    async create(data:Partial<T>) {
        return this.model.create(data);
    }

    async update(filter:QueryFilter<T>, data:Partial<T>,options:QueryOptions<T>) {
        return await this.model.findOneAndUpdate(filter, data,options)
    }
    async delete(filter:QueryFilter<T>) {
        return await this.model.deleteOne(filter);
    }

}


