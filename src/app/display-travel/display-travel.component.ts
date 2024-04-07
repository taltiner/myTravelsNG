import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTable } from '@angular/material/table';

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
  deleteDialogData: string[] = [];
  deleteTravelIds: string[] = [];
  deleteDialogError: boolean = false;
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor( public dialog: MatDialog,
               private travelService: TravelService,
               private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
      this.travelState$ = this.travelService.getTravels();
      this.subscribeToTravelState();
    }

    subscribeToTravelState(): void {
      console.log('subscribeToTravelState entered');
      this.travelState$.subscribe(data => {
        console.log('Daten werden aktualisiert');
        this.dataSource = data;
        this.cdr.detectChanges();
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
        this.deleteDialogError = false;
        this.clickedRows.forEach((data)=> { this.deleteDialogData.push(data.city)});
        const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '600px', data: this.deleteDialogData});

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.clickedRows.forEach((data)=> this.deleteTravelIds.push(data.id))        
            this.travelService.deleteTravels(this.deleteTravelIds);
            this.subscribeToTravelState();
            this.table.renderRows();
            this.deleteTravelIds = [];
          }
          
        });
    }

    onOpenClick(){
      if(this.clickedRows.size === 1){
        this.deleteDialogError = false;

      }else{
        this.deleteDialogError = true;
      }
    }
  }

