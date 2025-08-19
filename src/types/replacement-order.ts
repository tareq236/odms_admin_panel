export interface ReplacementOrder {
  invoice_no: string;
  mio_id: string;
  rm_id: string;
  depot_id: string;
  route_id: string;
  route_name: string;
  partner_id: string;
  partner_name: string;
  partner_address: string;
  partner_mobile_no: string;
  contact_person: string;
  order_date: string;
  order_approval_date: string;
  delivery_da_id: string | null;
  last_status: OrderStatus;
}

export type OrderStatus =
  | "replacement_approved"
  | "delivered"
  | "delivery_pending";

export interface OrderList {
  matnr: string;
  material_name: string;
  pack_qty: number;
  unit_qty: number;
  net_val: number;
}

export interface ReplacementOrderWithMatnr extends ReplacementOrder {
  materials: OrderList[];
}
