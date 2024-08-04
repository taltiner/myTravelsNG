import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Option } from '../../model/options'
import { SortOptions } from '../../model/travelSorter'
import { MatSelect } from '@angular/material/select';
import { Travel } from '../../model/travel';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrl: './sort-dropdown.component.css'
})
export class SortDropdownComponent implements OnInit{

  @ViewChild ('sortingSelect') sortingSelectView: MatSelect;
  sortOptions: Option[] = SortOptions;
  sortedData: Travel[] = [];

  @Input() dataSource: Travel[];
  @Output() selectionChange = new EventEmitter<Travel[]>();
  ngOnInit() {
    
  }


  onSelectionChange(option: string) {
    switch(option){
      case 'startDate':
        this.sortedData = this.dataSource.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      break;
      case 'endDate':
        this.sortedData = this.dataSource.sort((a, b) =>  new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
      break;
      case 'country':
        this.sortedData = this.dataSource.sort((a, b) => a.country.localeCompare(b.country));
      break;
      case 'city':
        this.sortedData = this.dataSource.sort((a, b) => a.city.localeCompare(b.city));
      break;   
      case 'rating':
        this.sortedData = this.dataSource.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
      break;             
      default:
        return;  
    }
    this.selectionChange.emit(this.sortedData);
  }

}
