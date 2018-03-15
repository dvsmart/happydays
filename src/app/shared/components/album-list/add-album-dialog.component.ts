import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'add-album-dialog',
    templateUrl: './add-album-dialog.component.html',
  })
  export class AddAlbumDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AddAlbumDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}
