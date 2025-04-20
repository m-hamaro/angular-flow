import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavigationPresentational } from './navigation/app-navigation.presentational';
import { AppHeaderPresentational } from './header/app-header.presentational';

@Component({
  selector: 'common-presentational',
  styleUrls: ['common.presentational.scss'],
  templateUrl: 'common.presentational.html',
  standalone: true,
  imports: [RouterOutlet, AppNavigationPresentational, AppHeaderPresentational],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonPresentational {}
