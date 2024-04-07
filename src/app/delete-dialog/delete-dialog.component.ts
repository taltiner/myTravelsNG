import { Component, Inject, OnInit } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, 
} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  onConfirmClick(){
    this.dialogRef.close(true);
  }

  onCancelClick(){
    this.dialogRef.close(false);
  }
}
