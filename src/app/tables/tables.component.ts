import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  title = 'myApp';
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:3018/data')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
          // Tambahkan log atau pesan untuk memberi tahu pengguna tentang kesalahan.
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
