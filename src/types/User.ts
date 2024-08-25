// src/types/api/User.ts

export class User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, email: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Example method: Get the user's full name (if you store first and last name separately)
    getFullName(): string {
        return this.name; // Assume `name` contains the full name, or you can split it into first/last name.
    }

    // Example method: Check if the user is active (based on certain criteria)
    isActive(): boolean {
        // Add your logic here. For example:
        const now = new Date();
        return this.updatedAt > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Active if updated in the last 30 days
    }

    // Example method: Update the user's email
    updateEmail(newEmail: string): void {
        this.email = newEmail;
    }
}
