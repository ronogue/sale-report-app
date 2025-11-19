import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from './core/services/services/navigation.service';
import { navigationItems } from './config/navigation-data';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    private navigationService = inject(NavigationService);

    ngOnInit(): void {
        this.navigationService.update(navigationItems);
    }
}
