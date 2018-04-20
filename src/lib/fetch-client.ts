import { actions } from '@/store/modules/auth/auth.actions';
import * as Vuex from 'vuex';
import { Store } from '@/store/index';
import { RequestOptions } from 'https';
import { MetaDataActions } from '@/store/modules/meta';
import { getToken } from '@/services/token.service';

export interface FetchClientConfiguration {
  basePath?: string;
  store: Vuex.Store<Store>;
}

export interface THeaders { [name: string]: string; }
export type TBody = { [name: string]: string; } | Blob | BufferSource | FormData | URLSearchParams | string | any;
export type TIdentifier = string | number;

export const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export class FetchClient {

  private headers: THeaders = {};
  private withCredentials: boolean;
  private withJsonHeaders: boolean;

  constructor(
    private config: FetchClientConfiguration
  ) {
    this.withCredentials = true;
    this.withJsonHeaders = true;
  }

  public withoutCredentials(): FetchClient {
    this.withCredentials = false;
    return this;
  }

  public withHeaders(headers: THeaders): FetchClient {
    this.configureHeaders(headers);
    return this;
  }

  public withoutJsonHeaders(): FetchClient {
    this.withJsonHeaders = false;
    return this;
  }

  public getRequestURL(path: string, query?: string): string {
    return `${this.config.basePath}${path}${query || ''}`;
  }

  // -------------------------------------------------------------------------
  // GET
  // -------------------------------------------------------------------------

  public fetchGet(requestURL: string = '', query?: string, requestOption?: RequestInit): Promise<Response> {
    const finalRequestOption: RequestInit = Object.assign({
      headers: this.getHeaders(),
    }, requestOption);

    return this.fetch(requestURL, query, finalRequestOption);
  }

  // -------------------------------------------------------------------------
  // POST
  // -------------------------------------------------------------------------

  public fetchPost(requestURL: string, body?: TBody, query?: string, requestOption?: RequestInit): Promise<Response> {
    const finalRequestOption: RequestInit = Object.assign(
      {
        method: 'POST',
        headers: this.getHeaders(),
      }, {
        body: JSON.stringify(body),
      }, requestOption);
    return this.fetch(requestURL, query, finalRequestOption);
  }

  // -------------------------------------------------------------------------
  // PUT & PATCH
  // -------------------------------------------------------------------------

  public fetchPut(requestURL: string, body?: TBody, query?: string, requestOption?: RequestInit): Promise<Response> {
    const finalRequestOption: RequestInit = Object.assign(
      {
        method: 'PUT',
        headers: this.getHeaders(),
      }, {
        body: JSON.stringify(body),
      }, requestOption);

    return this.fetch(requestURL, query, finalRequestOption);
  }

  public fetchPatch(requestURL: string, body?: TBody, query?: string, requestOption?: RequestInit): Promise<Response> {
    const finalRequestOption: RequestInit = Object.assign(
      {
        method: 'PATCH',
        headers: this.getHeaders(),
      }, {
        body: JSON.stringify(body),
      }, requestOption);

    return this.fetch(requestURL, query, finalRequestOption);
  }

  // -------------------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------------------

  public fetchDelete(requestURL: string, query?: string, requestOption?: RequestInit): Promise<Response> {
    const finalRequestOption: RequestInit = Object.assign({
      method: 'DELETE',
      headers: this.getHeaders(),
    }, requestOption);

    return this.fetch(requestURL, query, finalRequestOption);
  }

  // -------------------------------------------------------------------------
  // PRIVATE
  // -------------------------------------------------------------------------

  private configureHeaders(headers: THeaders): void {
    this.headers = Object.assign(this.headers, headers);
  }

  private getHeaders(): THeaders {
    if (this.withCredentials) {
      this.withHeaders({
        // tslint:disable-next-line
        'Authorization': `Bearer ${getToken()}` || '',
      });
    }
    if (this.withJsonHeaders) {
      this.withHeaders(jsonHeaders);
    }
    return this.headers;
  }

  private async fetch(requestURL: string, query?: string, requestOptions?: RequestInit): Promise<Response> {
    try {
      const response: Response = await fetch(this.getRequestURL(requestURL, query), requestOptions);
      this.config.store.dispatch(MetaDataActions.SetServerAvailable);
      return response;
    } catch (fetchError) {
      // This means the server is not running
      if (fetchError.message === 'Failed to fetch') {
        this.config.store.dispatch(MetaDataActions.SetServerUnavailable);
      }
      throw fetchError;
    }
  }

}
