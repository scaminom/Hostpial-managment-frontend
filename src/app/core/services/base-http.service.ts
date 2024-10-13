import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export abstract class BaseHttpService<T, CreateParams, UpdateParams> {
  protected http = inject(HttpClient);
  protected abstract baseUrl: string;
  protected abstract entityName: string;

  getById(id: number): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .get<any>(url)
      .pipe(map(this.extractSingleItem), map(this.toCamelCase));
  }

  getAll(): Observable<T[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(this.extractArrayItems),
      map((items: any[]) => items.map(this.toCamelCase)),
    );
  }

  create(params: CreateParams): Observable<T> {
    const body = this.toSnakeCase({ [this.entityName]: params });
    return this.http
      .post<any>(this.baseUrl, body)
      .pipe(map(this.extractSingleItem), map(this.toCamelCase));
  }

  update(id: number, params: UpdateParams): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    const body = this.toSnakeCase({ [this.entityName]: params });
    return this.http
      .put<any>(url, body)
      .pipe(map(this.extractSingleItem), map(this.toCamelCase));
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }

  protected abstract extractSingleItem(response: any): any;
  protected abstract extractArrayItems(response: any): any[];

  protected toCamelCase(data: any): T {
    return camelcaseKeys(data, { deep: true }) as T;
  }

  protected toSnakeCase(data: any): any {
    return snakecaseKeys(data, { deep: true });
  }
}
