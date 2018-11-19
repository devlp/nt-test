import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DragonsService } from '../dragons.service';
import { AlertService } from './../../shared/alert/alert.service';
import { Dragon } from '../dragon';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit, OnDestroy {

  selectedDragon: Dragon;
  private dragonIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dragonsService: DragonsService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.dragonIndex = params['slug'];
        this.dragonsService.get(this.dragonIndex)
        .subscribe((data:any) => {
          try {
            let fragment = document.querySelector('#dragView');
            if (fragment) {
              fragment.scrollIntoView();
            }
          } catch (e) { 
            this.alertService.error("Unexpected error, anchor.");
            console.error('Unexpected error: ', e);
          }
          return this.selectedDragon = data;
        });
      }
    );
  }

  onEdit() {
    this.router.navigate(['/dragons', this.dragonIndex, 'edit']);
    try {
      let fragment = document.querySelector('#dragView');
      if (fragment) {
        fragment.scrollIntoView();
      }
    } catch (e) { 
      this.alertService.error("Unexpected error, anchor.");
      console.error('Unexpected error: ', e);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    if (confirm("Are you sure you want to delete " + this.selectedDragon.name + "?")) {
      this.dragonsService.remove(this.selectedDragon.slug)
        .subscribe((data: any) => {
          this.alertService.success("Removed with success.", true);
          this.router.navigate(['/dragons'])
        }, err => {
          alert("Contato não removido.");
        });
    }
  }
}
