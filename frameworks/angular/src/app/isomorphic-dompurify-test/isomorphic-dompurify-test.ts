import { Component } from '@angular/core';
import DOMPurify from 'isomorphic-dompurify';

@Component({
  selector: 'app-isomorphic-dompurify-test',
  template: `<div>{{ sanitized }}</div>`,
})
export class IsomorphicDompurifyTest {
  sanitized = DOMPurify.sanitize(
    `<a onclick="javascript:alert('test')" href="https://angular">Test</a>`
  );
}
