import { db } from "./enrollment-handler.js"

db.prepare(
	`INSERT INTO students VALUES 
  ('STU-000001', 'alice@epita.fr', 12),
  ('STU-000002', 'bob@gmail.com', 18),
  ('STU-000003', 'charlie@epita.fr', 28)
`,
).run()

db.prepare(
	`INSERT INTO courses VALUES
  ('CS-101', 'Intro to Algorithms', 4, 2, 0),
  ('CS-201', 'Advanced JavaScript', 6, 40, 0),
  ('CS-301', 'Distributed Systems', 4, 20, 0)
`,
).run()

/** Decouple notifications

## What Specific Bad Practices to Include?

Here's my recommendation by priority:

### **Must Include** (Core teaching moments)
1. ✅ God Function with mixed concerns
2. ✅ Primitive obsession (no Value Objects)
3. ✅ Direct database access (no repositories)
4. ✅ Tight coupling (email in enrollment function)
5. ✅ Race condition potential

### **Should Include** (Good learning opportunities)
6. ✅ No domain language (business rules hidden in if statements)
7. ✅ Type casting hell (`as any` everywhere)
8. ✅ Generic error handling

### **Nice to Have** (Advanced lessons)
9. Magic numbers/strings scattered in code
10. No logging strategy
11. Synchronous everything (no async consideration)
12. No testing (hard to test due to tight coupling and god function)
13. No configuration management (hardcoded values)
14. No separation of concerns (everything in one file)
15. No use of modern JavaScript/TypeScript features (e.g., classes, interfaces, async/await)
*/
