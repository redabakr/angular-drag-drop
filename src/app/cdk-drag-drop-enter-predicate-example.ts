import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag
} from '@angular/cdk/drag-drop';
import * as _ from "lodash";

interface Item {
  value: string,
  index: number
}

@Component({
  selector: 'cdk-drag-drop-enter-predicate-example',
  templateUrl: 'cdk-drag-drop-enter-predicate-example.html',
  styleUrls: ['cdk-drag-drop-enter-predicate-example.css'],
})

export class CdkDragDropEnterPredicateExample {
  @ViewChildren('destItems') destItems: QueryList<ElementRef>

  sourceList: Item[] =[
    {value:'A', index:1},
    {value:'E', index:5},
    {value:'C', index:3},
    {value:'D', index:4},
    {value:'F', index:6},
    {value:'B', index:2}
  ];
  destinationList: Item[] =[
    {value:'1', index:1},
    {value:'2', index:2},
    {value:'3', index:3},
    {value:'4', index:4},
    {value:'5', index:5},
    {value:'6', index:6}
  ];

 
  drop(event: CdkDragDrop<Item[]>) {
    // disable drag and drop with in the same list
    if (event.previousContainer === event.container) { return;}
    // to avoid issue when dragging to last inedx
    if(event.currentIndex >= this.destinationList.length){
      alert("Invalid Position!");
      return;
    }

    let from = event.previousContainer.data[event.previousIndex];
    let to = event.container.data[event.currentIndex]

    // Validate position, i.e B cannot be before A
    if(from.index != to.index || event.currentIndex >= this.destinationList.length){
      alert("Invalid Position!");
      return;
    }

   // merging logic 
    event.container.data[event.currentIndex].value = from.value + " " + to.value;
     _.remove(event.previousContainer.data,(item)=>item.index == from.index);
    // update color to green
     this.destItems.get(event.currentIndex)?.nativeElement.classList.remove('destinationBox');
     this.destItems.get(event.currentIndex)?.nativeElement.classList.add('mergedBox');    
  }
}
