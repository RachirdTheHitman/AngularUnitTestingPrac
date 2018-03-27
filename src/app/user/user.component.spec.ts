import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {before} from 'selenium-webdriver/testing';
import {UserService} from './user.service';
import {DataService} from '../shared/data.service';

describe('UserComponent', () => {
  // let component: UserComponent;
  // let fixture: ComponentFixture<UserComponent>;
  //
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ UserComponent ]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });

  it('should create the app', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(app.user.name);
  });

  it('should display the user name if user is logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    // let userService = fixture.debugElement.injector.get(UserService);  // could delete this line because service can be injected by angular2 automatically
    app.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;   // get access to the template compiled
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it('shouldn\'t display the user name if user is not logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    // let userService = fixture.debugElement.injector.get(UserService);  // could delete this line because service can be injected by angular2 automatically
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;   // get access to the template compiled
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  });

  it('shouln\'t fetch data successfully if not called asynchronously', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });

  it('should fetch data successfully if called synchronously', async(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe('Data');
    });
  }));

  it('should fetch data successfully if called synchronously', fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app =fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();    // using tick to immediately finishe the async simulation and go on to the next step
    expect(app.data).toBe('Data');
  }));
});
