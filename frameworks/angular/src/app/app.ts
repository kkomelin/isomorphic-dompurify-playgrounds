import { Component } from '@angular/core';
import { IsomorphicDompurifyTest } from './isomorphic-dompurify-test/isomorphic-dompurify-test';

@Component({
  selector: 'app-root',
  imports: [IsomorphicDompurifyTest],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
