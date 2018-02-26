import { List } from 'immutable';
import { isString } from 'lodash';

export type FetchInterceptors = (fetchInterceptorOption?: IFetchInterceptorOption) => IFetchRequesters;
export type FetchRequester = <T>(options: IFetchRequest | string) => Promise<T>;
export interface IFetchRequesters {
    get(url: string): Promise<Response>;
    post<B>(url: string, body: B): Promise<Response>;
    put<B>(url: string, body: B): Promise<Response>;
    patch<B>(url: string, body: B): Promise<Response>;
    delete(url: string): Promise<Response>;
}

export type BeforeInterceptor = (request: Request, next: () => void) => void;
export type AfterInterceptor = (request: Request, next: () => void) => void;
export type FailInterceptor = (request: Request, next: () => void) => void;

export interface IFetchInterceptorOption {
    beforeInterceptor: BeforeInterceptor[];
    afterInterceptor: AfterInterceptor[];
    failInterceptor: FailInterceptor[];
}

export interface IFetchClientConfig {
    url: string;
}

export interface IFetchRequest {
    url: string;
}

/**
 * FetchConfigurator
 *
 * @param {FetchClientConfig} config
 * @returns {FetchInterceptors}
 */
function fetchConfigurator(config?: IFetchClientConfig): FetchInterceptors {
    function fetchInterceptors(fetchInterceptorOption?: IFetchInterceptorOption): IFetchRequesters {
        function fetchRequester<B>(method: string, url: string, body?: B): Promise<Response> {

            url = (config && config.url || '') + url;

            // Build new fetch request option object
            const fetchRequest = new Request(url, Object.assign({}, {
                method,
                body: json(body)
            }));
            fetchRequest.headers.set('Content-Type', 'application/json');
            // // Run all before interceptors
            // if (fetchInterceptorOption.beforeInterceptor) {
            //     const nextBeforeInterceptor = (list: List<BeforeInterceptor>) => () => {

            //         // Breaks the chain
            //         if (list.size === 0) {
            //             return;
            //         }

            //         // Call current interceptor
            //         list.first()(fetchRequest, nextBeforeInterceptor(beforeInterceptorList.shift()));
            //     };

            //     const beforeInterceptorList = List(fetchInterceptorOption.beforeInterceptor);
            //     nextBeforeInterceptor(beforeInterceptorList);
            // }

            return fetch(fetchRequest)
                .then((response: Response) => {
                    return response;
                })
                .catch((err: any) => {
                    throw err;
                });

        }
        return {
            get: (u: string) => fetchRequester('GET', u),
            post: <B>(u: string, b: B) => fetchRequester('POST', u, b),
            put: <B>(u: string, b: B) => fetchRequester('PUT', u, b),
            patch: <B>(u: string, b: B) => fetchRequester('PATCH', u, b),
            delete: (u: string) => fetchRequester('DELETE', u)
        };
    }
    return fetchInterceptors;
}

export const fetchClient = fetchConfigurator;

export function json<T>(data: T): string {
    return JSON.stringify(data);
}
