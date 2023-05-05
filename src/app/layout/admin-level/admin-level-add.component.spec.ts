import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelAddComponent } from './admin-level-add.component';

describe('AdminLevelAddComponent', () => {
  let component: AdminLevelAddComponent;
  let fixture: ComponentFixture<AdminLevelAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLevelAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLevelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
