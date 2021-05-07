import {HttpClient, HttpParams} from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ApiOptionsInterface} from '../interfaces/api.interface';

interface IApiConfig {
  host?: string;
  version?: string;
  prefix?: string;
  postfix?: string;
}

export class Api {
  private host: string = environment.host;
  // private version: string = environment.prefixApi;
  private prefix: string = 'api';

  private urls: Map<string, string> = new Map<string, string>();

  protected apiClient: ApiClient;

  constructor(config: IApiConfig = {}) {
    this.apiClient = new ApiClient(inject(HttpClient));

    const {
      host = this.host,
      prefix = this.prefix,
    } = config;

    this.host = host;
    this.prefix = prefix;
  }

  addUrl(key: string, value?: string): string {
    this.urls.set(key, value || key);

    return key;
  }

  getUrl(key: string, config: IApiConfig = {}): string {
    const path = this.urls.get(key);
    const {
      host = this.host,
      prefix = this.prefix
    } = config;

    let url: string = `/${prefix}/${path}`;

    url = url.split('/').filter((item, i) => i === 0 || item).join('/');

    return host + url;
  }

  buildApiOptions(apiOptions: ApiOptionsInterface): unknown  {
    const params = {};

    for (const k in apiOptions) {
      if (apiOptions.hasOwnProperty(k)) {
        params[k] = JSON.stringify(apiOptions[k]);
      }
    }

    return {
      params
    }
  }
}


class ApiClient {
  constructor(private httpClient: HttpClient) {
  }

  get: HttpClient['get'] = <T>(url: string, options = {}) => {
    return this.httpClient.get(url, options).pipe(
      map((body: any): T => {
        return body.hasOwnProperty('data') ? body.data : body
      })
    )
  }

  post: HttpClient['post'] = <T>(url: string, body: any, options = {}) => {
    return this.httpClient.post(url, body, options).pipe(
      map((body: any): T => {
        return body.hasOwnProperty('data') ? body.data : body
      })
    )
  }
}

