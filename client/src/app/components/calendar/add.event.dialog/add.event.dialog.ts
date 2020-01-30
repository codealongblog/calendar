import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shindig } from 'src/app/services/shindig.service';
import { BaseComponent } from '../../base.component';
import { UserService } from 'src/app/services/user.service';

interface AddEventData {
    shindig: Shindig;
}

@Component({
    selector: 'add-event-dialog',
    templateUrl: './add.event.dialog.html',
    styleUrls: ['./add.event.dialog.css']
})

class AddEventDialogComponent extends BaseComponent implements OnInit {
    public shindig: Shindig;
    public addOrEdit: string = 'Add';
    constructor (public dialogRef: MatDialogRef<AddEventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddEventData, public userService: UserService) {
        super();
    }

    public ngOnInit () {
        this.shindig = Object.assign({  }, this.data.shindig);
        if (this.shindig._id) {
            this.addOrEdit = 'Edit';
        }
        if (!this.shindig.userId) {
            this.shindig.userId = this.userService.cachedUser._id;
        }
    }

    public saveEvent () : void {
        this.dialogRef.close(this.shindig);
    }
}


export { AddEventDialogComponent, AddEventData};
