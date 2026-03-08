import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Alert, AlertPriority } from '../models/alert.model';
import { ApiResponse } from '../models/api-response.model';
import { ChangePasswordDTO, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';
import { BusLine, BusRoute, BusStop } from '../models/bus.model';
import { Complaint, ComplaintPriority, ComplaintState } from '../models/complaint.model';
import { Page } from '../models/page.model';
import { User, UserRole } from '../models/user.model';

type BackendResponse<T> = ApiResponse<T> | T;
type HttpQueryValue = string | number | boolean | null | undefined;
type HttpQueryParams = Record<string, HttpQueryValue>;
type UserPayload = { dni?: number | null; firstName?: string | null; lastName?: string | null; role?: UserRole | null };
type RoutePayload = { lineId?: number | null; name?: string | null; coordinates?: string | null };
type StopPayload = { routeId?: number | null; name?: string | null; locationGeoJson?: string | null };

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private readonly companyId = 1;
  private readonly companyName = 'SITU Demo';
  private readonly companyLogo = 'assets/images/bus_icon.png';

  private session: SessionDTO | null = null;

  private users: User[] = [
    this.user(1, 30000001, 'Ignacio', 'Admin', UserRole.ADMIN),
    this.user(2, 30000002, 'Sofia', 'Supervisor', UserRole.SUPERVISOR),
    this.user(3, 30000003, 'Tomas', 'Empleado', UserRole.EMPLOYEE),
    this.user(4, 30000004, 'Luis', 'Chofer', UserRole.DRIVER),
    this.user(5, 30000005, 'Ana', 'Pasajera', UserRole.PASSENGER)
  ];

  private complaints: Complaint[] = this.seedComplaints();
  private alerts: Alert[] = this.seedAlerts();
  private lines: BusLine[] = [
    { id: 1, number: '24', name: 'Centro - Sur', company: this.transitCompany() },
    { id: 2, number: '47', name: 'Estacion - Terminal', company: this.transitCompany() },
    { id: 3, number: '60', name: 'Norte - Microcentro', company: this.transitCompany() }
  ];

  private routes: BusRoute[] = [
    { id: 1, lineId: 1, lineNumber: '24', lineName: 'Centro - Sur', name: 'Recorrido Principal', coordinates: this.lineString([[-58.385, -34.603], [-58.394, -34.612], [-58.403, -34.621]]) },
    { id: 2, lineId: 2, lineNumber: '47', lineName: 'Estacion - Terminal', name: 'Recorrido Oeste', coordinates: this.lineString([[-58.442, -34.627], [-58.433, -34.618], [-58.423, -34.61]]) }
  ];

  private stops: BusStop[] = [
    { id: 1, routeId: 1, name: 'Av. Rivadavia 1200', location: this.point(-58.385, -34.603) },
    { id: 2, routeId: 1, name: 'Parque Lezama', location: this.point(-58.395, -34.611) },
    { id: 3, routeId: 2, name: 'Estacion Lanus', location: this.point(-58.399, -34.704) }
  ];

  private nextUserId = 6;
  private nextAlertId = 3;
  private nextLineId = 4;
  private nextRouteId = 3;
  private nextStopId = 4;

  GET<T>(endpoint: string, args?: HttpQueryParams): Observable<BackendResponse<T>> {
    const path = endpoint.replace(/^\/+|\/+$/g, '');

    if (path === 'auth/session') {
      return this.session ? this.ok(this.session as T) : this.unauthorized<T>();
    }

    if (path.startsWith('complaints/tracking/')) {
      const token = path.replace('complaints/tracking/', '').trim().toUpperCase();
      const complaint = this.complaints.find((item) => (item.trackingToken ?? '').toUpperCase() === token);
      return complaint ? this.ok(this.clone(complaint) as T) : this.notFound<T>('ERRORS.COMPLAINT.NOT_FOUND');
    }

    if (!this.session) {
      return this.unauthorized<T>();
    }

    const complaintsPage = path.match(/^complaints\/(\d+)\/(\d+)$/);
    if (complaintsPage) {
      return this.ok(this.page(this.complaints, Number(complaintsPage[1]), Number(complaintsPage[2])) as T);
    }

    const minePage = path.match(/^complaints\/mine\/(\d+)\/(\d+)$/);
    if (minePage) {
      const mine = this.complaints.filter((item) => item.reporter?.id === this.session?.userId);
      const source = mine.length > 0 ? mine : this.complaints;
      return this.ok(this.page(source, Number(minePage[1]), Number(minePage[2])) as T);
    }

    const complaintById = path.match(/^complaints\/(\d+)$/);
    if (complaintById) {
      const complaint = this.complaints.find((item) => item.id === Number(complaintById[1]));
      return complaint ? this.ok(this.clone(complaint) as T) : this.notFound<T>('ERRORS.COMPLAINT.NOT_FOUND');
    }

    const alertsPage = path.match(/^alerts\/(\d+)\/(\d+)$/);
    if (alertsPage) {
      const activeOnly = this.asBoolean(args?.['activeOnly'], true);
      const source = activeOnly ? this.alerts.filter((item) => item.active) : this.alerts;
      return this.ok(this.page(source, Number(alertsPage[1]), Number(alertsPage[2])) as T);
    }

    if (path === 'lines') {
      return this.ok(this.clone(this.lines) as T);
    }
    const lineById = path.match(/^lines\/(\d+)$/);
    if (lineById) {
      const line = this.lines.find((item) => item.id === Number(lineById[1]));
      return line ? this.ok(this.clone(line) as T) : this.notFound<T>('ERRORS.BUS.LINE_NOT_FOUND');
    }

    const routesByLine = path.match(/^routes\/line\/(\d+)$/);
    if (routesByLine) {
      const lineId = Number(routesByLine[1]);
      return this.ok(this.clone(this.routes.filter((item) => item.lineId === lineId)) as T);
    }

    const stopsByRoute = path.match(/^stops\/route\/(\d+)$/);
    if (stopsByRoute) {
      const routeId = Number(stopsByRoute[1]);
      return this.ok(this.clone(this.stops.filter((item) => item.routeId === routeId)) as T);
    }

    const usersPage = path.match(/^users\/(\d+)\/(\d+)$/);
    if (usersPage) {
      return this.ok(this.page(this.users, Number(usersPage[1]), Number(usersPage[2])) as T);
    }

    const userById = path.match(/^users\/(\d+)$/);
    if (userById) {
      const user = this.users.find((item) => item.id === Number(userById[1]));
      return user ? this.ok(this.clone(user) as T) : this.notFound<T>('ERRORS.USER.NOT_FOUND');
    }

    return this.notFound<T>();
  }

  POST<T>(endpoint: string, body: unknown): Observable<BackendResponse<T>> {
    const path = endpoint.replace(/^\/+|\/+$/g, '');

    if (path === 'auth/login') {
      const form = body as LogInForm;
      const email = (form?.email ?? '').trim().toLowerCase();
      const password = (form?.password ?? '').trim();
      if (!email || !password) return this.badRequest<T>('ERRORS.AUTH.INVALID_CREDENTIALS');
      const user = this.users.find((item) => item.role === this.roleByEmail(email)) ?? this.users[0];
      this.session = {
        userId: user.id,
        companyId: this.companyId,
        logoImageURL: this.companyLogo,
        email,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        role: user.role
      };
      return this.ok(this.clone(this.session) as T);
    }

    if (path === 'auth/signup') {
      const form = body as SignUpForm;
      if (!(form?.companyName ?? '').trim() || !(form?.email ?? '').trim()) return this.badRequest<T>('ERRORS.AUTH.INVALID_SIGNUP_DATA');
      return this.ok(null as T);
    }

    if (path === 'auth/logout') {
      this.session = null;
      return this.ok(null as T);
    }

    if (path === 'auth/password') {
      const payload = body as ChangePasswordDTO;
      if (!this.session) return this.unauthorized<T>();
      if (!(payload?.currentPassword ?? '').trim() || (payload?.newPassword ?? '').trim().length < 8) return this.badRequest<T>('ERRORS.AUTH.INVALID_PASSWORD_CHANGE');
      return this.ok(null as T);
    }

    if (!this.session) return this.unauthorized<T>();

    if (path === 'alerts') {
      const payload = body as { title?: string; description?: string; location?: string; priority?: AlertPriority; startsAt?: string | Date; endsAt?: string | Date | null };
      const alert = new Alert();
      alert.id = this.nextAlertId++;
      alert.user = this.clone(this.users.find((item) => item.id === this.session?.userId) ?? this.users[0]);
      alert.title = (payload?.title ?? '').trim();
      alert.description = (payload?.description ?? '').trim();
      alert.location = (payload?.location ?? '').trim();
      alert.priority = payload?.priority ?? AlertPriority.MEDIUM;
      alert.alertDate = new Date();
      alert.startsAt = this.toDate(payload?.startsAt) ?? new Date();
      alert.endsAt = this.toDate(payload?.endsAt);
      alert.active = !alert.endsAt || alert.endsAt.getTime() >= Date.now();
      this.alerts.unshift(alert);
      return this.ok(this.clone(alert) as T);
    }

    if (path === 'users') {
      const payload = body as UserPayload;
      const dni = Number(payload?.dni);
      if (!Number.isInteger(dni) || dni <= 0) return this.badRequest<T>('ERRORS.USER.INVALID_DNI');
      if (this.users.some((item) => item.dni === dni)) return this.badRequest<T>('ERRORS.USER.DNI_ALREADY_EXISTS');
      const user = this.user(this.nextUserId++, dni, this.text(payload?.firstName) ?? 'Nuevo', this.text(payload?.lastName) ?? 'Usuario', payload?.role ?? UserRole.EMPLOYEE);
      this.users.push(user);
      return this.ok(this.clone(user) as T);
    }

    if (path === 'images/upload/user-profile') {
      if (!(body instanceof FormData)) return this.badRequest<T>('ERRORS.USER.INVALID_PROFILE_IMAGE_PAYLOAD');
      const userId = Number(body.get('userId'));
      const user = this.users.find((item) => item.id === userId);
      if (!user) return this.notFound<T>('ERRORS.USER.NOT_FOUND');
      user.profileImage.filename = `mock-user-${userId}-${Date.now()}.png`;
      return this.ok(null as T);
    }

    if (path === 'lines') {
      const payload = body as { number?: string; name?: string };
      const number = this.text(payload?.number);
      const name = this.text(payload?.name);
      if (!number || !name) return this.badRequest<T>('ERRORS.BUS.INVALID_LINE_DATA');
      const line: BusLine = { id: this.nextLineId++, number, name, company: this.transitCompany() };
      this.lines.push(line);
      return this.ok(this.clone(line) as T);
    }

    if (path === 'routes') {
      const payload = body as RoutePayload;
      const line = this.lines.find((item) => item.id === Number(payload?.lineId));
      if (!line) return this.notFound<T>('ERRORS.BUS.LINE_NOT_FOUND');
      const route: BusRoute = { id: this.nextRouteId++, lineId: line.id, lineNumber: line.number, lineName: line.name, name: this.text(payload?.name) ?? `Recorrido ${line.number}`, coordinates: this.text(payload?.coordinates) ?? this.lineString([[-58.41, -34.63], [-58.4, -34.62]]) };
      this.routes.push(route);
      return this.ok(this.clone(route) as T);
    }

    if (path === 'stops') {
      const payload = body as StopPayload;
      const routeId = Number(payload?.routeId) || this.routes[0]?.id;
      if (!routeId) return this.notFound<T>('ERRORS.BUS.ROUTE_NOT_FOUND');
      const stop: BusStop = { id: this.nextStopId++, routeId, name: this.text(payload?.name) ?? `Parada ${this.nextStopId}`, location: this.text(payload?.locationGeoJson) ?? this.point(-58.42, -34.64) };
      this.stops.push(stop);
      return this.ok(this.clone(stop) as T);
    }

    return this.notFound<T>();
  }

  PUT<T>(endpoint: string, body?: unknown): Observable<BackendResponse<T>> {
    const path = endpoint.replace(/^\/+|\/+$/g, '');
    if (!this.session) return this.unauthorized<T>();

    const userById = path.match(/^users\/(\d+)$/);
    if (userById) {
      const user = this.users.find((item) => item.id === Number(userById[1]));
      if (!user) return this.notFound<T>('ERRORS.USER.NOT_FOUND');
      const payload = body as UserPayload;
      const dni = payload?.dni != null ? Number(payload.dni) : user.dni;
      if (!Number.isInteger(dni) || dni <= 0) return this.badRequest<T>('ERRORS.USER.INVALID_DNI');
      if (this.users.some((item) => item.id !== user.id && item.dni === dni)) return this.badRequest<T>('ERRORS.USER.DNI_ALREADY_EXISTS');
      user.dni = dni;
      user.firstName = this.text(payload?.firstName) ?? user.firstName;
      user.lastName = this.text(payload?.lastName) ?? user.lastName;
      user.role = payload?.role ?? user.role;
      return this.ok(this.clone(user) as T);
    }

    const lineById = path.match(/^lines\/(\d+)$/);
    if (lineById) {
      const line = this.lines.find((item) => item.id === Number(lineById[1]));
      if (!line) return this.notFound<T>('ERRORS.BUS.LINE_NOT_FOUND');
      const payload = body as { number?: string; name?: string };
      line.number = this.text(payload?.number) ?? line.number;
      line.name = this.text(payload?.name) ?? line.name;
      return this.ok(this.clone(line) as T);
    }

    const routeById = path.match(/^routes\/(\d+)$/);
    if (routeById) {
      const route = this.routes.find((item) => item.id === Number(routeById[1]));
      if (!route) return this.notFound<T>('ERRORS.BUS.ROUTE_NOT_FOUND');
      const payload = body as RoutePayload;
      if (payload?.lineId) {
        const line = this.lines.find((item) => item.id === Number(payload.lineId));
        if (!line) return this.notFound<T>('ERRORS.BUS.LINE_NOT_FOUND');
        route.lineId = line.id;
        route.lineName = line.name;
        route.lineNumber = line.number;
      }
      route.name = this.text(payload?.name) ?? route.name;
      route.coordinates = this.text(payload?.coordinates) ?? route.coordinates;
      return this.ok(this.clone(route) as T);
    }

    const stopById = path.match(/^stops\/(\d+)$/);
    if (stopById) {
      const stop = this.stops.find((item) => item.id === Number(stopById[1]));
      if (!stop) return this.notFound<T>('ERRORS.BUS.STOP_NOT_FOUND');
      const payload = body as StopPayload;
      stop.routeId = payload?.routeId != null ? Number(payload.routeId) : stop.routeId;
      stop.name = this.text(payload?.name) ?? stop.name;
      stop.location = this.text(payload?.locationGeoJson) ?? stop.location;
      return this.ok(this.clone(stop) as T);
    }

    return this.notFound<T>();
  }

  PATCH<T>(_endpoint: string, _body?: unknown): Observable<BackendResponse<T>> {
    return this.notFound<T>();
  }

  DELETE<T>(endpoint: string): Observable<BackendResponse<T>> {
    const path = endpoint.replace(/^\/+|\/+$/g, '');
    if (!this.session) return this.unauthorized<T>();

    const userById = path.match(/^users\/(\d+)$/);
    if (userById) {
      const id = Number(userById[1]);
      if (this.session.userId === id) return this.badRequest<T>('ERRORS.USER.CANNOT_DELETE_CURRENT_SESSION');
      this.users = this.users.filter((item) => item.id !== id);
      return this.ok(null as T);
    }

    const lineById = path.match(/^lines\/(\d+)$/);
    if (lineById) {
      const lineId = Number(lineById[1]);
      const deletedRoutes = this.routes.filter((item) => item.lineId === lineId).map((item) => item.id);
      this.lines = this.lines.filter((item) => item.id !== lineId);
      this.routes = this.routes.filter((item) => item.lineId !== lineId);
      this.stops = this.stops.filter((item) => !deletedRoutes.includes(item.routeId ?? -1));
      return this.ok(null as T);
    }

    const routeById = path.match(/^routes\/(\d+)$/);
    if (routeById) {
      const routeId = Number(routeById[1]);
      this.routes = this.routes.filter((item) => item.id !== routeId);
      this.stops = this.stops.filter((item) => item.routeId !== routeId);
      return this.ok(null as T);
    }

    const stopById = path.match(/^stops\/(\d+)$/);
    if (stopById) {
      this.stops = this.stops.filter((item) => item.id !== Number(stopById[1]));
      return this.ok(null as T);
    }

    return this.notFound<T>();
  }

  private user(id: number, dni: number, firstName: string, lastName: string, role: UserRole): User {
    const user = new User();
    user.id = id;
    user.dni = dni;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role;
    user.company.id = this.companyId;
    user.company.name = this.companyName;
    user.company.logoPath = this.companyLogo;
    user.profileImage.id = id;
    user.profileImage.filename = '';
    return user;
  }

  private seedComplaints(): Complaint[] {
    const make = (id: number, reporterId: number, state: ComplaintState, priority: ComplaintPriority, trackingToken: string, text: string): Complaint => {
      const complaint = new Complaint();
      complaint.id = id;
      complaint.reporter = { id: reporterId, fullName: this.fullName(reporterId) };
      complaint.assignee = { id: 2, fullName: this.fullName(2) };
      complaint.description = text;
      complaint.reason = 'Servicio';
      complaint.state = state;
      complaint.priority = priority;
      complaint.createdAt = new Date(Date.now() - id * 3600_000);
      complaint.updatedAt = new Date(Date.now() - (id - 1) * 3600_000);
      complaint.maskedContactEmail = 'us***@mail.com';
      complaint.maskedContactPhone = '+54 11 ****-****';
      complaint.trackingToken = trackingToken;
      return complaint;
    };

    return [
      make(1, 1, ComplaintState.IN_REVIEW, ComplaintPriority.HIGH, 'SITU-AAA111', 'Demora recurrente en linea 24.'),
      make(2, 5, ComplaintState.PENDING_REVIEW, ComplaintPriority.MEDIUM, 'SITU-BBB222', 'Parada sin iluminacion.'),
      make(3, 1, ComplaintState.CLOSED, ComplaintPriority.LOW, 'SITU-CCC333', 'Ruido excesivo en unidad.')
    ];
  }

  private seedAlerts(): Alert[] {
    const alert = new Alert();
    alert.id = 1;
    alert.user = this.clone(this.users[0]);
    alert.title = 'Desvio temporal';
    alert.description = 'Obras sobre corredor principal.';
    alert.location = 'CABA';
    alert.priority = AlertPriority.HIGH;
    alert.alertDate = new Date(Date.now() - 2 * 3600_000);
    alert.startsAt = new Date(Date.now() - 2 * 3600_000);
    alert.endsAt = new Date(Date.now() + 4 * 3600_000);
    alert.active = true;
    return [alert];
  }

  private page<T>(items: T[], pageIndex: number, pageSize: number): Page<T> {
    const idx = Math.max(0, Number.isFinite(pageIndex) ? Math.floor(pageIndex) : 0);
    const size = Math.max(1, Number.isFinite(pageSize) ? Math.floor(pageSize) : 20);
    const start = idx * size;
    const content = items.slice(start, start + size);
    const totalElements = items.length;
    const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
    const sort = { empty: true, sorted: false, unsorted: true };

    return {
      content: this.clone(content),
      pageable: { pageNumber: idx, pageSize: size, sort, offset: start, paged: true, unpaged: false },
      last: totalPages === 0 ? true : idx >= totalPages - 1,
      totalElements,
      totalPages,
      first: idx === 0,
      size,
      number: idx,
      sort,
      numberOfElements: content.length,
      empty: content.length === 0
    };
  }

  private roleByEmail(email: string): UserRole {
    if (email.includes('super')) return UserRole.SUPERVISOR;
    if (email.includes('employee')) return UserRole.EMPLOYEE;
    if (email.includes('driver')) return UserRole.DRIVER;
    if (email.includes('passenger')) return UserRole.PASSENGER;
    return UserRole.ADMIN;
  }

  private fullName(userId: number): string {
    const user = this.users.find((item) => item.id === userId);
    return user ? `${user.firstName} ${user.lastName}`.trim() : `Usuario ${userId}`;
  }

  private text(value: unknown): string | null {
    if (value == null) return null;
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : null;
  }

  private asBoolean(value: HttpQueryValue, fallback: boolean): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return fallback;
  }

  private toDate(value: unknown): Date | null {
    if (value == null) return null;
    const parsed = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private lineString(coordinates: Array<[number, number]>): string {
    return JSON.stringify({ type: 'LineString', coordinates });
  }

  private point(longitude: number, latitude: number): string {
    return JSON.stringify({ type: 'Point', coordinates: [longitude, latitude] });
  }

  private transitCompany(): { id: number; name: string; logo_filename: string } {
    return { id: this.companyId, name: this.companyName, logo_filename: this.companyLogo };
  }

  private ok<T>(data: T): Observable<BackendResponse<T>> {
    if (data === null || data === undefined) return of(data);
    return of(this.clone(data));
  }

  private unauthorized<T>(message: string = 'ERRORS.AUTH.INVALID_CREDENTIALS'): Observable<BackendResponse<T>> {
    return this.fail<T>(401, 'Unauthorized', message);
  }

  private badRequest<T>(message: string = 'ERRORS.GENERIC'): Observable<BackendResponse<T>> {
    return this.fail<T>(400, 'Bad Request', message);
  }

  private notFound<T>(message: string = 'ERRORS.GENERIC'): Observable<BackendResponse<T>> {
    return this.fail<T>(404, 'Not Found', message);
  }

  private fail<T>(status: number, error: string, message: string): Observable<BackendResponse<T>> {
    return throwError(() => new HttpErrorResponse({
      status,
      statusText: error,
      error: { timestamp: new Date().toISOString(), status, error, message }
    }));
  }

  private clone<T>(value: T): T {
    return structuredClone(value);
  }
}
