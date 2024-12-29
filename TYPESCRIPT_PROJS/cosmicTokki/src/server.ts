import { serve } from "bun";
import { User } from './types';
import { db } from './database/db';
import { kdb } from './database/kdb';
import { Members } from './types';

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    // Helper function to parse JSON body
    async function parseBody() {
      try {
        return await req.json();
      } catch (e) {
        return null;
      }
    }

    // Helper function to send JSON response
    function jsonResponse(data: any, status = 200) {
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status,
      });
    }

    // KPOP ROUTES
    if (url.pathname === '/members' && method === 'POST') {
      const body = await parseBody() as Members;
      if (!body?.name || !body?.colorfav || !body?.age || !body?.animal || !body?.band) {
        return jsonResponse({ error: 'All fields are required' }, 400);
      }
      const newMember = kdb.createIdol(body);
      return jsonResponse({ member: newMember, status: 201 }, 201);
    }

    if (url.pathname === '/members' && method === 'GET') {
      return jsonResponse({ members: kdb.findAll(), status: 200 });
    }

    if (url.pathname.startsWith('/members/name/') && method === 'GET') {
      const name = url.pathname.split('/members/name/')[1];
      const member = kdb.findByName(name);
      if (!member) {
        return jsonResponse({ error: 'Member not found' }, 404);
      }
      return jsonResponse({ member, status: 200 });
    }

    if (url.pathname.startsWith('/members/band/') && method === 'GET') {
      const band = url.pathname.split('/members/band/')[1];
      const member = kdb.findByBand(band);
      if (!member) {
        return jsonResponse({ error: 'Member not found' }, 404);
      }
      return jsonResponse({ member, status: 200 });
    }

    // USER ROUTES
    if (url.pathname === '/users' && method === 'POST') {
      const body = await parseBody();
      if (!body?.name || !body?.email || !body?.bias || !body?.favGroup || !body?.fandomName) {
        return jsonResponse({
          error: 'All fields (name, email, bias, favGroup, fandomName) are required'
        }, 400);
      }
      const newUser = db.create(body);
      return jsonResponse({ user: newUser, status: 201 }, 201);
    }

    if (url.pathname === '/users' && method === 'GET') {
      return jsonResponse({ users: db.findAll(), status: 200 });
    }

    if (url.pathname.startsWith('/users/') && method === 'GET') {
      const id = url.pathname.split('/users/')[1];
      const user = db.findById(id);
      if (!user) {
        return jsonResponse({ error: 'User not found' }, 404);
      }
      return jsonResponse({ user, status: 200 });
    }

    if (url.pathname.startsWith('/users/') && method === 'PUT') {
      const id = url.pathname.split('/users/')[1];
      const body = await parseBody();
      const updatedUser = db.update(id, body);
      if (!updatedUser) {
        return jsonResponse({ error: 'User not found' }, 404);
      }
      return jsonResponse({ user: updatedUser, status: 200 });
    }

    if (url.pathname.startsWith('/users/') && method === 'DELETE') {
      const id = url.pathname.split('/users/')[1];
      const deleted = db.delete(id);
      if (!deleted) {
        return jsonResponse({ error: 'User not found' }, 404);
      }
      return jsonResponse({ message: 'User deleted successfully', status: 200 });
    }

    // 404 for unmatched routes
    return jsonResponse({ error: 'Not Found' }, 404);
  },
});

console.log(`🦊 Server running at http://localhost:${server.port}`);
