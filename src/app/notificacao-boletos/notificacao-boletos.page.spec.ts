import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { NotificacaoBoletosPage } from './notificacao-boletos.page';

describe('NotificacaoBoletosPage', () => {
  let component: NotificacaoBoletosPage;
  let fixture: ComponentFixture<NotificacaoBoletosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacaoBoletosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacaoBoletosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
