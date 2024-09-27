import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
  ) {}
}
