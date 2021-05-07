import {BehaviorSubject} from 'rxjs';

export class Store {

  constructor() {}

  protected commit(state: State<any>, value: any): void {
    state.next(value);
  }
}

export class State<T> extends BehaviorSubject<T> {

  constructor(value?: T) {
    super(value as T);
  }
}
