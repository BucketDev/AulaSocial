import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AnswerService } from 'src/app/providers/group/answer.service';
import { Question } from 'src/app/models/question.interface';
import { Answer } from 'src/app/models/answer.interface';
import { Evaluation } from 'src/app/models/evaluation.interface';
import { GroupService } from 'src/app/providers/group/group.service';
import { Subscription } from 'rxjs';
import { EvaluationResult } from 'src/app/models/evaluation-result.interface';

@Component({
  selector: 'app-evaluation-resolve-panel',
  templateUrl: './evaluation-resolve-panel.component.html',
  styleUrls: ['./evaluation-resolve-panel.component.css']
})
export class EvaluationResolvePanelComponent implements OnInit, OnDestroy {

  @Input() evaluation: Evaluation;
  @Input() question: Question;
  answers: Answer[];
  answer: Answer;
  loading: boolean = false;
  answerSub: Subscription;

  constructor(private groupService: GroupService,
              private answerService: AnswerService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.answerSub && this.answerSub.unsubscribe();
  }

  showAnswers = () => {
    if(!this.answers) {
      this.loading = true;
      this.answerSub = this.answerService.findAll(this.groupService.groupId, this.evaluation.uid, this.question.uid)
        .subscribe((answers: Answer[]) => {
          this.answers = answers;
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        })
    }
  }

  getEvaluationResult = (): EvaluationResult => {
    return {
      uid: this.question.uid,
      questionTitle: this.question.title,
      answerTitle: this.answer ? this.answer.title : '',
      correct: this.answer ? !!this.answer.correct : false,
      creationDate: new Date()
    }
  }

}
