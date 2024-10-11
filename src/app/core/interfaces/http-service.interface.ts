import { Observable } from 'rxjs';

export interface IHttpService<T, CreateParams, UpdateParams> {
  getById(id: number): Observable<T>;
  getAll(): Observable<T[]>;
  create(params: CreateParams): Observable<T>;
  update(id: number, params: UpdateParams): Observable<T>;
  delete(id: number): Observable<boolean>;
}
