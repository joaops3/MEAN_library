import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IBook } from "src/app/interfaces/interfaces";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  @Input() formTitle!: string;
  @Output() onSubmit = new EventEmitter<IBook>()
  formGroup!: FormGroup;
  @Input() formData?: IBook 
  filePreview?: string = ''
  faTimes = faTimes
  constructor() {}

  
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(this.formData?.title, [Validators.required]),
      author: new FormControl(this.formData?.author, [Validators.required]),
      imageLink: new FormControl(this.formData?.imageLink, [
        Validators.required,
      ]),
      country: new FormControl(this.formData?.country),
      year: new FormControl(this.formData?.year),
      language: new FormControl(this.formData?.language),
      pages: new FormControl(this.formData?.pages),
      link: new FormControl(this.formData?.link),
    });
    if(this.formData?.imageLink){
      this.filePreview = `${environment.baseUrl}/${this.formData.imageLink}`;
    }
  }

  get title() {
    return this.formGroup.get('title')!;
  }
  get author() {
    return this.formGroup.get('author')!;
  }

  get imageLink() {
    return this.formGroup.get('imageLink')!;
  }


  handleChangeFile(event: any){
  
    const reader = new FileReader()
    const file: File = event.target.files[0]
    this.formGroup.get("imageLink")?.updateValueAndValidity()
    reader.onload = () => {
      this.filePreview = reader.result as string
      
    }
    reader.readAsDataURL(file);
    this.formGroup.patchValue({ imageLink: file });
  }

  handleDeleteImg(){
    this.filePreview = ""
    this.formGroup.get('imageLink')?.setValue(undefined);
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.onSubmit.emit(this.formGroup.value)
    this.formGroup.reset()
  }
}
