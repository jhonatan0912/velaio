import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '@services/tasks.service';
import { minDate } from "@utils/date";
import { findInvalidControls } from '@utils/format-errors';
import { uniqueAssociateNamesValidator } from '@utils/unique-associate-name.validator';

@Component({
  selector: 'task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [ReactiveFormsModule, NgFor, NgIf]
})
export class TaskFormComponent {

  private readonly tasksService = inject(TasksService);
  private readonly router = inject(Router);

  minDate = minDate;
  formBuilder = inject(FormBuilder);
  taskForm: FormGroup = this.formBuilder.group({
    id: window.crypto.randomUUID(),
    title: new FormControl('', [Validators.required]),
    deadline: new FormControl(null, [Validators.required]),
    associates: this.formBuilder.array([
      this.formBuilder.group({
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        age: new FormControl(null, [
          Validators.required,
          Validators.min(18)
        ]),
        skills: this.formBuilder.array([
          new FormControl('', [Validators.required, Validators.minLength(5)]),
        ])
      }),
    ], [uniqueAssociateNamesValidator()]),
    done: false
  });

  get associates(): FormArray {
    return this.taskForm.get('associates') as FormArray;
  }

  getSkills(associateIndex: number): FormArray {
    return this.associates.at(associateIndex).get('skills') as FormArray;
  }

  createAssociate(): FormGroup {
    return this.formBuilder.group({
      fullName: new FormControl(''),
      age: new FormControl(null),
      skills: this.formBuilder.array([new FormControl('', [Validators.required])])
    });
  }

  addAssociate(): void {
    this.associates.push(this.createAssociate());
  }

  removeAssociate(): void {
    if (this.associates.length > 1) {
      this.associates.removeAt(this.associates.length - 1);
    }
  }

  addSkill(associateIndex: number): void {
    const skillsArray = this.associates.at(associateIndex).get('skills') as FormArray;
    skillsArray.push(new FormControl('', [Validators.required]),);
  }

  removeSkill(associateIndex: number): void {
    const skillsArray = this.associates.at(associateIndex).get('skills') as FormArray;
    if (skillsArray.length > 1) {
      skillsArray.removeAt(skillsArray.length - 1);
    }
  }

  onSubmit(): void {
    this.taskForm.patchValue({ id: window.crypto.randomUUID() });

    if (this.taskForm.invalid) {
      const invalidFields = findInvalidControls(this.taskForm);
      alert(`Los siguientes campos son inválidos: ${invalidFields.join(', ')}`);

      return;
    }
    this.tasksService.addTask(this.taskForm.value);
    this.router.navigate(['/list']);
  }


}
