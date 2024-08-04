import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TravelState } from '../store/travel.reducer';
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
import { Store } from '@ngrx/store';
import { Travel } from '../model/travel';
import { navigateToTravel } from '../store/travel.actions';
import { Router } from '@angular/router';
import { Option } from '../model/options';
import { ActivityOptions } from '../model/activities';

@Component({
  selector: 'app-display-travel',
  templateUrl: './display-travel.component.html',
  styleUrl: './display-travel.component.css'
})
export class DisplayTravelComponent implements OnInit {
  displayedColumns: string[] = ['position', 'country', 'city', 'startDate', 'endDate', 'activities', 'rating', 'actions'];
  dataSource: Travel[];
  travelState$: Observable<Travel[]>
  clickedRows = new Set<Travel>();
  deleteDialogData: string[] = [];
  deleteTravelIds: string[] = [];
  deleteDialogError: boolean = false;
  errorText = '';
  activityOptions: Option[] = ActivityOptions;

  @ViewChild(MatTable) table: MatTable<any>;
  sortedData: Travel[];
  
  constructor( public dialog: MatDialog,
               private travelService: TravelService,
               private cdr: ChangeDetectorRef,
               private store: Store<{ travel: TravelState }>,
               private router: Router) { }

    ngOnInit(): void {
      this.travelState$ = this.travelService.getTravels();
      this.subscribeToTravelState();
    }

    handleDataSorted(data: Travel[]) {
      console.log('handleDataSorted ', data);
      
      this.dataSource = data;
      this.table.renderRows();
    }

    getTravelValue(value: string): string {
      const option = this.activityOptions.find(option => option.value === value);
      return option ? option.text : '';
    }

    private subscribeToTravelState(): void {
      this.travelState$.subscribe(data => {
        console.log('Daten werden aktualisiert', data);   
        this.dataSource = data;
        this.cdr.detectChanges();
      });
    }

    handleRowClick(row): void{
      if(!this.clickedRows.has(row)){
        this.clickedRows.add(row);
      }else{
        this.clickedRows.delete(row);
      }
    }

    onDeleteClick(){
      if(this.clickedRows.size > 0) {
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
      }else {
        this.deleteDialogError = true;
        this.errorText = 'No travel items were selected for removal.'
      }

    }

    onOpenClick(id: string) {
      this.router.navigate(['/addTravel'], {
        queryParams: { id: id }
    });
  }

  onNewClick() {
    this.router.navigate(['/addTravel'], {
      queryParams: {  }
  });
}

  }

