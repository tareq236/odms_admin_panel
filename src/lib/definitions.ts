export interface DeliveryTableProps {
    sap_id: number,
    full_name: string,        
    route: string,        
    billing_doc_no: string,
    billing_date: Date,
    vehicle_no: string,
    partner: string,
    gate_pass_no: string,
    description: string,
    total_net_val: number,
    total_quantity: number,
    total_tp: number,
    total_vat: number,
    total_count: any
}