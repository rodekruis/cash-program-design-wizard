import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  createAnswersSet,
  getAllQuestionsFromSections,
  getLatestAnswerDate,
} from 'src/app/helpers/answers.helpers';
import { PubSubEvent, PubSubService } from 'src/app/services/pub-sub.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit, OnDestroy {
  public lastSaved: Date | string;
  public sections: QuestionSection[];
  private sectionUpdates: Subscription;

  constructor(public state: StateService, private pubSub: PubSubService) {}

  ngOnInit() {
    this.sectionUpdates = this.state.sections$.subscribe((sections) => {
      this.sections = sections;

      const questions = getAllQuestionsFromSections(sections);
      const answers = createAnswersSet(questions);
      this.lastSaved = getLatestAnswerDate(answers);
    });
    this.pubSub.subscribe(
      PubSubEvent.didSaveAnswerToServer,
      (data) => (this.lastSaved = data.timestamp),
    );
  }
  ngOnDestroy() {
    this.sectionUpdates.unsubscribe();
  }
}
