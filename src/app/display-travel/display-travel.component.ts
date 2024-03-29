import { Component, OnInit } from '@angular/core';
import { TravelState } from "../store/travel.state";
import { Observable } from 'rxjs';
import { TravelService } from '../travel.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
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
  selector: 'app-display-travel',
  templateUrl: './display-travel.component.html',
  styleUrl: './display-travel.component.css'
})
export class DisplayTravelComponent implements OnInit {
  displayedColumns: string[] = ['position', 'country', 'city', 'startDate', 'endDate', 'activities', 'rating'];
  dataSource: TravelState[];
  travelState$: Observable<TravelState[]>
  clickedRows = new Set<TravelState>();
  deleteDialogData: string = '';
  deleteDialogError: boolean = false;
/*   constructor(private store: Store<{ travel: TravelState }>) {
    this.travelState$ = store.select('travel');
  }

  ngOnInit() {
    console.log(this.travelState$);
  } */

  constructor( public dialog: MatDialog,
               private travelService: TravelService) { }

    ngOnInit(): void {
      this.travelState$ = this.travelService.getTravels();
      this.travelState$.subscribe(data => {
        this.dataSource = data;
      });
    }

    handleRowClick(row): void{
      if(!this.clickedRows.has(row)){
        this.clickedRows.add(row)
      }else{
        this.clickedRows.delete(row);
      }
    }

    onDeleteClick(){
      if(this.clickedRows.size === 1){
        this.deleteDialogError = false;
        this.clickedRows.forEach((data)=> { this.deleteDialogData = data.city });
        const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '600px', data: this.deleteDialogData});

        dialogRef.afterClosed().subscribe(result => {
          
        });

      }else{
        this.deleteDialogError = true;
      }

    }
  }

