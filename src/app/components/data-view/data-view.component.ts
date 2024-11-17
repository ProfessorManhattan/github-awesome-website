import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonText,
  IonItem,
  IonBadge,
  IonLabel,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import {
  RepositoryService,
  Repository,
} from '../../services/repository.service';
import { addIcons } from 'ionicons';
import {
  codeOutline,
  homeOutline,
  listOutline,
  arrowUp,
  arrowDown,
} from 'ionicons/icons';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonText,
    IonLabel,
    IonBadge,
    IonRow,
    IonCol,
    IonItem,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit {
  public data: Repository[] = [];
  public filteredData: Repository[] = [];
  public displayData: Repository[] = [];
  public searchTerm = '';
  public sortColumn = 'stars';
  public sortDirection = 'desc';
  public activeLanguage$ = new BehaviorSubject<string>('');
  public pageSize = 20;
  public currentPage = 0;

  constructor(private repositoryService: RepositoryService) {
    addIcons({
      codeOutline,
      homeOutline,
      listOutline,
      arrowUp,
      arrowDown,
    });
  }

  ngOnInit() {
    this.repositoryService.loadData().subscribe((data) => {
      this.data = data;
      this.filterData();
    });

    this.repositoryService.data$.subscribe((data) => {
      this.data = data;
      this.filterData();
    });
  }

  filterData() {
    let filtered = [...this.data];

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (val) => val && val.toString().toLowerCase().includes(search)
        )
      );
    }

    const currentLanguage = this.activeLanguage$.getValue();
    if (currentLanguage) {
      filtered = filtered.filter((item) => item.language === currentLanguage);
    }

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[this.sortColumn as keyof Repository];
        const bVal = b[this.sortColumn as keyof Repository];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    this.filteredData = filtered;
    this.loadMore(true);
  }

  loadMore(reset = false) {
    if (reset) {
      this.currentPage = 0;
      this.displayData = [];
    }
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = [
      ...this.displayData,
      ...this.filteredData.slice(start, end),
    ];
    this.currentPage++;
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
    this.filterData();
  }

  onIonInfinite(event: any) {
    this.loadMore();
    event.target.complete();
  }

  getLanguageIcon(language: string): string {
    const iconMap: { [key: string]: string } = {
      JavaScript: 'logo-javascript',
      Python: 'logo-python',
      Java: 'logo-java',
      TypeScript: 'logo-typescript',
    };
    return iconMap[language] || 'code-outline';
  }
}
