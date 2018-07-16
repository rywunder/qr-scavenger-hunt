import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AnimalListPage } from '../animal-list/animal-list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AnimalListPage;
  tab2Root = HomePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
