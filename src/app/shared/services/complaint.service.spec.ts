import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ComplaintService } from './complaint.service';
import { GenericAPIService } from './generic-api.service';
import { Complaint } from '../models/complaint.model';
import { Page } from '../models/page.model';

describe('ComplaintService', () => {
  let service: ComplaintService;
  let apiSpy: jasmine.SpyObj<GenericAPIService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<GenericAPIService>('GenericAPIService', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

    TestBed.configureTestingModule({
      providers: [
        ComplaintService,
        { provide: GenericAPIService, useValue: apiSpy }
      ]
    });

    service = TestBed.inject(ComplaintService);
  });

  it('should call list complaints endpoint', async () => {
    const response = buildComplaintPage();
    apiSpy.GET.and.returnValue(of(response));

    const value = await firstValueFrom(service.getComplaints(0, 20));

    expect(apiSpy.GET).toHaveBeenCalledWith('complaints/0/20');
    expect(value).toEqual(response);
  });

  it('should call list my complaints endpoint', async () => {
    const response = buildComplaintPage();
    apiSpy.GET.and.returnValue(of(response));

    const value = await firstValueFrom(service.getMyComplaints(1, 10));

    expect(apiSpy.GET).toHaveBeenCalledWith('complaints/mine/1/10');
    expect(value).toEqual(response);
  });

  it('should call complaint details endpoint', async () => {
    const complaint = new Complaint();
    complaint.id = 77;
    apiSpy.GET.and.returnValue(of(complaint));

    const value = await firstValueFrom(service.getComplaint(77));

    expect(apiSpy.GET).toHaveBeenCalledWith('complaints/77');
    expect(value.id).toBe(77);
  });

  it('should call complaint tracking endpoint', async () => {
    const complaint = new Complaint();
    complaint.trackingToken = 'ABC123';
    apiSpy.GET.and.returnValue(of(complaint));

    const value = await firstValueFrom(service.getComplaintByTrackingToken('ABC123'));

    expect(apiSpy.GET).toHaveBeenCalledWith('complaints/tracking/ABC123');
    expect(value.trackingToken).toBe('ABC123');
  });
});

function buildComplaintPage(): Page<Complaint> {
  return {
    content: [new Complaint()],
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
