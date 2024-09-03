export interface DeliveryTableProps {
    sap_id: number,
    full_name: string,
    route: string,
    partner: string,
    partner_name: string,
    description: string,
    billing_doc_no: string,
    billing_date: Date,
    vehicle_no: string,
    gate_pass_no: string,
    total_net_val: number,
    total_quantity: number,
    total_tp: number,
    total_count: any,
    total_vat: number
}