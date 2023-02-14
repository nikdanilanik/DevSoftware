import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMemoryDataComponent } from './in-memory-data.component';

describe('InMemoryDataComponent', () => {
  let component: InMemoryDataComponent;
  let fixture: ComponentFixture<InMemoryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InMemoryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMemoryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
