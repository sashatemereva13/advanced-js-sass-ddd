// _____________
//
// BRAND UTILITY
//_____________
//

export type Brand<K, T> = K & { __brand: T };

// _____________
//
// student id
// format: STU + 6 digits
// example: STU124567
//_____________
//

export type StudentId = Brand<string, "StudentId">;

export function createStudentId(value: string): StudentId | Error {
  const regex = /^STU\d{6}$/;

  if (!regex.test(value)) {
    return new Error(
      "Invalid Student ID format. Expected format: STU + 6 digits (e.g., STU123456)",
    );
  }

  return value as StudentId;
}

// _____________
//
// course code
// format: 2-4 letters + 3 digits
// example: CS101
//_____________
//

export type CourseCode = Brand<string, "CourseCode">;

export function createCourseCode(value: string): CourseCode | Error {
  const regex = /^[A-Z]{2, 4}\d{3}$/;

  if (!regex.test(value)) {
    return new Error("Invalid CourseCode format");
  }

  return value as CourseCode;
}

// _____________
//
// email
//_____________
//

export type Email = Brand<string, "Email">;

export function createEmail(value: string): Email | Error {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    return new Error("Invalid email format");
  }

  return value as Email;
}

// _____________
//
// credits
// allowed: 1,2,3,4,6
//_____________
//

export type Credits = Brand<number, "Credits">;

export function createCredits(value: number): Credits | Error {
  const allowed = [1, 2, 3, 4, 6];

  if (!allowed.includes(value)) {
    return new Error("Credits must be one of 1,2,3,4,6");
  }

  return value as Credits;
}

// _____________
//
// semester
// format: (Fall|Spring|Summer)YYYY
// example: Fall2024
//_____________
//

export type Semester = Brand<string, "Semester">;

export function createSemester(value: string): Semester | Error {
  const regex = /^(Fall|Spring|Summer)\d{4}$/;

  if (!regex.test(value)) {
    return new Errir("Invalid semester format");
  }

  return value as Semester;
}

// _____________
//
// enrollment
// format: (ENR + unique identifier
//_____________
//

export type EnrollmentId = Brand<string, "EnrollmentId">;

export function createEnrollmentId(value: string): EnrollmentId | Error {
  const regex = /^ENR-[a-zA-Z0-9\-]+$/;

  if (!regex.test(value)) {
    return new Error("Invalid Enrollment format");
  }

  return value as EnrollmentId;
}
