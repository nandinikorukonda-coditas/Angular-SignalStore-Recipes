import { Component, AfterViewInit, ViewChild, input, TemplateRef, ContentChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTableModule,TitleCasePipe,CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  columns = input<string[]>([]);
  data = input<any[]>([]);
  @ContentChild('actions') actionsTpl?: TemplateRef<any>;
}
