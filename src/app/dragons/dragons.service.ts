import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { AlertService } from './../shared/alert/alert.service';

import { Dragon } from './dragon';

@Injectable()
export class DragonsService {

  dragonsChanged = new EventEmitter<Observable<Dragon[]>>();

  private url: string = 'https://dragons-api.herokuapp.com/api/dragons';

  constructor(private http: Http) { }
  
  getByPage(page: Number): Observable<Dragon[]> {
    return this.http.get(this.url + '?page=' + page)
      .map((res: any) => JSON.parse(res._body))
      .catch(this.handleError);
  }

  getAll(): Observable<Dragon[]> {
    return this.http.get(this.url)
      .map((res: any) => JSON.parse(res._body))
      .catch(this.handleError);
  }

  get(slug){
    return this.http.get(this.getUrl(slug))
      .map((res: any) => JSON.parse(res._body))
      .catch(this.handleError);
  }

  add(record){
    return this.http.post(this.url, JSON.stringify(record), { headers: this.getHeaders() })
      .map(res => res.json().data)
      .do(data => this.dragonsChanged.emit(this.getAll()))
      .catch(this.handleError);
    }
    
  update(record){
    return this.http.put(this.getUrl(record.slug), JSON.stringify(record), { headers: this.getHeaders() })
      .map(res => res.json().data).catch(this.handleError);
  }

  remove(slug){
    return this.http.delete(this.getUrl(slug), {headers: this.getHeaders()})
      .map(res => res.json().data)
      .do(data => this.dragonsChanged.emit(this.getAll()))
      .catch(this.handleError);
  }
  
  private handleError(error: any) {
    let err = error.message || 'Server error';
    console.error('Unexpected error', err);
    return Observable.throw(err);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private getUrl(slug){
    return `${this.url}/${slug}`;
  }
}
