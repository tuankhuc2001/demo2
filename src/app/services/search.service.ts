import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SearchService {
    searchInputSubject = new BehaviorSubject<string>('');

    setSearchInput(value: string): void {
      this.searchInputSubject.next(value);
    }
  
    getSearchInput(): BehaviorSubject<string> {
      return this.searchInputSubject;
    }
  }