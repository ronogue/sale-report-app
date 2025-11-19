import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    OnDestroy,
    Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-header',
    imports: [MatIconModule, MatDividerModule, MatMenuModule, MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Output()
    toggleSidenav = new EventEmitter<void>();

    userName = 'Fulano de Tal';
    userAvatarUrl = 'assets/avatar.png';

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    private title$ = this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.getRouteTitle(this.activatedRoute))
    );

    routeTitle = toSignal(this.title$, { initialValue: 'Home' });

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }

    private getRouteTitle(route: ActivatedRoute): string {
        let currentRoute = route;

        while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
        }

        return currentRoute.snapshot.data['title'] || '';
    }
}
