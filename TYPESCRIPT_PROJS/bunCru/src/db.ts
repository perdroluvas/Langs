import { randomUUID } from 'crypto';
import { User } from './types';

class InMemoryDatabase {
  private users: User[] = [];

  create(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      id: randomUUID(),
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser); 
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }


  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData
    };          

    return this.users[userIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length < initialLength;
  }
  deleteAll(): number {
    const count = this.users.length;
    this.users = []; // Clear the entire array
    return count;
  }
}

export const db = new InMemoryDatabase();
