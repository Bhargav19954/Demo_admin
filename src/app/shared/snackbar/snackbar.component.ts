import {Component, OnInit, OnDestroy} from '@angular/core';
import {SnackbarService} from './snackbar.service';
import {Subscription} from 'rxjs';


import {trigger, transition, animate, style} from '@angular/animations';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    animations: [
        trigger('state', [
            transition(':enter', [
                style({right: '-100px', transform: 'translate(00%, -50%) scale(0.3)'}),
                animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
                    transform: 'translate(00%, -35%) scale(1)',
                    opacity: 1,
                    right: '35%',
                })),
            ]),
            transition(':leave', [
                animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
                    transform: 'translate(0%, -50%) scale(0.3)',
                    opacity: 0,
                    bottom: '-100px',
                }))
            ])
        ])
    ]
})


export class SnackbarComponent implements OnInit, OnDestroy {

    public show = false;
    private message: string = 'This is snackbar';
    private type: string = 'common-success';
    private icon_type: string = 'fas fa-check-circle';
    private snackbarSubscription: Subscription;

    constructor(private snackbarService: SnackbarService) {
    }

    ngOnInit() {
        this.snackbarSubscription = this.snackbarService.snackbarState.subscribe((state) => {
            if (state.type) {
                if (state.type == 'error') {
                    this.type = 'common-error';
                    this.icon_type = 'fas fa-times-circle';
                } else {
                    this.type = 'common-success';
                    this.icon_type = 'fas fa-check-circle';
                }
            } else {
                this.type = 'common-success';
                this.icon_type = 'fas fa-check-circle';
            }
            this.message = state.message;
            this.show = state.show;
            setTimeout(() => {
                this.show = false;
            }, 3000);
        });
    }

    ngOnDestroy() {
        this.snackbarSubscription.unsubscribe();
    }
}
