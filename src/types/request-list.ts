export interface RequestlistDetails {
  id: number;
  invoice_no: string;
  mio_id: string;
  rm_id: string;
  da_id: number | null;
  depot_id: string;
  route_id: string;
  partner_id: string;
  request_approval: 1 | 0;
  withdrawal_confirmation: 1 | 0;
  replacement_order: 1 | 0;
  order_approval: 1 | 0;
  order_delivery: 1 | 0;
  request_date: string | null;
  request_approval_date: string | null;
  withdrawal_date: string | null;
  withdrawal_approval_date: string | null;
  order_date: string | null;
  order_approval_date: string | null;
  delivery_date: string | null;
  last_status: "request_approved" | "request_pending";
  invoice_type: string;
  mio_name: string;
  mio_mobile: string;
  rm_name: string;
  rm_mobile: string;
  partner_name: string;
  customer_name: string;
  customer_number: string;
  customer_address: string;
  depot_name: string;
  route_name: string;
  da_name: null | string;
  da_mobile: null | string;
  request_list: Requestlist[];
}

export interface Requestlist {
  list_id: 27;
  matnr: string;
  material_name: string;
  producer_company: string;
  batch: string;
  pack_qty: number;
  strip_qty: number;
  unit_qty: number;
  net_val: number;
  unit_tp: number;
  unit_vat: number;
  expire_date: string;
}
