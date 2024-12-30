import { Prisma } from "@/prisma/generated/client1";
import db from "../../../../../../db/db";

export const getPartnerDeliveryStats = async ({
  limit = 20,
  searchParams,
}: {
  limit?: number;
  searchParams: {
    p: string;
    q: string;
    sorting: string;
  };
}) => {
  let count: any = [{ total: 0 }];
  let data;
  let connectionError = false;

  try {
    if (searchParams.q) {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
              SELECT rds.partner_id, rc.name1, 
              (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
              ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
              IFNULL((SUM(rds.total_collection) / SUM(rds.total_net_val) * 100),0) full_payment_percentage,
              IFNULL((SUM(rds.total_due) / SUM(rds.total_net_val) * 100),0) due_percentage
              FROM rdl_delivery_stats rds
              INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
              WHERE rds.partner_id = ${Number(searchParams.q) || 0}
              GROUP BY rds.partner_id
              ORDER BY ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) ASC    
            `,
        ),
        db.$queryRaw`
          SELECT COUNT(DISTINCT rds.partner_id) total
          FROM rdl_delivery_stats rds
          WHERE rds.partner_id = ${Number(searchParams.q) || 0}
          GROUP BY rds.partner_id
        `,
      ]);
    } else if (searchParams.sorting) {
      switch (searchParams.sorting) {
        case "ret":
          [data, count] = await Promise.all([
            db.$queryRaw(
              Prisma.sql`
                  SELECT rds.partner_id, rc.name1, 
                  (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
                  ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
                  IFNULL((SUM(rds.total_collection) / SUM(rds.total_net_val) * 100),0) full_payment_percentage,
                  IFNULL((SUM(rds.total_due) / SUM(rds.total_net_val) * 100),0) due_percentage
                  FROM rdl_delivery_stats rds
                  INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
                  GROUP BY rds.partner_id
                  ORDER BY ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) ASC
                  LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        
                `,
            ),
            db.$queryRaw`
              SELECT COUNT(DISTINCT rds.partner_id) total
              FROM rdl_delivery_stats rds
            `,
          ]);
          break;

        case "full":
          [data, count] = await Promise.all([
            db.$queryRaw(
              Prisma.sql`
                  SELECT rds.partner_id, rc.name1, 
                  (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
                  ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
                  IFNULL((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100,0) full_payment_percentage,
                  IFNULL(ABS((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100) - 100,0) due_percentage
                  FROM rdl_delivery_stats rds
                  INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
                  GROUP BY rds.partner_id
                  ORDER BY IFNULL((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100,0) DESC
                  LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        
                `,
            ),
            db.$queryRaw`
              SELECT COUNT(DISTINCT rds.partner_id) total
              FROM rdl_delivery_stats rds
            `,
          ]);
          break;

        case "due":
          [data, count] = await Promise.all([
            db.$queryRaw(
              Prisma.sql`
                    SELECT rds.partner_id, rc.name1, 
                    (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
                    ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
                    IFNULL((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100,0) full_payment_percentage,
                    IFNULL(ABS(((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val)) - 1) * 100 ,0) due_percentage
                    FROM rdl_delivery_stats rds
                    INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
                    GROUP BY rds.partner_id
                    ORDER BY IFNULL(ABS(((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val)) - 1) * 100 ,0) asc
                    LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
          
                  `,
            ),
            db.$queryRaw`
                SELECT COUNT(DISTINCT rds.partner_id) total
                FROM rdl_delivery_stats rds
              `,
          ]);
          break;

        default:
          [data, count] = await Promise.all([
            db.$queryRaw(
              Prisma.sql`
                  SELECT rds.partner_id, rc.name1, 
                  (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
                  ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
                  IFNULL((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100,0) full_payment_percentage,
                  IFNULL(ABS((SUM(rds.total_collection) + SUM(rds.total_due)) / SUM(rds.total_net_val) * 100) - 100,0) due_percentage
                  FROM rdl_delivery_stats rds
                  INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
                  GROUP BY rds.partner_id
                  ORDER BY (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) ASC
                  LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
        
                `,
            ),
            db.$queryRaw`
              SELECT COUNT(DISTINCT rds.partner_id) total
              FROM rdl_delivery_stats rds
            `,
          ]);
          break;
      }
    } else {
      [data, count] = await Promise.all([
        db.$queryRaw(
          Prisma.sql`
            SELECT rds.partner_id, rc.name1, 
            (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) total_return_percentage,
            ABS((sum(rds.total_return_quantity) / sum(rds.total_quantity) - 1) * 100) total_received_percentage,
            IFNULL((SUM(rds.total_collection) / SUM(rds.total_net_val) * 100),0) full_payment_percentage,
            IFNULL((SUM(rds.total_due) / SUM(rds.total_net_val) * 100),0) due_percentage
            FROM rdl_delivery_stats rds
            INNER JOIN rpl_customer rc ON rds.partner_id = rc.partner
            GROUP BY rds.partner_id
            ORDER BY (sum(rds.total_return_quantity) / sum(rds.total_quantity) * 100) ASC
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
  
          `,
        ),
        db.$queryRaw`
        SELECT COUNT(DISTINCT rds.partner_id) total
        FROM rdl_delivery_stats rds
      `,
      ]);
    }
  } catch (error) {
    data = [] as any[];
    connectionError = true;
    console.log(error);
  }
  return { data, connectionError, count };
};
