import { Observable } from 'rxjs';

export interface IFacade<T, CreateParams, UpdateParams> {
  getEntity(id: number): Observable<T>;
  getAllEntities(): Observable<T[]>;
  createEntity(params: CreateParams): Observable<T>;
  updateEntity(id: number, params: UpdateParams): Observable<T>;
  deleteEntity(id: number): Observable<boolean>;
}
