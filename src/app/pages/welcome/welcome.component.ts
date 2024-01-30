import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  isLoading:boolean = true

  ngOnInit(): void {
    this.handleTimeOut()
  }

  handleTimeOut():void {
    setTimeout(()=> this.handleNavigate(), 0)

  }
  handleNavigate():void {
    this.router.navigate(['/signIn']);
    this.isLoading = false
  }
}
