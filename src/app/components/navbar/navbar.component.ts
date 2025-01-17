import { Component } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';

import {MenuItem, SharedModule} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {SplitButton} from 'primeng/splitbutton';
import {InputTextModule} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
          label: 'Update',
          icon: 'pi pi-refresh'
      },
      {
          label: 'Delete',
          icon: 'pi pi-times'
      }
  ];
}

}
