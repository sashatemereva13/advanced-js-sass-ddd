export type StudentEnrolledEvent = {
  type: "StudentEnrolled";
  payload: {
    enrollmentId: string;
    studentId: string;
    courseCode: string;
    semester: string;
    occurredAt: Date;
  };
};

export type CourseCapacityReachedEvent = {
  type: "CourseCapacityReached";
  payload: {
    courseCode: string;
    enrolledCount: number;
    capacity: number;
    occurredAt: Date;
  };
};

export type CourseFullEvent = {
  type: "CourseFull";
  payload: {
    courseCode: string;
    occurredAt: Date;
  };
};

export type EnrollmentCancelledEvent = {
  type: "EnrollmentCancelled";
  payload: {
    enrollmentId: string;
    studentId: string;
    courseCode: string;
    semester: string;
    occurredAt: Date;
  };
};

export type DomainEvent =
  | StudentEnrolledEvent
  | CourseCapacityReachedEvent
  | CourseFullEvent
  | EnrollmentCancelledEvent;