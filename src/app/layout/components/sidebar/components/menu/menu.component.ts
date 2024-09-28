import { Component } from '@angular/core';
import { LayoutService } from '../../../../services/app.layout.service';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './menu.component.html',
  styles: ``,
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
              },
              {
                label: 'Create Patient',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/patient/new'],
              },
              {
                label: 'Update Patient',
                icon: 'pi pi-fw pi-pencil',
              },
            ],
          },
        ],
      },
    ];
  }
}
