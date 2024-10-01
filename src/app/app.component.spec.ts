import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideStore, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let storeMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of({ acceptTerms: true })),
      dispatch: jasmine.createSpy(),
      subscribe: jasmine.createSpy().and.returnValue(of({}))
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('test-id')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent], // Move AppComponent to imports array
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch the correct action on change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    app.onChange();
    
    expect(storeMock.dispatch).toHaveBeenCalledWith({ type: '[Home Page] Accept Terms' });
  });

  it('should select acceptTerms from the store', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    expect(app.acceptTerms$()).toEqual({ acceptTerms: true });
  });
  
  it('should have initial acceptTerms$ value from the store', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Verifica que el valor inicial de acceptTerms$ es el esperado
    expect(app.acceptTerms$()).toEqual({ acceptTerms: true });
  });
  
  it('should dispatch "[Home Page] Accept Terms" when onChange is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Ejecutar el método onChange
    app.onChange();
  
    // Verificar que se ha despachado la acción correcta
    expect(storeMock.dispatch).toHaveBeenCalledWith({ type: '[Home Page] Accept Terms' });
  });
  
  it('should subscribe to store on init', () => {
    TestBed.createComponent(AppComponent);
  
    // Verifica que la suscripción al store se ha realizado
    expect(storeMock.subscribe).toHaveBeenCalled();
  });
  
  it('should update acceptTerms$ when store changes', () => {
    // Simula un nuevo valor en el estado
    storeMock.select.and.returnValue(of({ acceptTerms: false }));
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Verifica que el valor de acceptTerms$ se actualiza
    expect(app.acceptTerms$()).toEqual({ acceptTerms: false });
  });
  
  it('should have the correct title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Verifica que el título es "dominiStore"
    expect(app.title).toEqual('dominiStore');
  });
  
  it('should render accept terms checkbox', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    
    // Verificar que el checkbox de aceptar términos está presente en la plantilla
    expect(compiled.querySelector('input[type="checkbox"]')).toBeTruthy();
  });
  
});