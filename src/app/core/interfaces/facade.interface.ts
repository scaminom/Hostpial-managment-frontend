import { Observable } from 'rxjs';

export interface IFacade<T, CreateParams, UpdateParams> {
  getEntity(id: number): Observable<T>;
  getAllEntities(): Observable<T[]>;
  createEntity(params: CreateParams): void;
  updateEntity(id: number, params: UpdateParams): void;
  deleteEntity(id: number): void;
}
