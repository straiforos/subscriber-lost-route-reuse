import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EntityService } from '../entity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent {
  names: string[] = ['Stephen Traiforos'];
  // Seemed to fix the issue, but I don't know why.
  // namesObserved: Observable<string[]> = this.entityService.getUpdatedEntity().pipe(tap((name: string) => this.names.push(name))).subscribe();
  entityService: EntityService;
  getUpdatedNames: Observable<string> | null = null;
  constructor(entityService: EntityService) {
    this.entityService = entityService;
  }

  ngOnInit(): void {
    this.getUpdatedNames = this.entityService
      .getUpdatedEntity()
      .pipe(tap((name: string) => this.names.push(name)));
    this.getUpdatedNames.subscribe();
  }
}
