import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  homepage: string;
  topics: string[];
  list_url: string;
  license: string;
}

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private dataSubject = new BehaviorSubject<Repository[]>([]);
  private languagesSubject = new BehaviorSubject<string[]>([]);

  public data$ = this.dataSubject.asObservable();
  public languages$ = this.languagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadData(): Observable<Repository[]> {
    const url = '/github-awesome.json';
    return this.http.get<Repository[]>(url).pipe(
      map((data) =>
        data.map((item) => ({
          ...item,
          stars: Number(item.stars),
          forks: Number(item.forks),
        }))
      ),
      tap((data) => {
        this.dataSubject.next(data);
        const languages = [
          ...new Set(data.map((item) => item.language).filter(Boolean)),
        ];
        this.languagesSubject.next(languages);
      })
    );
  }
}
