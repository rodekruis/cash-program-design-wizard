import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent implements OnInit {
  public charLimit = 140;
  public submitDisabled = true;
  public commentLength = 0;

  constructor() {}

  ngOnInit() {}

  public onType(event) {
    const comment: string = event.detail.value.trim();
    this.commentLength = comment.length;

    this.submitDisabled =
      this.commentLength === 0 || this.commentLength > this.charLimit;
  }
}
