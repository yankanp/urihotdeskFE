import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeamMembersComponent } from './assign-team-members.component';

describe('AssignTeamMembersComponent', () => {
  let component: AssignTeamMembersComponent;
  let fixture: ComponentFixture<AssignTeamMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTeamMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
