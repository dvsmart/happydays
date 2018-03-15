import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;

  constructor(
      private cloudinary: Cloudinary,
      private zone: NgZone
  ) {
      this.responses = [];
      this.title = '';
  }

  ngOnInit(): void {
    
      const uploaderOptions: FileUploaderOptions = {
        url: `https://api.cloudinary.com/v1_1/vjcloud/image/upload/`+ this.title,
        // Upload files automatically upon addition to upload queue
        autoUpload: true,
        // Use xhrTransport in favor of iframeTransport
        isHTML5: true,
        // Calculate progress independently for each uploaded file
        removeAfterUpload: true,
        // XHR request headers
        headers: [
          {
            name: 'X-Requested-With',
            value: 'XMLHttpRequest'
          }
        ],
      };
      this.uploader = new FileUploader(uploaderOptions);

      // Add custom tag for displaying the uploaded photo in the list
      this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
          form.append('upload_preset', 'mypresetName');
          let tags = 'myphotoalbum';
          if (this.title) {
              form.append('context', `photo=${this.title}`);
              tags = `myphotoalbum,${this.title}`;
          }
          form.append('tags', tags);
          form.append('file', fileItem);

          fileItem.withCredentials = false;
          return { fileItem, form };
      };

      // Insert or update an entry in the responses array
      const upsertResponse = fileItem => {

          // Run the update in a custom zone since for some reason change detection isn't performed
          // as part of the XHR request to upload the files.
          // Running in a custom zone forces change detection 
          this.zone.run(() => {
              // Update an existing entry if it's upload hasn't completed yet
              // Find the id of an existing item
              const existingId = this.responses.reduce((prev, current, index) => {
                  if (current.file.name === fileItem.file.name && !current.status) {
                      return index;
                  }
                  return prev;
              }, -1);
              if (existingId > -1) {
                  // Update existing item with new data
                  this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
              } else {
                  // Create new response
                  this.responses.push(fileItem);
              }
          });
      };

      this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
          upsertResponse(
              {
                  file: item.file,
                  status,
                  data: JSON.parse(response)
              }
          );

      this.uploader.onProgressItem = (fileItem: any, progress: any) =>
          upsertResponse(
              {
                  file: fileItem.file,
                  progress
              }
          );
  }

  updateTitle(value: string) {
      this.title = value;
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/vjcloud/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }
}
