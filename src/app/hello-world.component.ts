import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { concat, fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'hello-world',
  template: `
    <div>
      <h1>Hello {{name$ | async}}!</h1>
      <img alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
      <h2>What is your name?</h2>
      <input #input placeholder="Enter your name">
    </div>
  `,
  styles: [`
    div {
      text-align: center;
    }

    img, input {
      width: 300px;
    }
  `]
})
export class HelloWorldComponent implements OnInit {
  @ViewChild('input', { static: true }) input: ElementRef;
  name$: Observable<string>;

  ngOnInit() {
    this.name$ = concat(
      of('National Instruments'),
      fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(200),
        map((event: any) => event.target.value)
      ));
  }
}
