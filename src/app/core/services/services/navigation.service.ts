import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { NavigationItem } from '../../../layout/sidenav/interfaces/navigation-item';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private items: ReplaySubject<NavigationItem[]> = new ReplaySubject<NavigationItem[]>(1);

    get navigations$(): Observable<NavigationItem[]> {
        return this.items.asObservable();
    }

    public update(navigationItems: NavigationItem[]) {
        this.items.next(navigationItems);
    }
}
