/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/Schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'ppostgresql://neondb_owner:lPQr4gUDjZ8B@ep-steep-fog-a1s7onh5.ap-southeast-1.aws.neon.tech/smart-irrigation-system?sslmode=require',
    }
  };