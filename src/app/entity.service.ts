import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  private entitySubject = new Subject<any>();

  save(data: any){
    this.entitySubject.next(data);
  }

  getUpdatedEntity(){
    return this.entitySubject.asObservable();
  }

}
