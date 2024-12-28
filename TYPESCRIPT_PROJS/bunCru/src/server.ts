import { Elysia } from 'elysia';
import { db } from './database/db';
import { kdb } from './database/kdb';
import { Members, User } from './types';

const app = new Elysia()
//KPOP PART
  .post('/members', ({ body }) => {
    const { name, colorfav, age, animal, band } = body as Members;

    if (!name || !colorfav || !age || !animal || !band) {
      return {
        error: 'All fields are required',
        status: 400
      };
    }

    const newMember = kdb.createIdol({ name, colorfav, age, animal, band });
    return {
      member: newMember,
      status: 201
    };
  })

  // Get all members
  .get('/members', () => {
    return {
      members: kdb.findAll(),
      status: 200
    };
  })

  // Find by name
  .get('/members/name/:name', ({ params }) => {
    const member = kdb.findByName(params.name);

    if (!member) {
      return {
        error: 'Member not found',
        status: 404
      };
    }

    return {
      member,
      status: 200
    };
  })

  // Find by band
  .get('/members/band/:band', ({ params }) => {
    const member = kdb.findByBand(params.band);

    if (!member) {
      return {
        error: 'Member not found',
        status: 404
      };
    }
  })
//KPOP PART END
  .post('/users', ({ body }) => {
      const { name, email, bias, favGroup, fandomName } = body as Omit<User, 'id' | 'createdAt'>;

      // Basic validation
      if (!name || !email || !bias || !favGroup || !fandomName) {
        return {
          error: 'All fields (name, email, bias, favGroup, fandomName) are required',
          status: 400
        };
      }

      const newUser = db.create({ name, email, bias, favGroup, fandomName });
      return {
        user: newUser,
        status: 201
      };
    })

  .put('/users/:id', ({ params, body }) => {
    const { name, email, bias, favGroup, fandomName } = body as Partial<Omit<User, 'id' | 'createdAt'>>;
    const updatedUser = db.update(params.id, {
      name,
      email,
      bias,
      favGroup,
      fandomName
    });

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
