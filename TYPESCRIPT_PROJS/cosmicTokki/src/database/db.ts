import { randomUUID } from 'crypto';
import { Database } from "bun:sqlite";
import { User } from '../types';

class SqliteDatabase {
  private db: Database;

  constructor() {
    this.db = new Database("mydb.sqlite");
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // Create users table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        bias TEXT NOT NULL,
        favGroup TEXT NOT NULL,
        fandomName TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);
  }

  create(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser = {
      id: randomUUID(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    const stmt = this.db.prepare(`
      INSERT INTO users (id, name, email, bias, favGroup, fandomName, createdAt)
      VALUES ($id, $name, $email, $bias, $favGroup, $fandomName, $createdAt)
    `);

    stmt.run({
      $id: newUser.id,
      $name: newUser.name,
      $email: newUser.email,
      $bias: newUser.bias,
      $favGroup: newUser.favGroup,
      $fandomName: newUser.fandomName,
      $createdAt: newUser.createdAt
    });

    return newUser;
  }

  findAll(): User[] {
    const query = this.db.prepare('SELECT * FROM users');
    return query.all() as User[];
  }

  findById(id: string): User | undefined {
    const query = this.db.prepare('SELECT * FROM users WHERE id = ?');
    const user = query.get(id) as User | undefined;
    return user;
  }

  update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    // First check if user exists
    const existingUser = this.findById(id);
    if (!existingUser) return null;

    // Build the UPDATE query dynamically based on provided fields
    const updates: string[] = [];
    const params: any = { $id: id };

    if (userData.name !== undefined) {
      updates.push('name = $name');
      params.$name = userData.name;
    }
    if (userData.email !== undefined) {
      updates.push('email = $email');
      params.$email = userData.email;
    }
    if (userData.bias !== undefined) {
      updates.push('bias = $bias');
      params.$bias = userData.bias;
    }
    if (userData.favGroup !== undefined) {
      updates.push('favGroup = $favGroup');
      params.$favGroup = userData.favGroup;
    }
    if (userData.fandomName !== undefined) {
      updates.push('fandomName = $fandomName');
      params.$fandomName = userData.fandomName;
    }

    if (updates.length > 0) {
      const updateQuery = `
        UPDATE users 
        SET ${updates.join(', ')}
        WHERE id = $id
      `;
      
      const stmt = this.db.prepare(updateQuery);
      stmt.run(params);
    }

    return this.findById(id) || null;
  }

  delete(id: string): boolean {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  deleteAll(): number {
    const stmt = this.db.prepare('DELETE FROM users');
    const result = stmt.run();
    return result.changes;
  }

  // Optional: Add method to close database connection
  close() {
    this.db.close();
  }
}

export const db = new SqliteDatabase();
