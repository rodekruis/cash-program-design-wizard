import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
})
export class NumbersOnlyDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent | any) {
    return new RegExp(event.target.pattern).test(event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent | any) {
    event.preventDefault();
    const invertPattern = new RegExp(
      `${event.target.pattern.replace('[', '[^')}`,
      'g',
    );
    const pasteData = event.clipboardData.getData('text/plain');
    const stripped = pasteData.replace(invertPattern, '');
    document.execCommand('insertText', false, stripped);
  }
}
