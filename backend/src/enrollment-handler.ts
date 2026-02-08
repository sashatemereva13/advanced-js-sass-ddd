import Database from "better-sqlite3"

export const db: Database.Database = new Database("university.db")

// Initialize tables (no migrations, just raw SQL)
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    email TEXT,
    total_credits INTEGER
  );
  
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    name TEXT,
    credits INTEGER,
    capacity INTEGER,
    enrolled INTEGER DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS enrollments (
    student_id TEXT,
    course_id TEXT,
    PRIMARY KEY (student_id, course_id)
  );
`)

// THE GOD FUNCTION - Everything in one place!
export function enrollStudentInCourse(studentId: string, courseId: string) {
	// Validation mixed with business logic
	if (!studentId.startsWith("STU-")) {
		throw new Error("Invalid student ID")
	}

	// Direct database access
	const student = db
		.prepare("SELECT * FROM students WHERE id = ?")
		.get(studentId)
	if (!student) {
		throw new Error("Student not found")
	}

	// Type casting hell (TypeScript can't help us here)
	const studentEmail = (student as any).email
	if (!studentEmail.endsWith("@epita.fr")) {
		throw new Error("Invalid email")
	}

	const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(courseId)
	if (!course) {
		throw new Error("Course not found")
	}

	// Business logic scattered
	const currentCredits = (student as any).total_credits
	const courseCredits = (course as any).credits

	if (currentCredits + courseCredits > 30) {
		throw new Error("Too many credits")
	}

	// Race condition potential!
	const enrolled = (course as any).enrolled
	const capacity = (course as any).capacity

	if (enrolled >= capacity) {
		throw new Error("Course full")
	}

	// No transaction - things can go wrong between these!
	db.prepare("INSERT INTO enrollments VALUES (?, ?)").run(studentId, courseId)
	db.prepare("UPDATE courses SET enrolled = enrolled + 1 WHERE id = ?").run(
		courseId,
	)
	db.prepare(
		"UPDATE students SET total_credits = total_credits + ? WHERE id = ?",
	).run(courseCredits, studentId)

	// Notification coupled to enrollment
	sendEmail(studentEmail, "You are enrolled!")
	logToAdminConsole(`${studentId} enrolled in ${courseId}`)

	return { success: true }
}

function sendEmail(to: string, message: string) {
	console.log(`📧 Sending email to ${to}: ${message}`)
	// In real life, this would be an API call that could fail
}

function logToAdminConsole(message: string) {
	console.log(`🔔 ADMIN: ${message}`)
}
