import { Component, OnInit, Input, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  
  @Input() albumId: string;

  private title: string;

  photo:Photo;
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() notify = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder,private photoService: PhotoService) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      content: null
    });
  }

  private prepareSave(extraData?:object): any {
    let input = new FormData();
    input.append('albumId',this.albumId);
    input.append('name',this.form.get('name').value);
    input.append('file',this.form.get('content').value);
    return input;
  }
 
  
  
  onFileChange(event) {
    if(event.target.files.length > 0) {
        let file = event.target.files[0];
        this.form.get('content').setValue(file);
      }
    }


      onSubmit() {
        const formModel = this.prepareSave(this.form.value);
        this.loading = true;
        this.photoService.postFile(formModel).subscribe(data => {
            this.notify.emit(true);
            this.fileInput.nativeElement.value = "";
            this.createForm();
            this.loading = false;
            }, error => {
              console.log(error);
            });
      }
    
      clearFile() {
        this.form.get('content').setValue(null);
        this.fileInput.nativeElement.value = '';
      }
}
