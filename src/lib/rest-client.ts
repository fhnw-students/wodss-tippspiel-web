export type TIdentifier = string | number;

export class RestClient {

  constructor() {
    // TODO:
  }

}

  // public async findOne<T>(id: TIdentifier): Promise<T> {
  //   const response = await this.fetchGet<T>(`${this.resource}/${id}`);
  //   if (this.model) {
  //     return plainToClass(this.model, response);
  //   }
  //   return response;
  // }

  // public async findAll<T>(query?: string): Promise<T[]> {
  //   const response = await this.fetchGet(`${this.resource}`, query);
  //   if (response.status === 200) {
  //     if (this.model) {
  //       return plainToClass(this.model, responses);
  //     }
  //   }
  //   return responses;
  // }

  // public create<T>(body?: TBody): Promise<T> {
  //   return this.fetchPost<T>(`${this.resource}`, body);
  // }

  // public update<T>(id: TIdentifier, body?: TBody): Promise<T> {
  //   return this.fetchPut<T>(`${this.resource}/${id}`, body);
  // }

  // public delete<T>(id: TIdentifier): Promise<T> {
  //   return this.fetchDelete<T>(`${this.resource}/${id}`);
  // }
