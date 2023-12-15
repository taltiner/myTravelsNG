import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TRAVEL } from '../travel.model';

@Component({
  selector: 'app-list-travel',
  templateUrl: './list-travel.component.html',
  styleUrl: './list-travel.component.css'
})
export class ListTravelComponent implements OnInit {
  @Input() travel: TRAVEL;
  @Output() deleteIndex = new EventEmitter<string[]>();
  selectedTravelIds: string[] = [];


  ngOnInit(): void {

  }

  setIds(uuid: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTravelIds.push(uuid);
    } else {
      const index = this.selectedTravelIds.indexOf(uuid);
      if (index !== -1) {
        this.selectedTravelIds.splice(index, 1);
      }
    }
    console.log('selected uuid = ' + uuid);
    this.deleteIndex.emit(this.selectedTravelIds);
  }


}
