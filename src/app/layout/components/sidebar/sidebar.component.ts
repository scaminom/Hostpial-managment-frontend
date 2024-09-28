import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
  ) {}
}
