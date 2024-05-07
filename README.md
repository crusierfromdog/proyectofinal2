# Second leg

## How to test

- Copy the .env.example and rename as .env, set the MONGO_URL to the atlas endpoint I'll share via PM.

- App is using LTS Node.JS version (20.12.2)
- Install pnpm (npm i -g pnpm)
- Run pnpm install
- Run pnpm run seed to create products and users (warning: this is not idempotent)
- Run pnpm run dev to setup dev server

**User is hardcoded inside sessionMiddleware, if you start with a server from scratch, please change
this id to one of your created users.**

- Frontend is managed using React and Server Side Rendering (this was a lucky shot, not everything is implemented)



