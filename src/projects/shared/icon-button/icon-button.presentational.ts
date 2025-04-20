import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'button[icon-button]',
  templateUrl: 'icon-button.presentational.html',
  styleUrls: ['icon-button.presentational.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon],
})
export class IconButtonPresentational {}
