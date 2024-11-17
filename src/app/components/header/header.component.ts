import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { refreshOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  searchTerm = '';
  selectedLanguage = '';
  languages$ = this.repositoryService.languages$;

  constructor(private repositoryService: RepositoryService) {
    addIcons({ refreshOutline });
  }

  ngOnInit() {}

  onSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.searchChange.emit(this.searchTerm);
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.detail.value;
    this.languageChange.emit(this.selectedLanguage);
  }

  reset() {
    this.searchTerm = '';
    this.selectedLanguage = '';
    this.resetFilters.emit();
  }
}