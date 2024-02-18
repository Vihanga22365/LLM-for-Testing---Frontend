import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar-component.component.html',
  styleUrls: ['./nav-bar-component.component.scss'],
})
export class NavBarComponentComponent {
  userName!: string;
  userType!: string;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver) {}
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
    this.userName = `${localStorage.getItem('logUserFirstName')} ${localStorage.getItem('logUserLastName')}`;
    this.userType = localStorage.getItem('logUserType') == 'employee' ? `Banker - ${localStorage.getItem('logUserEmployeeType')}` : 'Customer';
  }
  // @ViewChild(MatSidenav)
  // sidenav!: MatSidenav;
  // constructor(private observer: BreakpointObserver, private router: Router) {}
  // ngAfterViewInit() {
  //   this.observer
  //     .observe(['(max-width: 800px)'])
  //     .pipe(delay(1), untilDestroyed(this))
  //     .subscribe((res) => {
  //       if (res.matches) {
  //         this.sidenav.mode = 'over';
  //         this.sidenav.close();
  //       } else {
  //         this.sidenav.mode = 'side';
  //         this.sidenav.open();
  //       }
  //     });
  //   this.router.events
  //     .pipe(
  //       untilDestroyed(this),
  //       filter((e) => e instanceof NavigationEnd)
  //     )
  //     .subscribe(() => {
  //       if (this.sidenav.mode === 'over') {
  //         this.sidenav.close();
  //       }
  //     });
  // }
}
