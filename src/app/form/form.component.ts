import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { EntityService } from '../entity.service';
import { tap } from 'rxjs/operators';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements AfterViewInit, OnInit {
  constructor(
    private entityService: EntityService,
    private activatedRouteSnapshot: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.activatedRouteSnapshot.snapshot.params)
      this.name = this.activatedRouteSnapshot.snapshot.params['name'];
  }

  @ViewChild(NgForm) form: FormGroup | null = null;
  name: string = '';

  ngAfterViewInit(): void {
    if (this.form)
      this.form.valueChanges
        ?.pipe(tap((data) => console.log(data)))
        .subscribe();
  }

  save() {
    if (this.form) this.entityService.save(this.form.value['name']);
    this.router.navigate(['/list']);
  }
}
