import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { __values } from 'tslib';
import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';
import { routerNames } from '../../constant/router';
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css',
})
export class ImportWarehoseComponent implements OnDestroy, OnInit {
  handlenavigate(): void {
    this.router.navigate(['/addProduct']);
  }

  isLoading: boolean = true
  listProduct: IProduct[] = [];
  totalCartItem: number = 0;
  private destroyed$ = new Subject();
  constructor(
    private notification: NzNotificationService,
    private searchService: SearchService,
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  private $destroy = new Subject()

  isVisibleModalupdateProductQuantity: boolean = false;

  user: IUser = {
    id: 0,
    phone: "",
    email: "",
    fullname: "",
    avatar: "",
    role: "",
    token: "",
    refreshToken: ""
  }

  productDetail: IProduct = {
    id: 0,
    nameProduct: "undefined",
    quantityProduct: 0,
    expiredDate: "new Date",
    provider: '',
    unit: '', 
    origin: '',
    codeProduct: '',
    description: '',
    providePrice: 0,  
    floorPrice: 0,
    phoneProvider: "01234567",
    imageUrl: ""
  }
  textSearch :string = ""

  handleSearch(value: string) {
    this.isLoading = true
    this.productService.getProductWareHouse(this.user.id, value).subscribe({
      next: (res) => {
        this.listProduct = res.content.list;
        this.isLoading = false
      },
      error: (error) => {  
        this.createNotification('error', error);
        this.isLoading = false
        if (error.status == 403) {
          this.router.navigate([routerNames.signInPage]);
          this.createNotification('error', "Phiên đăng nhập hết hạn")
        }
      },
    });
  }
  createNotification(type: string, content: string): void {
    this.notification.create(type, `${content}`, '');
  }

  handleOpenModalupdateProductQuantity(ItemProduct :IProduct) {
    this.isVisibleModalupdateProductQuantity = true;
    this.productDetail = ItemProduct;
  }

  handleCloseModalupdateProductQuantity() {
    this.isVisibleModalupdateProductQuantity = false;
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.searchService
      .getSearchInput()
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe({
        next: (value) => {
          this.textSearch = value
          this.handleSearch(value);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
