import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { AlertService } from './alert.service';
import { GenericAPIService } from './generic-api.service';
import { Alert, AlertPriority } from '../models/alert.model';
import { Page } from '../models/page.model';

describe('AlertService', () => {
  let service: AlertService;
  let apiSpy: jasmine.SpyObj<GenericAPIService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<GenericAPIService>('GenericAPIService', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: GenericAPIService, useValue: apiSpy }
      ]
    });

    service = TestBed.inject(AlertService);
  });

  it('should request active alerts by default', async () => {
    const response = buildAlertPage();
    apiSpy.GET.and.returnValue(of(response));

    const value = await firstValueFrom(service.GetAlerts(0, 20));

    expect(apiSpy.GET).toHaveBeenCalledWith('alerts/0/20', { activeOnly: true });
    expect(value).toEqual(response);
  });

  it('should request all alerts when activeOnly is false', async () => {
    const response = buildAlertPage();
    apiSpy.GET.and.returnValue(of(response));

    const value = await firstValueFrom(service.GetAlerts(2, 5, false));

    expect(apiSpy.GET).toHaveBeenCalledWith('alerts/2/5', { activeOnly: false });
    expect(value).toEqual(response);
  });

  it('should send normalized payload when creating an alert', async () => {
    const alert = new Alert();
    alert.title = 'Linea interrumpida';
    alert.description = 'Servicio temporalmente detenido';
    alert.location = 'CABA';
    alert.priority = AlertPriority.HIGH;
    alert.startsAt = new Date('2026-02-18T10:00:00Z');
    alert.endsAt = new Date('2026-02-18T12:00:00Z');
    alert.user.id = 100;

    const created = new Alert();
    created.id = 999;

    apiSpy.POST.and.returnValue(of(created));

    const value = await firstValueFrom(service.CreateAlert(alert));

    expect(apiSpy.POST).toHaveBeenCalledWith('alerts', {
      title: alert.title,
      description: alert.description,
      location: alert.location,
      priority: alert.priority,
      startsAt: alert.startsAt,
      endsAt: alert.endsAt
    });
    expect(value.id).toBe(999);
  });
});

function buildAlertPage(): Page<Alert> {
  return {
    content: [new Alert()],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: 1,
    totalPages: 1,
    first: true,
    size: 20,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    numberOfElements: 1,
    empty: false
  };
}
