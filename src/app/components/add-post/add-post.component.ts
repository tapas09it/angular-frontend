import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/notification.service';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  blurFlag:boolean=false;  
    submitted = false;
    addpostform = this.fb.group({
      datePosted: ['', [Validators.required]],status:[true],
        title: [''], category:['']
    });
  maxDate: Date | undefined;

    constructor(private restapiService: RestapiService, private notificationService: NotificationService,
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddPostComponent>) {}

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  onClose(): void {
    this.dialogRef.close(true);
}

onSubmit(f:FormGroupDirective) {
    this.submitted = true;
    //stop here if form is invalid
    if (this.addpostform.invalid) {
       return;
    }
    if (this.addpostform.valid) {   
       const addpost = this.addpostform.getRawValue();   
        //this.blurFlag=true;     
        this.restapiService.addPost(addpost).subscribe((data)=>{
        //this.blurFlag=false; 
        if(data==null){
            this.notificationService.error("Post Added Failed"); 
        }else{                   
        f.resetForm();  
            this.dialogRef.close(true);          
            this.notificationService.info("Post Added Successfully");
            }
        }, (err) => {

        })
    }
}

onReset() {
    this.submitted = false;
    this.addpostform.reset();
}

}
