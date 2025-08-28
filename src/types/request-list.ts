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
  last_status: WithdrawalStatus;
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

export type WithdrawalStatus =
  | "request_pending"
  | "withdrawal_pending"
  | "withdrawal_approval"
  | "withdrawal_approved";

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

export interface WithdrawalConfirmation {
  invoice_no: string;
  mio_id: string;
  rm_id: string;
  da_id: string | null;
  depot_id: string | null;
  route_id: string | null;
  partner_id: string;
  request_approval: boolean;
  withdrawal_confirmation: boolean;
  replacement_order: boolean;
  order_approval: boolean;
  order_delivery: boolean;
  request_date: string | null;
  request_approval_date: string;
  withdrawal_date: string | null;
  withdrawal_approval_date: string | null;
  order_date: string | null;
  order_approval_date: string | null;
  delivery_date: string | null;
  last_status: WithdrawalStatus;
  da_name: string;
  da_mobile_no: string;
  partner_name: string;
  partner_address: string;
  partner_mobile_no: string;
  contact_person: string;
  materials: WithdrawalList[];
}

export interface WithdrawalList {
  matnr: string;
  material_name: string;
  batch: string;
  request_pack_qty: number;
  request_unit_qty: number;
  request_net_val: number;
  expire_date: string | Date;
  withdrawal_pack_qty: number;
  withdrawal_unit_qty: number;
  withdrawal_net_val: number;
}
