import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { AuthService } from '@app/auth/auth.service';
import { LayoutService } from '../../services/app.layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuModule],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  private authService = inject(AuthService);
  private destrotRef = inject(DestroyRef);

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authService
            .initiateLogout()
            .pipe(takeUntilDestroyed(this.destrotRef))
            .subscribe();
        },
      },
    ];
  }
}
