import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelDetailComponent } from './admin-level-detail.component';

describe('AdminLevelDetailComponent', () => {
  let component: AdminLevelDetailComponent;
  let fixture: ComponentFixture<AdminLevelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLevelDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLevelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
