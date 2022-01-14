import { Component } from '@angular/core';
import { XMLHttpRequest } from 'xmlhttprequest-ts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';



export interface PeriodicElement {
  id: string;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  displayedColumns: string[] = ['id', 'name',];
  dataSource = ELEMENT_DATA;
  results_per_page = 10;
  page = 1;
  pages = 1;
  pagesArray = [1];
  searchInput = new FormControl('');


  constructor(private http: HttpClient) {
    
    this.initTable(this.page,this.results_per_page);

  }

  initTable(page:any,rpp:number) {
    var url = 'http://192.168.64.2/json.php?page='+page+'&resultsperpage='+rpp;
    var value = this.searchInput.value;
    if (value.replace(' ','') != '' && value != null) {
      url = url + '&searchval='+value;
    }
    this.http.get(url).subscribe((json: any) => {
      var data = json[0];
      var settings = json[1];
      console.log(settings);
      this.pages = settings['total_pages'];
      this.pagesArray = [];
      for (var a = 1;a <= this.pages;a++) {
        this.pagesArray.push(a);
      }
      this.dataSource = [];
      data.forEach((e: any) => {
        this.dataSource = [
          ...this.dataSource,
          e,
        ];
      });
    });
  }

  counter(i: number) {
    return new Array(i);
}

  select() {
    this.initTable(this.page,this.results_per_page);
  }

  prev() {
    if (this.page != 1) {
      this.page--;
      this.initTable(this.page,this.results_per_page);
    }
  }

  next() {
    if (this.page != this.pages) {
      this.page++;
      this.initTable(this.page,this.results_per_page);
    }
  }

}
