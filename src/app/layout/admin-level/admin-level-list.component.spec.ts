import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelListComponent } from './admin-level-list.component';

describe('AdminLevelListComponent', () => {
  let component: AdminLevelListComponent;
  let fixture: ComponentFixture<AdminLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLevelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
