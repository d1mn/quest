import {Injectable} from '@angular/core';
import {Api} from '../extensions/api.extension';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface DataInterface {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataApi extends Api {
  readonly SEND: string = this.addUrl('check_codes');

  constructor() {
    super({});
  }

  send(body: any): Observable<DataInterface> {
    return this.apiClient.post<DataInterface>(this.getUrl(this.SEND), body).pipe(
      map((value) => {
        console.log(value);

        return value
      })
    );
  }
}
