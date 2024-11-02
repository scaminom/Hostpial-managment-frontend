import { Component } from '@angular/core';
import { LayoutService } from '../../../../services/app.layout.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { AuthService } from '@app/auth/auth.service';
import { DecodedToken } from '@app/auth/interfaces';
import { jwtDecode } from 'jwt-decode';

interface MenuItem {
  label: string;
  items?: MenuItem[];
  icon?: string;
  routerLink?: string[];
  roles?: string[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  model: any[] = [];
  userRole: string = '';

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
  ) {
    this.getUserRole();
  }

  private getUserRole(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      this.userRole = decodedToken.role;
    }
  }

  private readonly fullMenu: MenuItem[] = [
    {
      label: 'Data',
      items: [
        {
          label: 'Patient',
          items: [
            {
              label: 'List Patients',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/patient/'],
              roles: ['admin', 'doctor', 'nurse'],
            },
            {
              label: 'Create Patient',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['/patient/new'],
              roles: ['admin', 'nurse'],
            },
          ],
        },
      ],
    },
    {
      label: 'Hospital',
      items: [
        {
          label: 'Department',
          items: [
            {
              label: 'List Departments',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/department/'],
              roles: ['admin'],
            },
            {
              label: 'Create Department',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['/department/new'],
              roles: ['admin'],
            },
          ],
        },
        {
          label: 'Doctor',
          items: [
            {
              label: 'List Doctors',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/doctor/'],
              roles: ['admin'],
            },
            {
              label: 'Register Doctor',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: ['/doctor/new'],
              roles: ['admin'],
            },
          ],
        },
      ],
    },
  ];

  private filterMenuItems(items: MenuItem[]): MenuItem[] {
    return items
      .map((item) => {
        const filteredItem = { ...item };

        if (filteredItem.items) {
          const filteredSubItems = this.filterMenuItems(filteredItem.items);

          if (filteredSubItems.length > 0) {
            filteredItem.items = filteredSubItems;
          } else {
            return null;
          }
        }

        if (filteredItem.roles && !filteredItem.roles.includes(this.userRole)) {
          return null;
        }

        return filteredItem;
      })
      .filter((item) => item !== null) as MenuItem[];
  }

  ngOnInit() {
    this.model = this.filterMenuItems(this.fullMenu);
  }
}
