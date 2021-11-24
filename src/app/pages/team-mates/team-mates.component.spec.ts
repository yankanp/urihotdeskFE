import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMatesComponent } from './team-mates.component';

describe('TeamMatesComponent', () => {
  let component: TeamMatesComponent;
  let fixture: ComponentFixture<TeamMatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
