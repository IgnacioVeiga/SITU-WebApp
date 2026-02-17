export class ComplaintUserSummary {
    public id: number = 0;
    public fullName: string = '';
}

export class Complaint {
    public id: number = 0;
    public reporter: ComplaintUserSummary | null = null;
    public assignee: ComplaintUserSummary | null = null;
    public description: string = '';
    public createdAt: Date = new Date();
    public updatedAt: Date = new Date();
    public firstResponseAt: Date | null = null;
    public closedAt: Date | null = null;
    public responseDueAt: Date | null = null;
    public resolutionDueAt: Date | null = null;
    public reason: string = '';
    public state: ComplaintState = ComplaintState.PENDING_REVIEW;
    public priority: ComplaintPriority = ComplaintPriority.MEDIUM;
    public anonymous: boolean = false;
    public maskedContactEmail: string | null = null;
    public maskedContactPhone: string | null = null;
    public trackingToken: string = '';
    public reportImageId: number | null = null;
}

export enum ComplaintState {
    PENDING_REVIEW = "PENDING_REVIEW",
    IN_REVIEW = "IN_REVIEW",
    CLOSED = "CLOSED",
    REOPENED = "REOPENED"
}

export enum ComplaintPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}
