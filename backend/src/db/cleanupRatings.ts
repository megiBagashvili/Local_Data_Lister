import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { eq, count } from 'drizzle-orm';

const main = async () => {
  console.log("Starting rating cleanup process...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  try {
    const allItems = await db.query.items.findMany();
    console.log(`Found ${allItems.length} items to check.`);
    let updatedCount = 0;

    for (const item of allItems) {
      const reviewCountResult = await db.select({
          count: count(),
        })
        .from(schema.reviews)
        .where(eq(schema.reviews.itemId, item.id));
      
      const reviewCount = reviewCountResult[0].count;

      if (reviewCount === 0 && item.rating !== null) {
        console.log(`Item "${item.name}" has no reviews but has a rating of ${item.rating}. Resetting to null.`);
        
        await db.update(schema.items)
          .set({ rating: null })
          .where(eq(schema.items.id, item.id));
        
        updatedCount++;
      }
    }

    console.log(`\n✅ Cleanup complete. Updated ${updatedCount} item(s).`);

  } catch (error) {
    console.error("❌ An error occurred during the cleanup process:", error);
  } finally {
    await pool.end();
  }
};

main();
