import { Elysia } from 'elysia';
import { db } from './db';
import { User } from './types';

const app = new Elysia()
  // Create a new user
  .post('/users', ({ body }) => {
    const { name, email } = body as Omit<User, 'id' | 'createdAt'>;
    
    // Basic validation
    if (!name || !email) {
      return {
        error: 'Name and email are required',
        status: 400
      };
    }

    const newUser = db.create({ name, email });
    return {
      user: newUser,
      status: 201
    };
  })

  // Get all users
  .get('/users', () => {
    return {
      users: db.findAll(),
      status: 200
    };
  })

  // Get user by ID
  .get('/users/:id', ({ params }) => {
    const user = db.findById(params.id);
    
    if (!user) {
      return {
        error: 'User not found',
        status: 404
      };
    }

    return {
      user,
      status: 200
    };
  })

  // Update user
  .put('/users/:id', ({ params, body }) => {
    const { name, email } = body as Partial<Omit<User, 'id' | 'createdAt'>>;
    const updatedUser = db.update(params.id, { name, email });

    if (!updatedUser) {
      return {
        error: 'User not found',
        status: 404
      };
    }

    return {
      user: updatedUser,
      status: 200
    };
  })

  // Delete user
  .delete('/users/:id', ({ params }) => {
    const deleted = db.delete(params.id);

    if (!deleted) {
      return {
        error: 'User not found',
        status: 404
      };
    }

    return {
      message: 'User deleted successfully',
      status: 200
    };
  })
  .listen(3000);

console.log(`🦊 Server running at ${app.server?.hostname}:${app.server?.port}`);
