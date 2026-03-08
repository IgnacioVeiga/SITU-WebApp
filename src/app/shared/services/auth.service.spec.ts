import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { GenericAPIService } from './generic-api.service';
import { AuthTokenPayload, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';
import { UserRole } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let apiSpy: jasmine.SpyObj<GenericAPIService>;

  const loginForm: LogInForm = {
    email: 'johndoe@example.com',
    password: 'password123'
  };

  const signUpForm: SignUpForm = {
    companyName: 'SITU Company',
    email: 'admin@example.com',
    phone: '+5491122334455',
    firstName: 'John',
    lastName: 'Doe',
    dni: 12345678,
    notes: 'Test notes'
  };

  const session: SessionDTO = {
    userId: 10,
    companyId: 7,
    logoImageURL: 'https://cdn/logo.png',
    email: 'johndoe@example.com',
    fullName: 'John Doe',
    role: UserRole.ADMIN
  };

  const authTokenPayload: AuthTokenPayload = {
    tokenType: 'Bearer',
    accessToken: 'access-token',
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    session
  };

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<GenericAPIService>('GenericAPIService', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: GenericAPIService, useValue: apiSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should call signup endpoint', async () => {
    apiSpy.POST.and.returnValue(of(void 0));

    await firstValueFrom(service.signup(signUpForm));

    expect(apiSpy.POST).toHaveBeenCalledWith('auth/signup', signUpForm);
  });

  it('should cache session after successful login', async () => {
    apiSpy.POST.and.returnValue(of(authTokenPayload));

    await firstValueFrom(service.login(loginForm));

    expect(apiSpy.POST).toHaveBeenCalledWith('auth/login', loginForm);
    expect(service.getSessionSnapshot()).toEqual(session);
  });

  it('should return cached session without calling backend again', async () => {
    apiSpy.POST.and.returnValue(of(authTokenPayload));
    await firstValueFrom(service.login(loginForm));
    apiSpy.POST.calls.reset();

    const value = await firstValueFrom(service.getSession());

    expect(value).toEqual(session);
    expect(apiSpy.POST).not.toHaveBeenCalled();
  });

  it('should refresh session from backend when cache is empty', async () => {
    apiSpy.POST.and.returnValue(of(authTokenPayload));

    const value = await firstValueFrom(service.getSession());

    expect(apiSpy.POST).toHaveBeenCalledWith('auth/refresh', {});
    expect(value).toEqual(session);
    expect(service.getSessionSnapshot()).toEqual(session);
  });

  it('should return false in isAuthenticated when refresh endpoint fails', async () => {
    service.clearLocalSession();
    apiSpy.POST.and.returnValue(throwError(() => new Error('Refresh endpoint failed')));

    const value = await firstValueFrom(service.isAuthenticated());

    expect(value).toBeFalse();
  });

  it('should clear local session on logout success and failure', async () => {
    apiSpy.POST.and.returnValue(of(authTokenPayload));
    await firstValueFrom(service.login(loginForm));

    apiSpy.POST.and.returnValue(of(void 0));
    service.logout();
    expect(service.getSessionSnapshot()).toBeNull();

    apiSpy.POST.and.returnValue(of(authTokenPayload));
    await firstValueFrom(service.login(loginForm));

    apiSpy.POST.and.returnValue(throwError(() => new Error('Logout failed')));
    service.logout();
    expect(service.getSessionSnapshot()).toBeNull();
  });
});
