import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProgramPage } from './program.page';

describe('ProgramPage', () => {
  let component: ProgramPage;
  let fixture: ComponentFixture<ProgramPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProgramPage],
        imports: [IonicModule.forRoot()],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { params: { id: 1 } } },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgramPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
