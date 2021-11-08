import { Component, Input, OnInit } from '@angular/core';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput } from 'src/app/types/question-input.type';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss'],
})
export class CommentInputComponent implements OnInit {
  @Input()
  question: QuestionInput;

  public charLimit = 140;
  public submitDisabled = true;
  public commentLength = 0;
  public comment: string;

  constructor(
    private state: StateService,
    private programData: ProgramDataService,
  ) {}

  ngOnInit() {}

  public onType(event) {
    this.comment = event.detail.value.trim();
    this.commentLength = this.comment.length;

    this.submitDisabled =
      this.commentLength === 0 || this.commentLength > this.charLimit;
  }

  public onSubmit() {
    this.programData.saveComment(
      this.state.programId,
      this.question,
      this.comment,
    );

    this.comment = '';
  }
}
