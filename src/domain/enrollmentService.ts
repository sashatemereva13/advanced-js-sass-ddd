import { Student } from "./Student";
import { Course } from "./Course";
import { Enrollment } from "./Enrollment";

import { EnrollmentId, Semester } from "./brandedTypes";

import { emit } from "../infrastructure/eventEmitter";

export function enrollStudent(
  enrollmentId: EnrollmentId,
  student: Student,
  course: Course,
  semester: Semester,
): Enrollment {
  // _______________ Rule 1: Duplicate enrollment __________________
  const duplicate = enrollments.find(
    (e) =>
      e.studentId === student.id &&
      e.courseCode === course.code &&
      e.semester === semester &&
      e.status === "active",
  );

  if (duplicate) {
    throw new Error(
      "Student already enrolled in this course for this semester",
    );
  }

  // _______________ Rule 2: Course capacity __________________
  if (!course.hasCapactiy()) {
    throw new Error("Course is full");
  }

  // _______________ Rule 2: Credut limit __________________
  if (!student.canEnroll(course.credits)) {
    throw new Error("Student exceeds 18 credits limit");
  }

  // _______________ create enrollment __________________
  const enrollment = new Enrollment(
    enrollmentId,
    student.id,
    course.code,
    semester,
  );

  // _______________ update aggregates __________________
  student.addCredits(course.credits);
  course.addStudent();

  enrollments.push(enrollment);

  // _______________ emit events __________________

  emit("StudentEnrolled", {
    enrollmentId: enrollment.id,
    studentId: student.id,
    courseCode: course.code,
  });

  if (course.isAt80Percent()) {
    emit("CourseCapacityReached", {
      courseCode: course.code,
    });
  }

  if (course.isFull()) {
    emit("CourseFull", {
      courseCode: course.code,
    });
  }

  return enrollment;
}

export function cancelEnrollment(
  enrollment: Enrollment,
  student: Student,
  course: Course,
): void {
  if (!enrollment.isActive()) {
    throw new Error("Enrollment has already been cancelled");
  }

  enrollment.cancel();

  student.removeCredits(course.credits);
  course.removeStudent();

  emit("EnrollmentCancelled", {
    enrollmentId: enrollment.id,
  });
}
