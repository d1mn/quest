import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {State} from 'src/app/resources/extensions/store.extension';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DataApi} from '../../resources/api/data.api';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'main-page',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public pending$: State<boolean> = new State<boolean>(false);

  form: FormGroup = new FormGroup({
    teamName: new FormControl(),
    codes: new FormArray([]),
  });

  codesLength: number = 10;
  errorMessage: string = '';

  constructor(private dataApi: DataApi,
              private router: Router) {
    this.buildForm();
  }

  get controls() {
    return (this.form.get('codes') as FormArray).controls;
  }

  buildForm() {
    for (let i = 0; i < this.codesLength; i++) {
      (this.form.get('codes') as FormArray).push(
        new FormControl(null)
      )
    }

    this.listenChanges();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  listenChanges(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      this.errorMessage = null;
    });
  }

  submit(): void {
    console.log(this.form);

    if (this.form.valid) {
      this.pending$.next(true);
      this.dataApi.send(this.form.value).pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          console.log('final');
          this.pending$.next(false);

        })
      ).subscribe((data) => {
        this.router.navigate(['/success'])
      }, (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message
      })

    } else {
      this.errorMessage = 'Пожалуйста, заполните форму корректно'
    }
  }
}
