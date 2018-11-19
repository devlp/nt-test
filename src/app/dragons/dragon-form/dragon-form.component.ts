import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';

import { AlertService } from './../../shared/alert/alert.service';
import { DragonsService } from '../dragons.service';
import { Dragon } from '../dragon';
import { ComponentCanDeactivate } from './dragon-form.guard';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
 

@Component({
  selector: 'app-dragon-form',
  templateUrl: './dragon-form.component.html',
  styleUrls: ['./dragon-form.component.scss']
})
export class DragonFormComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  
  form: FormGroup;
  private dragonIndex: string;
  private title: string;
  private isNew: boolean = true;
  private dragon: Dragon;
  private originalRecord: Dragon;
  private subscription: Subscription;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private dragonsService: DragonsService) { }
    
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('slug')) {
          this.isNew = false;
          this.dragonIndex = params['slug'];
          this.dragonsService.get(this.dragonIndex).subscribe((data: any) => {
            this.dragon = data;
            this.originalRecord = data;
            this.initForm();
          });
          this.title = 'Edit dragon';
        } else {
          this.isNew = true;
          this.dragon = new Dragon();
          this.dragon.histories = [''];
          this.title = 'New dragon';
          this.initForm();
        }
      }
    );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [this.dragon.name, [
        Validators.required,
        Validators.minLength(3)
      ]],
      type: [this.dragon.type, [
        Validators.required,
        Validators.minLength(3)
      ]],
      slug: [this.dragon.slug, []],
      created_at: [this.dragon.created_at,[]],
      histories: this.buildHistories()
    });
  }

  buildHistories() {
    let values = this.dragon.histories.map(v => new FormControl(v, []));
    return this.formBuilder.array(values);
  }

  addItemHistory() {
    this.dragon.histories.push('');
    this.initForm();
  }

  deleteItemHistory(index) {
    this.dragon.histories.splice(index, 1);
    this.initForm();
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/dragons']);
  }

  onSave() {
    let dragonValue = this.form.value;
    dragonValue.histories = this.dragon.histories.length > 0 ? this.dragon.histories : [];
    if (this.originalRecord) {
      dragonValue.created_at = this.originalRecord.created_at;
      dragonValue.slug = this.originalRecord.slug;
    }
    let result;

    if (this.isNew){
      result = this.dragonsService.add(dragonValue);
      this.alertService.success("Created with success.", true);
    } else {
      result = this.dragonsService.update(dragonValue);
      this.alertService.success("Updated with success.", true);
    }
    
    this.form.reset();
    
    result.subscribe(data => this.navigateBack(),
    err => {
      this.alertService.error("Unexpected error.");
      alert("An error occurred." + err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Do you want to leave this page?');
    }
    return true;
  }
}
