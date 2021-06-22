import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OkulihtiyacPage } from './okulihtiyac.page';

describe('OkulihtiyacPage', () => {
  let component: OkulihtiyacPage;
  let fixture: ComponentFixture<OkulihtiyacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkulihtiyacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OkulihtiyacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
