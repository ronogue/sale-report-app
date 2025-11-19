import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavLinkItemComponent } from './nav-link-item/nav-link-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationService } from '../../core/services/services/navigation.service';

@Component({
    selector: 'app-sidenav',
    imports: [MatIconModule, RouterModule, MatDividerModule, MatListModule, NavLinkItemComponent],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    private navigationService = inject(NavigationService);
    links = toSignal(this.navigationService.navigations$, { initialValue: [] });
}
