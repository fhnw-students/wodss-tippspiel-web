import { plainToClass } from 'class-transformer';

export interface RestClientConfiguration {
  basePath?: string;
  authorizationBuilder?: () => string;
}

export interface THeaders { [name: string]: string; }
// export type THeaders = { [name: string]: string };
export type TBody = Blob | BufferSource | FormData | URLSearchParams | string;
export type TIdentifier = string | number;

export const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const createRestClient = (config: RestClientConfiguration) => (resource?: string, model?: any) => {
  return new RestClient(config, resource, model);
};

class RestClient {

  private headers: THeaders = {};
  private withCredentials: boolean;
  private withJsonHeaders: boolean;

  constructor(
    private config: RestClientConfiguration,
    private resource?: string,
    private model?: any,
  ) {
    this.withCredentials = !!this.config.authorizationBuilder;
    this.withJsonHeaders = true;
  }

  public withResource(resource: string): RestClient {
    this.resource = resource;
    return this;
  }

  public withoutCredentials(): RestClient {
    this.withCredentials = false;
    return this;
  }

  public withModel(model: any): RestClient {
    this.model = model;
    return this;
  }

  public withHeaders(headers: THeaders): RestClient {
    this.configureHeaders(headers);
    return this;
  }

  public withoutJsonHeaders(): RestClient {
    // this.withHeaders(jsonHeaders);
    this.withJsonHeaders = false;
    return this;
  }

  public getRequestURL(path: string, query?: string): string {
    return `${this.config.basePath}${path}${query || ''}`;
  }

  public getHeaders(): THeaders {
    if (this.withCredentials && this.config.authorizationBuilder) {
      this.withHeaders({
        // tslint:disable-next-line
        'Authorization': this.config.authorizationBuilder(),
      });
    }
    if (this.withJsonHeaders) {
      this.withHeaders(jsonHeaders);
    }
    return this.headers;
  }

  public getResource(): string | undefined {
    return this.resource;
  }

  public async findOne<T>(id: TIdentifier): Promise<T> {
    const response = await this.fetchGet<T>(`${this.resource}/${id}`);
    if (this.model) {
      return plainToClass(this.model, response);
    }
    return response;
  }

  public async findAll<T>(query?: string): Promise<T[]> {
    const responses = await this.fetchGet<T[]>(`${this.resource}`, query);
    if (this.model) {
      return plainToClass(this.model, responses);
    }
    return responses;
  }

  public async fetchGet<T>(requestURL: string = '', query?: string, requestOption?: RequestInit): Promise<T> {
    const finalRequestOption: RequestInit = Object.assign({
      headers: this.getHeaders(),
    }, requestOption);
    let response: Response;
    response = await fetch(this.getRequestURL(requestURL, query), finalRequestOption);
    if (response.status !== 200 && this.withJsonHeaders) {
      return response.json();
    }
    return response as any;
  }

  private configureHeaders(headers: THeaders): void {
    this.headers = Object.assign(this.headers, headers);
  }
}
