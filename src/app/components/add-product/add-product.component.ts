import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { getISOWeek } from 'date-fns';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(private productService: ProductService, private msg: NzMessageService) {}

  formProduct: {
    nameProduct: String;
    quantityProduct: Number;
    expiredDate: String;
    provider: String;
    unit: String;
    origin: String;
    avatar: any;
    codeProduct: String;
    description: String;
    providePrice: Number;
    floorPrice: Number;
  } = {
    nameProduct: 'abc',
    quantityProduct: 1,
    expiredDate: 'abc',
    provider: 'abc',
    unit: 'abc',
    origin: 'abc',
    avatar: [],
    codeProduct: 'abc',
    description: 'abc',
    providePrice: 1,
    floorPrice: 1,
  };

  fileListInfo: any = [];

  listCard: any = [{}, {}, {}];
  loading = false;
  avatarUrl?: string;
  date = null;
  isEnglish = false;

  beforeUpload = (file: NzUploadFile): boolean => {
    this.formProduct.avatar = this.formProduct.avatar.concat(file);
    return false;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  handleChange(info: { file: NzUploadFile }): void {
    // this.formProduct.avatar = info;
    console.log(info.file,"abc");
    
    this.formProduct.avatar = [info.file];  
    // const src = URL.createObjectURL(info)
    // switch (info.file.status) {
    //   case 'uploading':
    //     this.loading = true; 
    //     break;
    //   case 'done':
    //     // Get this url from response in real world.
    //     
    //     this.getBase64(info.file!.originFileObj!, (img: string) => {
    //       this.loading = false;
    //       this.avatarUrl = img;
    //     });
    //     break;
    //   case 'error':
    //     this.msg.error('Network error');
    //     this.loading = false;
    //     break;
    // }
  }
  test(file:any){
    this.formProduct.avatar = file;
    console.log(file,"file");
    
  }

  handleCallAIP() {
    console.log(this.formProduct,"abc");
    const formData = new FormData();
    this.formProduct.avatar.forEach((file: any) => {
      formData.append('file', file);
    })
    this.loading = true;
    this.productService.upload(formData).subscribe(() =>{
      this.loading = false
      this.formProduct.avatar = [];
      this.msg.success('upload successfully.');
    }
    );
  }
}
