import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  standalone : true,
  imports : [CommonModule]
})
export class ErrorComponent implements OnChanges {

  @Input()
  control!: AbstractControl | null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
