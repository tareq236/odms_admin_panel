import { getUser, verifyAutuser } from "@/lib/dal";
import db from "../../../../../../db/db";
import { formateDateDB } from "@/lib/formatters";
import { redirect } from "next/navigation";
import { getPermission } from "@/app/actions/permisson";

export const getDeliveryCollection = async ({
  searchParams,
  limit = 20,
}: {
  searchParams: { status: string; p: string; q: string; start: string };
  limit: number;
}) => {
  let count: any = [{ total: 0 }];
  let data: any[] | unknown = [];
  let error = undefined;

  const isPermitted = await getPermission(searchParams.q ?? null);

  try {
    if (isPermitted) {
      if (searchParams.q && searchParams.status) {
        // delivery done
        if (searchParams.status == "dd") {
          [data, count] = await Promise.all([
            db.$queryRaw`
            SELECT a.billing_date, a.billing_doc_no, 
            b.delivery_status, b.cash_collection_status,
            (b.return_amount) return_amount,
            (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
            c.partner, b.id,
            d.name1
            FROM rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
            INNER JOIN rpl_customer as d ON c.partner=d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status='Done'
            GROUP BY a.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
            db.$queryRaw`
            select count(*) over() as total from rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status='Done'
            GROUP BY a.billing_doc_no
            limit 1
          `,
          ]);
        }
        // delivery remaining
        else if (searchParams.status == "dr") {
          [data, count] = await Promise.all([
            db.$queryRaw`
            SELECT a.billing_date, a.billing_doc_no, 
            b.delivery_status, b.cash_collection_status,
            (b.return_amount) return_amount,
            (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
            c.partner, b.id,
            d.name1
            FROM rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
            INNER JOIN rpl_customer as d ON c.partner=d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status IS NULL
            GROUP BY a.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
            db.$queryRaw`
            select count(*) over() as total from rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status IS NULL
            GROUP BY a.billing_doc_no
            limit 1
          `,
          ]);
        }
        // collection done
        else if (searchParams.status == "cd") {
          [data, count] = await Promise.all([
            db.$queryRaw`
            SELECT a.billing_date, a.billing_doc_no, 
            b.delivery_status, b.cash_collection_status,
            (b.return_amount) return_amount,
            (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
            c.partner, b.id,
            d.name1
            FROM rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
            INNER JOIN rpl_customer as d ON c.partner=d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.cash_collection_status='done'
            GROUP BY a.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
            db.$queryRaw`
            select count(*) over() as total from rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.cash_collection_status='done'
            GROUP BY a.billing_doc_no
            limit 1
          `,
          ]);
        }
        // collection remaining
        else if (searchParams.status == "cr") {
          [data, count] = await Promise.all([
            db.$queryRaw`
            SELECT a.billing_date, a.billing_doc_no, 
            b.delivery_status, b.cash_collection_status,
            (b.return_amount) return_amount,
            (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
            c.partner, b.id,
            d.name1
            FROM rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
            INNER JOIN rpl_customer as d ON c.partner=d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status='done'
            AND b.cash_collection_status is null
            GROUP BY a.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
            db.$queryRaw`
            select count(*) over() as total from rdl_delivery_info_sap as a
            LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
            WHERE a.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND a.da_code = ${Number(searchParams.q) || 0} 
            AND b.delivery_status='done'
            AND b.cash_collection_status is null
            GROUP BY a.billing_doc_no
            limit 1
          `,
          ]);
        } else if (searchParams.status == "r") {
          [data, count] = await Promise.all([
            db.$queryRaw`
            select rd.id, rd.billing_date, rd.billing_doc_no, 
            rd.delivery_status, rd.cash_collection_status,
            rd.cash_collection, rd.due_amount, rd.net_val, 
            (rd.return_amount) return_amount,
            SUM(rds.return_quantity) return_quantity,
            SUM(rds.delivery_quantity) delivery_quantity,
            SUM(rds.quantity) quantity,
            rd.partner, 
            rc.name1
            FROM rdl_delivery rd
            INNER JOIN rdl_delivery_list rds ON rds.delivery_id = rd.id
            INNER JOIN rpl_customer rc ON rc.partner = rd.partner
            WHERE rd.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND rd.da_code = ${Number(searchParams.q) || 0} 
            AND rds.return_quantity > 0
            GROUP BY rd.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
            `,
            db.$queryRaw`
            select count(*) over() as total FROM rdl_delivery rd
            INNER JOIN rdl_delivery_list rds ON rds.delivery_id = rd.id
            INNER JOIN rpl_customer rc ON rc.partner = rd.partner
            WHERE rd.billing_date = ${
              searchParams.start
                ? `${searchParams.start}`
                : `${formateDateDB(new Date())}`
            } 
            AND rd.da_code = ${Number(searchParams.q) || 0}
            AND rds.return_quantity > 0
            GROUP BY rd.billing_doc_no
            limit 1
          `,
          ]);
        } else {
          [data, count] = await Promise.all([
            db.$queryRaw`
                SELECT a.billing_date, a.billing_doc_no, 
                b.delivery_status, b.cash_collection_status,
                (b.return_amount) return_amount,
                (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
                c.partner, b.id,
                d.name1
                FROM rdl_delivery_info_sap as a
                LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
                INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
                INNER JOIN rpl_customer as d ON c.partner=d.partner
                WHERE a.billing_date = ${
                  searchParams.start
                    ? `${searchParams.start}`
                    : `${formateDateDB(new Date())}`
                } 
                AND a.da_code = ${Number(searchParams.q) || 0} 
                GROUP BY a.billing_doc_no
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                  `,
            db.$queryRaw`
                select count(*) over() as total from rdl_delivery_info_sap
                where billing_date = ${
                  searchParams.start ? new Date(searchParams.start) : new Date()
                } 
                AND da_code = ${Number(searchParams.q) || 0}
                GROUP BY a.billing_doc_no
                limit 1
              `,
          ]);
        }
      } else if (searchParams.q) {
        [data, count] = await Promise.all([
          db.$queryRaw`
                SELECT a.billing_date, a.billing_doc_no, 
                b.delivery_status, b.cash_collection_status,
                (b.return_amount) return_amount,
                (b.cash_collection) cash_collection, (b.due_amount) due_amount, sum(c.net_val) + sum(c.vat) as net_val,
                c.partner, b.id,
                d.name1
                FROM rdl_delivery_info_sap as a
                LEFT JOIN rdl_delivery as b ON a.billing_doc_no = b.billing_doc_no
                INNER JOIN rpl_sales_info_sap as c ON a.billing_doc_no = c.billing_doc_no
                INNER JOIN rpl_customer as d ON c.partner=d.partner
                WHERE a.billing_date = ${
                  searchParams.start
                    ? `${searchParams.start}`
                    : `${formateDateDB(new Date())}`
                } 
                AND a.da_code = ${Number(searchParams.q) || 0} 
                GROUP BY a.billing_doc_no
                LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
                  `,
          db.$queryRaw`
                select count(*) over() as total from rdl_delivery_info_sap
                WHERE billing_date = ${
                  searchParams.start
                    ? `${searchParams.start}`
                    : `${formateDateDB(new Date())}`
                }
                AND da_code = ${Number(searchParams.q) || 0}
                GROUP BY billing_doc_no
                limit 1
              `,
        ]);
      }
    } else {
      data = [] as any[];
    }
  } catch (error) {
    data = [] as any[];
    console.log(error);
    error = (error as any).message.split("\n").pop();
  }

  return { data, count, error };
};
