import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as fs from 'fs';
import * as path from 'path';

interface RawLocalItem {
    id: string;
    name: string;
    type: string;
    description?: string;
    location: string;
    photos?: string[];
    reviewsOrAdvice?: string;
    rating?: number;
    price?: string;
    knownFor?: string;
    openingHours?: string;
    contactInfo?: string;
    amenities?: string[];
    checkInOut?: string;
    historicSignificance?: string;
    admissionFee?: string;
    gettingThere?: string;
    features?: string[];
}

const main = async () => {
    console.log("Migration started...");
    try {
        console.log("DEBUG: DATABASE_URL is:", process.env.DATABASE_URL);
        console.log("Extracting data from data.json...");
        const dataPath = path.join(__dirname, '../../data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const localItems: RawLocalItem[] = JSON.parse(rawData);
        console.log(`Found ${localItems.length} items to migrate.`);

        console.log("Transforming data...");
        const transformedData = localItems.map(item => ({
            id: item.id,
            name: item.name,
            type: item.type,
            description: item.description,
            location: item.location,
            photos: item.photos,
            reviewsOrAdvice: item.reviewsOrAdvice,
            rating: item.rating ? String(item.rating) : null,
            price: item.price,
            knownFor: item.knownFor,
            openingHours: item.openingHours,
            contactInfo: item.contactInfo,
            amenities: item.amenities,
            checkInOut: item.checkInOut,
            historicSignificance: item.historicSignificance,
            admissionFee: item.admissionFee,
            gettingThere: item.gettingThere,
            features: item.features,
        }));

        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const db = drizzle(pool, { schema });

        console.log("Deleting existing items from the database...");
        await db.delete(schema.items);

        console.log("Inserting new data into the database...");
        await db.insert(schema.items).values(transformedData);

        console.log("✅ Migration complete!");

        await pool.end();

    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
};

main();