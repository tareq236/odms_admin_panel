# ODMS Admin Panel

## Technologies

Frontend: ReactJs, NextJs, TypeScript
Backend: Prisma ORM


## Run this project

Create `.env` file with following variables

```
DATABASE_URL="YOUR_DB_URL"
SESSION_SECRET=GENERATE_CODE_AND_ADD
NEXT_PUBLIC_GOOGLE_MAP_API=YOUR_GOOGLE_MAP_API_KEY
```

To generate `SESSION_SECRET` key,

```bash
    openssl rand -base64 32
```

```bash
npm install
npx prisma generate
```

To run on dev server,

```bash
npm run dev
```
