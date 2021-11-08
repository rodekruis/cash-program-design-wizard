import { Component, Input, OnInit } from '@angular/core';
import { QuestionComment } from 'src/app/types/question-input.type';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input()
  comments: QuestionComment[];

  constructor() {}

  ngOnInit() {}
}
