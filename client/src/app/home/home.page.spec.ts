import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from '../components/shared.module';
import { Role } from '../models/role.enum';
import { Tag } from '../models/tag.enum';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const mockParams = {
    role: Role.HQ,
    tag: Tag.data,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          SharedModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: { id: 1 },
              queryParams: of(mockParams),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
