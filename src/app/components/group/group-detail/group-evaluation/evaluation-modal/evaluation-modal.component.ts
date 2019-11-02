import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { GroupService } from 'src/app/providers/group/group.service';
import { EvaluationService } from 'src/app/providers/group/evaluation.service';
import { QuestionService } from 'src/app/providers/group/question.service';
import { AnswerService } from 'src/app/providers/group/answer.service';

import { Question } from 'src/app/models/question.interface';
import { Answer } from 'src/app/models/answer.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-evaluation-modal',
  templateUrl: './evaluation-modal.component.html',
  styleUrls: ['./evaluation-modal.component.css']
})
export class EvaluationModalComponent implements OnDestroy {

  formEvaluation: FormGroup;
  loading: boolean = false;
  questions: Question[] = [];
  evaluationId: string;
  addingQuestion: boolean = false;
  formQuestion: FormGroup;
  loadingQuestion: boolean = false;
  questionId: string;
  addingAnswer: boolean = false;
  formAnswer: FormGroup;
  answers: Answer[] = [];
  questionSub: Subscription;
  answerSub: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private bottomSheet: MatBottomSheet,
              private groupService: GroupService,
              private evaluationService: EvaluationService,
              private questionService: QuestionService,
              private answerService: AnswerService) {
    this.formEvaluation = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl(),
      'dueDate': new FormControl('', [
        Validators.required
      ])
    });

    this.formQuestion = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ])
    });

    this.formAnswer = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'correct': new FormControl()
    });
  }
  
  ngOnDestroy(): void {
    this.questionSub && this.questionSub.unsubscribe();
  }

  showAddQuestion = () => this.addingQuestion = true;

  showAddAnswer = () => this.addingAnswer = true;

  saveEvaluation = () => {
    this.loading = true;
    let dueDate = this.formEvaluation.value['dueDate'].toDate();
    this.evaluationService.save(this.groupService.groupId, {...this.formEvaluation.value, dueDate})
      .then((document: DocumentReference) => {
        this.evaluationId = document.id;
        this.loading = false;
        this.questionSub = this.questionService.findAll(this.groupService.groupId, this.evaluationId)
          .subscribe((questions: Question[]) => this.questions = questions);
      })
  }
  saveQuestion = () => {
    this.loadingQuestion = true;
    this.questionService.save(this.groupService.groupId, this.evaluationId, {...this.formQuestion.value})
      .then((document: DocumentReference) => {
        this.questionId = document.id;
        this.loadingQuestion = false;
        this.answerSub = this.answerService.findAll(this.groupService.groupId, this.evaluationId, this.questionId)
          .subscribe((answers: Answer[]) => this.answers = answers);
      })
  }

  saveAnswer = () => {
    this.answerService.save(this.groupService.groupId, this.evaluationId, this.questionId, {...this.formAnswer.value})
      .then((document: DocumentReference) => {
        this.addingAnswer = false;
        this.formAnswer.reset();
        this.changeDetectorRef.markForCheck();
      });
  }

  finishQuestion = () => {
    this.addingQuestion = false;
    this.formQuestion.reset();
    this.answerSub.unsubscribe();
    this.changeDetectorRef.markForCheck();
  }

  finishEvaluation = () => this.bottomSheet.dismiss();


}
