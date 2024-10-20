import { Component } from '@angular/core';
import { LayoutService } from '../../../../services/app.layout.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home' }],
      },
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
              },
              {
                label: 'Create Patient',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/patient/new'],
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
              },
              {
                label: 'Create Department',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/department/new'],
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
              },
              {
                label: 'Register Doctor',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/doctor/new'],
              },
            ],
          },
        ],
      },
    ];
  }
}
