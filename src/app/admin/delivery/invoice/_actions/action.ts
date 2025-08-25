"use server";

import db from "../../../../../../db/db";
import { format } from "date-fns";
import { odmsPanelAdminPermission } from "@/lib/permissions";
import { AuthUser } from "@/types/AuthUser";

export const getInvoiceInfo = async ({
  searchParams,
  user,
  limit,
}: {
  searchParams: { p: string; q: string; start: string };
  user: AuthUser;
  limit: number;
}) => {
  let count: any = [{ total: 0 }];
  let connectionError = false;
  let data;

  try {
    if (searchParams.q) {
      if (odmsPanelAdminPermission(user)) {
        [data, count] = await Promise.all([
          db.$queryRaw`
            SELECT a.*,
            COUNT(b.billing_doc_no) as no_of_bill , b.gate_pass_no,
            SUM(b.quantity) as total_quantity, 
            SUM(b.vat) as total_vat, SUM(b.net_val) as total_net_val, 
            sum(b.tp) as total_tp,
            c.description address, d.name1 partner_name
            FROM rdl_delivery_info_sap as a
            INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
            INNER JOIN rdl_route_sap as c on a.route = c.route
            INNER JOIN rpl_customer as d ON b.partner = d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND a.da_code = ${Number(searchParams.q) || 0}
            GROUP BY b.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,

          db.$queryRaw`
            select count(*) as total from rdl_delivery_info_sap a
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND da_code = ${Number(searchParams.q) || 0}
          `,
        ]);
      } else {
        [data, count] = await Promise.all([
          db.$queryRaw`
            SELECT a.*,
            COUNT(b.billing_doc_no) as no_of_bill , b.gate_pass_no,
            SUM(b.quantity) as total_quantity, 
            SUM(b.vat) as total_vat, SUM(b.net_val) as total_net_val, 
            sum(b.tp) as total_tp,
            c.description address, d.name1 partner_name
            FROM rdl_delivery_info_sap as a
            INNER JOIN rpl_sales_info_sap as b on a.billing_doc_no = b.billing_doc_no
            INNER JOIN rdl_route_sap as c on a.route = c.route
            INNER JOIN rpl_customer as d ON b.partner = d.partner
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND a.da_code = ${Number(searchParams.q) || 0}
            AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
              depot_code = ${user.depot}
            )
            GROUP BY b.billing_doc_no
            LIMIT ${(Number(searchParams.p || 1) - 1) * limit}, ${limit}
              `,

          db.$queryRaw`
            select count(*) as total from rdl_delivery_info_sap a
            WHERE a.billing_date = ${
              searchParams.start
                ? searchParams.start
                : format(new Date(), "yyyy-MM-dd")
            } 
            AND da_code = ${Number(searchParams.q) || 0}
            AND a.route IN (
            SELECT route_code
            FROM rdl_route_wise_depot
            WHERE
                depot_code = ${user.depot}
            )
          `,
        ]);
      }
    } else {
      data = [];
    }

    console.log(count);
  } catch (error) {
    data = [] as any[];
    connectionError = true;
  }

  return { data, connectionError, count };
};
