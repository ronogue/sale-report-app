import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../interfaces/navigation-item';

@Component({
    selector: 'app-nav-link-item',
    imports: [MatIconModule, RouterModule],
    templateUrl: './nav-link-item.component.html',
    styleUrl: './nav-link-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinkItemComponent {
    @Input()
    item!: NavigationItem;
}
