import { verifyAuthuser } from "@/lib/dal";
import db from "../../../../../../db/db";
import { redirect } from "next/navigation";
import { hasDepotDa, odmsPanelAdminPermission } from "@/lib/permissions";
import { AuthUser } from "@/types/AuthUser";
import { formateDateDB } from "@/lib/formatters";

export const getDeliveryCollectionStats = async (searchParams: {
  start: string;
  q: string;
}) => {
  const startDate = searchParams.start
    ? `${searchParams.start}`
    : `${formateDateDB(new Date())}`;

  const daCode = Number(searchParams.q) || 0;

  const user = await verifyAuthuser();
  if (!user) redirect("/login");

  const isDepotDA = await hasDepotDa(daCode.toString(), user.depot as string);

  const isPermitted =
    odmsPanelAdminPermission(user as AuthUser) ||
    (isDepotDA && isDepotDA.length > 0);

  let data: any[];

  try {
    if (!isPermitted) return { data: [], error: null };
    data = await db.$queryRaw`
            SELECT COUNT(DISTINCT b.billing_doc_no) AS total_invoice,
                COUNT(
                    DISTINCT CASE
                        WHEN rd.delivery_status = 'Done' THEN b.billing_doc_no
                    END
                ) AS total_delivered,
                SUM(
                    CASE
                        WHEN rd.delivery_status = 'Done' THEN b.net_val + b.vat
                        ELSE 0
                    END
                ) AS total_delivered_done_amount,
                SUM(b.net_val + b.vat) AS total_amount,
                COUNT(
                    DISTINCT CASE
                        WHEN rd.cash_collection_status = 'Done' THEN b.billing_doc_no
                    END
                ) AS total_collection,
                COUNT(
                    DISTINCT CASE
                        WHEN rd.return_status = 1 THEN b.billing_doc_no
                    END
                ) AS total_return,
                (
                    select sum(c.return_amount)
                    FROM rdl_delivery c
                    WHERE c.billing_date = ${startDate}
                        AND c.da_code = ${daCode}
                        AND c.return_amount > 0
                    GROUP BY gate_pass_no
                ) as return_amount,
                SUM(
                    CASE
                        WHEN b.billing_type NOT IN ('ZD2', 'ZD4', 'zd2', 'zd4')
                        AND rd.due_amount > 0
                        AND rd.cash_collection = 0
                        AND rd.cash_collection_status = 'Done' THEN rd.due_amount
                        ELSE 0
                    END
                ) AS total_due_amount,
                COUNT(
                    DISTINCT CASE
                        WHEN b.billing_type NOT IN ('ZD2', 'ZD4', 'zd2', 'zd4')
                        AND rd.due_amount > 0
                        AND rd.cash_collection = 0
                        AND rd.cash_collection_status = 'Done' THEN b.billing_doc_no
                    END
                ) AS total_due,
                SUM(
                    case
                        WHEN rd.cash_collection_status = 'Done' then b.net_val + b.vat
                        ELSE 0
                    end
                ) AS collection_amount,
                -- cash_collection = collection_amount - due_amount
                SUM(
                    CASE
                        WHEN rd.cash_collection_status IS NULL
                        AND rd.delivery_status = 'Done'
                        AND b.billing_type NOT IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.net_val + b.vat
                        ELSE 0
                    END
                ) AS total_collection_remaining_amount,
                COUNT(
                    DISTINCT CASE
                        WHEN rd.cash_collection_status IS NULL
                        AND rd.delivery_status = 'Done'
                        AND b.billing_type NOT IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.billing_doc_no
                    END
                ) AS total_collection_remaining
                -- SUM(
                --     CASE
                --         WHEN b.billing_type IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.net_val + b.vat
                --         ELSE 0
                --     END
                -- ) AS total_credit_amount,
                -- COUNT(
                --     DISTINCT CASE
                --         WHEN b.billing_type IN ('ZD2', 'ZD4', 'zd2', 'zd4') THEN b.billing_doc_no
                --     END
                -- ) AS total_credit
            FROM rdl_delivery_info_sap AS a
                INNER JOIN rpl_sales_info_sap AS b ON a.billing_doc_no = b.billing_doc_no
                LEFT JOIN rdl_delivery rd ON rd.billing_doc_no = a.billing_doc_no
            WHERE a.billing_date = ${startDate}
                AND a.da_code = ${daCode}
        
        `;
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error: (error as Error).message.split(`\n`).pop(),
    };
  }
};
