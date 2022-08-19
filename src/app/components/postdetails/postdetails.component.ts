import {SelectionModel} from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { RestapiService } from '../../restapi.service';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {

  displayedColumns: string[] = ['id','dateposted', 'title', 'category', 'delete'];
  datasource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  destroy$: Subject<boolean> = new Subject<boolean>();
  

  constructor(private restapiService: RestapiService, private cdrf:ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.restapiService.getallpost().subscribe((data) => {
    this.datasource.data = data;
    this.cdrf.detectChanges();
    console.log("Post Data - "+JSON.stringify(data));
    }, (err) => {
          console.log(err);
       })
  }

  onCreate() {
    alert("dilog....")
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddPostComponent, dialogConfig).afterClosed().subscribe((res) => {
        if (res) {
            
        }
    }, (err) => {});
}

}
