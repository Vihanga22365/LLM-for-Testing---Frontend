import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar-component',
  templateUrl: './header-bar-component.component.html',
  styleUrls: ['./header-bar-component.component.scss'],
})
export class HeaderBarComponentComponent {
  @Input() sidenav!: MatSidenav;

  constructor(private router: Router) {}

  userLogOut() {
    localStorage.removeItem('logUserId');
    localStorage.removeItem('logUserFirstName');
    localStorage.removeItem('logUserLastName');
    localStorage.removeItem('logUserType');
    localStorage.removeItem('logUserEmployeeType');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
}
