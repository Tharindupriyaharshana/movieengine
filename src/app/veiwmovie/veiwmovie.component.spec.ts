import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VeiwmovieComponent } from "./veiwmovie.component";

describe("VeiwmovieComponent", () => {
  let component: VeiwmovieComponent;
  let fixture: ComponentFixture<VeiwmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VeiwmovieComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
