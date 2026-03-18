import { StudentId, Email, Credits } from "./brandedTypes.ts";

export class Student {
    //  private properties so nobody can break the invariants
  private _id: StudentId; // entity identity
  private _name: string;
  private _email: Email;
  private _enrolledCredits: number;

  private static MAX_CREDITS = 18;

  constructor(

    // two studetns can have same anme but different IDs
    id: StudentId,
    name: string,
    email: Email,
    enrolledCredits: number = 0,
  ) {
    if (enrolledCredits > Student.MAX_CREDITS) {
      throw new Error("Student cannot start with more than 18 credits");
    }

    this._id = id;
    this._name = name;
    this._email = email;
    this._enrolledCredits = enrolledCredits;
  }

  // _____________ GETTERS ________________

  get id(): StudentId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get enrolledCredits(): number {
    return this._enrolledCredits;
  }

  // _____________ Domain Logic ________________

  canEnroll(credits: Credits): boolean {
    return this._enrolledCredits + credits <= Student.MAX_CREDITS;
  }

  addCredits(credits: Credits): void {
    if (!this.canEnroll(credits)) {
      throw new Error("Credit limit exceeded maximum 18");
    }

    this._enrolledCredits += credits;
  }

  removeCredits(credits: Credits): void {
    if (this._enrolledCredits - credits < 0) {
      throw new Error("Cannot remove more credits than enrolled");
    }

    this._enrolledCredits -= credits;
  }
}
