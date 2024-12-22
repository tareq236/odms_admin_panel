
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.18.0
 * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
 */
Prisma.prismaVersion = {
  client: "5.18.0",
  engine: "4c784e32044a8a016d99474bd02a3b6123742169"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Exf_customer_locationScalarFieldEnum = {
  id: 'id',
  work_area_t: 'work_area_t',
  customer_id: 'customer_id',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_admin_user_listScalarFieldEnum = {
  id: 'id',
  user_name: 'user_name',
  full_name: 'full_name',
  mobile_number: 'mobile_number',
  password: 'password',
  status: 'status',
  role: 'role',
  deport_code: 'deport_code',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_attendanceScalarFieldEnum = {
  id: 'id',
  start_date_time: 'start_date_time',
  end_date_time: 'end_date_time',
  late_time_min: 'late_time_min',
  over_time_min: 'over_time_min',
  attendance_type: 'attendance_type',
  start_latitude: 'start_latitude',
  start_longitude: 'start_longitude',
  end_latitude: 'end_latitude',
  end_longitude: 'end_longitude',
  start_image: 'start_image',
  end_image: 'end_image',
  created_at: 'created_at',
  updated_at: 'updated_at',
  sap_id: 'sap_id'
};

exports.Prisma.Rdl_auth_groupScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.Rdl_auth_group_permissionsScalarFieldEnum = {
  id: 'id',
  group_id: 'group_id',
  permission_id: 'permission_id'
};

exports.Prisma.Rdl_auth_permissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content_type_id: 'content_type_id',
  codename: 'codename'
};

exports.Prisma.Rdl_auth_userScalarFieldEnum = {
  id: 'id',
  password: 'password',
  last_login: 'last_login',
  is_superuser: 'is_superuser',
  username: 'username',
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  is_staff: 'is_staff',
  is_active: 'is_active',
  date_joined: 'date_joined'
};

exports.Prisma.Rdl_auth_user_groupsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  group_id: 'group_id'
};

exports.Prisma.Rdl_auth_user_user_permissionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  permission_id: 'permission_id'
};

exports.Prisma.Rdl_deliveryScalarFieldEnum = {
  id: 'id',
  gate_pass_no: 'gate_pass_no',
  billing_doc_no: 'billing_doc_no',
  billing_date: 'billing_date',
  partner: 'partner',
  da_code: 'da_code',
  vehicle_no: 'vehicle_no',
  route_code: 'route_code',
  transport_type: 'transport_type',
  delivery_status: 'delivery_status',
  cash_collection_status: 'cash_collection_status',
  last_status: 'last_status',
  net_val: 'net_val',
  cash_collection: 'cash_collection',
  due_amount: 'due_amount',
  return_amount: 'return_amount',
  return_status: 'return_status',
  delivery_date_time: 'delivery_date_time',
  return_date_time: 'return_date_time',
  cash_collection_date_time: 'cash_collection_date_time',
  delivery_latitude: 'delivery_latitude',
  delivery_longitude: 'delivery_longitude',
  cash_collection_latitude: 'cash_collection_latitude',
  cash_collection_longitude: 'cash_collection_longitude',
  return_latitude: 'return_latitude',
  return_longitude: 'return_longitude',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_delivery_info_sapScalarFieldEnum = {
  billing_doc_no: 'billing_doc_no',
  billing_date: 'billing_date',
  delv_no: 'delv_no',
  route: 'route',
  vehicle_no: 'vehicle_no',
  da_code: 'da_code',
  da_name: 'da_name',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_delivery_listScalarFieldEnum = {
  id: 'id',
  matnr: 'matnr',
  batch: 'batch',
  quantity: 'quantity',
  tp: 'tp',
  vat: 'vat',
  net_val: 'net_val',
  delivery_quantity: 'delivery_quantity',
  delivery_net_val: 'delivery_net_val',
  return_quantity: 'return_quantity',
  return_net_val: 'return_net_val',
  created_at: 'created_at',
  updated_at: 'updated_at',
  delivery_id: 'delivery_id'
};

exports.Prisma.Rdl_django_admin_logScalarFieldEnum = {
  id: 'id',
  action_time: 'action_time',
  object_id: 'object_id',
  object_repr: 'object_repr',
  action_flag: 'action_flag',
  change_message: 'change_message',
  content_type_id: 'content_type_id',
  user_id: 'user_id'
};

exports.Prisma.Rdl_django_content_typeScalarFieldEnum = {
  id: 'id',
  app_label: 'app_label',
  model: 'model'
};

exports.Prisma.Rdl_django_migrationsScalarFieldEnum = {
  id: 'id',
  app: 'app',
  name: 'name',
  applied: 'applied'
};

exports.Prisma.Rdl_django_sessionScalarFieldEnum = {
  session_key: 'session_key',
  session_data: 'session_data',
  expire_date: 'expire_date'
};

exports.Prisma.Rdl_route_sapScalarFieldEnum = {
  route: 'route',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_user_listScalarFieldEnum = {
  sap_id: 'sap_id',
  full_name: 'full_name',
  mobile_number: 'mobile_number',
  user_type: 'user_type',
  password: 'password',
  created_at: 'created_at',
  updated_at: 'updated_at',
  status: 'status',
  id: 'id'
};

exports.Prisma.Rpl_customerScalarFieldEnum = {
  partner: 'partner',
  name1: 'name1',
  name2: 'name2',
  contact_person: 'contact_person',
  street: 'street',
  street1: 'street1',
  street2: 'street2',
  street3: 'street3',
  post_code: 'post_code',
  upazilla: 'upazilla',
  district: 'district',
  mobile_no: 'mobile_no',
  email: 'email',
  drug_reg_no: 'drug_reg_no',
  customer_grp: 'customer_grp',
  trans_p_zone: 'trans_p_zone',
  created_on: 'created_on',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rpl_customer_sales_orgScalarFieldEnum = {
  partner: 'partner',
  company_code: 'company_code',
  sales_org: 'sales_org',
  del_plant: 'del_plant',
  pre_cust_code: 'pre_cust_code',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rpl_customer_territoryScalarFieldEnum = {
  id: 'id',
  partner: 'partner',
  team: 'team',
  work_area: 'work_area',
  start_date: 'start_date',
  end_date: 'end_date',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rpl_materialScalarFieldEnum = {
  id: 'id',
  matnr: 'matnr',
  plant: 'plant',
  sales_org: 'sales_org',
  dis_channel: 'dis_channel',
  material_name: 'material_name',
  producer_company: 'producer_company',
  team1: 'team1',
  pack_size: 'pack_size',
  unit_tp: 'unit_tp',
  unit_vat: 'unit_vat',
  mrp: 'mrp',
  brand_name: 'brand_name',
  brand_description: 'brand_description',
  active: 'active',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rpl_sales_info_sapScalarFieldEnum = {
  billing_doc_no: 'billing_doc_no',
  billing_type: 'billing_type',
  sales_org: 'sales_org',
  billing_date: 'billing_date',
  company_code: 'company_code',
  net_val: 'net_val',
  created_on: 'created_on',
  partner: 'partner',
  assigment: 'assigment',
  matnr: 'matnr',
  quantity: 'quantity',
  territory_code: 'territory_code',
  gate_pass_no: 'gate_pass_no',
  plant: 'plant',
  team: 'team',
  refrence: 'refrence',
  order_type: 'order_type',
  tp: 'tp',
  batch: 'batch',
  item_category: 'item_category',
  cancel: 'cancel',
  sales_type: 'sales_type',
  vat: 'vat',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Synchronize_logScalarFieldEnum = {
  id: 'id',
  remort_table_name: 'remort_table_name',
  error: 'error',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Synchronize_log_listScalarFieldEnum = {
  id: 'id',
  synchronize_log_id: 'synchronize_log_id',
  remort_table_name: 'remort_table_name',
  id_number: 'id_number',
  error: 'error',
  full_data: 'full_data',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Synchronize_settingScalarFieldEnum = {
  id: 'id',
  sync_name: 'sync_name',
  sync_table_name: 'sync_table_name',
  sync_db: 'sync_db',
  order_by: 'order_by',
  sync_table_primary_key: 'sync_table_primary_key',
  sync_limit: 'sync_limit',
  sync_packet_size: 'sync_packet_size',
  sync_query: 'sync_query',
  sync_row_number_query: 'sync_row_number_query',
  local_table_name: 'local_table_name',
  local_table_primary_key: 'local_table_primary_key',
  fields_name: 'fields_name',
  sync_smart_type: 'sync_smart_type',
  sync_smart_query: 'sync_smart_query',
  type: 'type',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Auth_groupScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.Auth_group_permissionsScalarFieldEnum = {
  id: 'id',
  group_id: 'group_id',
  permission_id: 'permission_id'
};

exports.Prisma.Auth_permissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content_type_id: 'content_type_id',
  codename: 'codename'
};

exports.Prisma.Auth_userScalarFieldEnum = {
  id: 'id',
  password: 'password',
  last_login: 'last_login',
  is_superuser: 'is_superuser',
  username: 'username',
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  is_staff: 'is_staff',
  is_active: 'is_active',
  date_joined: 'date_joined'
};

exports.Prisma.Auth_user_groupsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  group_id: 'group_id'
};

exports.Prisma.Auth_user_user_permissionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  permission_id: 'permission_id'
};

exports.Prisma.Django_admin_logScalarFieldEnum = {
  id: 'id',
  action_time: 'action_time',
  object_id: 'object_id',
  object_repr: 'object_repr',
  action_flag: 'action_flag',
  change_message: 'change_message',
  content_type_id: 'content_type_id',
  user_id: 'user_id'
};

exports.Prisma.Django_content_typeScalarFieldEnum = {
  id: 'id',
  app_label: 'app_label',
  model: 'model'
};

exports.Prisma.Django_migrationsScalarFieldEnum = {
  id: 'id',
  app: 'app',
  name: 'name',
  applied: 'applied'
};

exports.Prisma.Django_sessionScalarFieldEnum = {
  session_key: 'session_key',
  session_data: 'session_data',
  expire_date: 'expire_date'
};

exports.Prisma.Rdl_conveyanceScalarFieldEnum = {
  id: 'id',
  da_code: 'da_code',
  start_journey_latitude: 'start_journey_latitude',
  start_journey_longitude: 'start_journey_longitude',
  end_journey_latitude: 'end_journey_latitude',
  end_journey_longitude: 'end_journey_longitude',
  start_journey_date_time: 'start_journey_date_time',
  end_journey_date_time: 'end_journey_date_time',
  transport_mode: 'transport_mode',
  transport_cost: 'transport_cost',
  journey_status: 'journey_status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_delivery_statsScalarFieldEnum = {
  id: 'id',
  partner_id: 'partner_id',
  total_collection: 'total_collection',
  total_delivered: 'total_delivered',
  total_due: 'total_due',
  total_net_val: 'total_net_val',
  total_quantity: 'total_quantity',
  total_return_quantity: 'total_return_quantity',
  return_percentage: 'return_percentage',
  received_percentage: 'received_percentage',
  delivery_month: 'delivery_month',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_transport_mode_listScalarFieldEnum = {
  id: 'id',
  transport_name: 'transport_name',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_customer_locationScalarFieldEnum = {
  id: 'id',
  work_area_t: 'work_area_t',
  customer_id: 'customer_id',
  latitude: 'latitude',
  longitude: 'longitude',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_payment_historyScalarFieldEnum = {
  id: 'id',
  billing_doc_no: 'billing_doc_no',
  partner: 'partner',
  da_code: 'da_code',
  cash_collection: 'cash_collection',
  cash_collection_date_time: 'cash_collection_date_time',
  cash_collection_latitude: 'cash_collection_latitude',
  cash_collection_longitude: 'cash_collection_longitude',
  created_at: 'created_at',
  updated_at: 'updated_at',
  route_code: 'route_code'
};

exports.Prisma.Rdl_returnScalarFieldEnum = {
  id: 'id',
  billing_doc_no: 'billing_doc_no',
  billing_date: 'billing_date',
  partner: 'partner',
  gate_pass_no: 'gate_pass_no',
  da_code: 'da_code',
  route_code: 'route_code',
  return_date_time: 'return_date_time',
  return_latitude: 'return_latitude',
  return_longitude: 'return_longitude',
  return_status: 'return_status',
  return_amount: 'return_amount',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_return_listScalarFieldEnum = {
  id: 'id',
  matnr: 'matnr',
  batch: 'batch',
  return_quantity: 'return_quantity',
  return_net_val: 'return_net_val',
  created_at: 'created_at',
  updated_at: 'updated_at',
  billing_date: 'billing_date',
  billing_doc_no: 'billing_doc_no',
  da_code: 'da_code',
  gate_pass_no: 'gate_pass_no',
  partner: 'partner',
  route_code: 'route_code',
  return_time: 'return_time'
};

exports.Prisma.Rdl_visit_historyScalarFieldEnum = {
  id: 'id',
  da_code: 'da_code',
  route_code: 'route_code',
  partner: 'partner',
  visit_type: 'visit_type',
  visit_latitude: 'visit_latitude',
  visit_longitude: 'visit_longitude',
  comment: 'comment',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_odms_mobile_appScalarFieldEnum = {
  id: 'id',
  version: 'version',
  build_number: 'build_number',
  force_to_update: 'force_to_update',
  remove_cache_on_update: 'remove_cache_on_update',
  remove_data_on_update: 'remove_data_on_update',
  remove_cache_and_data_on_update: 'remove_cache_and_data_on_update',
  main_file: 'main_file',
  x86_64_file: 'x86_64_file',
  armeabi_v7a_file: 'armeabi_v7a_file',
  arm64_v8a_file: 'arm64_v8a_file',
  upload_date: 'upload_date'
};

exports.Prisma.Rdl_return_list_sapScalarFieldEnum = {
  id: 'id',
  matnr: 'matnr',
  batch: 'batch',
  sales_quantity: 'sales_quantity',
  return_quantity: 'return_quantity',
  return_amount: 'return_amount',
  return_id: 'return_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_return_sapScalarFieldEnum = {
  id: 'id',
  gate_pass_no: 'gate_pass_no',
  billing_doc_no: 'billing_doc_no',
  billing_date: 'billing_date',
  route: 'route',
  return_type: 'return_type',
  return_reason: 'return_reason',
  da_code: 'da_code',
  sales_product_quantity: 'sales_product_quantity',
  return_product_quantity: 'return_product_quantity',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Rdl_return_sap_auditScalarFieldEnum = {
  id: 'id',
  action: 'action',
  billing_doc_no: 'billing_doc_no',
  old_return_type: 'old_return_type',
  new_return_type: 'new_return_type',
  old_return_reason: 'old_return_reason',
  new_return_reason: 'new_return_reason',
  change_time: 'change_time'
};

exports.Prisma.Rdl_route_wise_depotScalarFieldEnum = {
  id: 'id',
  depot_code: 'depot_code',
  depot_name: 'depot_name',
  route_code: 'route_code',
  route_name: 'route_name'
};

exports.Prisma.Rdl_visit_app_visithistorymodelScalarFieldEnum = {
  id: 'id',
  da_code: 'da_code',
  route_code: 'route_code',
  partner: 'partner',
  visit_type: 'visit_type',
  comment: 'comment',
  created_at: 'created_at',
  updated_at: 'updated_at',
  visit_latitude: 'visit_latitude',
  visit_longitude: 'visit_longitude'
};

exports.Prisma.Rdl_da_movementScalarFieldEnum = {
  id: 'id',
  da_code: 'da_code',
  mv_date: 'mv_date',
  mv_distance_km: 'mv_distance_km',
  created_at: 'created_at',
  mv_time_minutes: 'mv_time_minutes'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.rdl_admin_user_list_role = exports.$Enums.rdl_admin_user_list_role = {
  admin: 'admin',
  depot: 'depot'
};

exports.rdl_visit_history_visit_type = exports.$Enums.rdl_visit_history_visit_type = {
  Customer_Unavailable: 'Customer_Unavailable',
  Customer_Busy: 'Customer_Busy',
  Insufficient_Amount: 'Insufficient_Amount'
};

exports.Prisma.ModelName = {
  exf_customer_location: 'exf_customer_location',
  rdl_admin_user_list: 'rdl_admin_user_list',
  rdl_attendance: 'rdl_attendance',
  rdl_auth_group: 'rdl_auth_group',
  rdl_auth_group_permissions: 'rdl_auth_group_permissions',
  rdl_auth_permission: 'rdl_auth_permission',
  rdl_auth_user: 'rdl_auth_user',
  rdl_auth_user_groups: 'rdl_auth_user_groups',
  rdl_auth_user_user_permissions: 'rdl_auth_user_user_permissions',
  rdl_delivery: 'rdl_delivery',
  rdl_delivery_info_sap: 'rdl_delivery_info_sap',
  rdl_delivery_list: 'rdl_delivery_list',
  rdl_django_admin_log: 'rdl_django_admin_log',
  rdl_django_content_type: 'rdl_django_content_type',
  rdl_django_migrations: 'rdl_django_migrations',
  rdl_django_session: 'rdl_django_session',
  rdl_route_sap: 'rdl_route_sap',
  rdl_user_list: 'rdl_user_list',
  rpl_customer: 'rpl_customer',
  rpl_customer_sales_org: 'rpl_customer_sales_org',
  rpl_customer_territory: 'rpl_customer_territory',
  rpl_material: 'rpl_material',
  rpl_sales_info_sap: 'rpl_sales_info_sap',
  synchronize_log: 'synchronize_log',
  synchronize_log_list: 'synchronize_log_list',
  synchronize_setting: 'synchronize_setting',
  auth_group: 'auth_group',
  auth_group_permissions: 'auth_group_permissions',
  auth_permission: 'auth_permission',
  auth_user: 'auth_user',
  auth_user_groups: 'auth_user_groups',
  auth_user_user_permissions: 'auth_user_user_permissions',
  django_admin_log: 'django_admin_log',
  django_content_type: 'django_content_type',
  django_migrations: 'django_migrations',
  django_session: 'django_session',
  rdl_conveyance: 'rdl_conveyance',
  rdl_delivery_stats: 'rdl_delivery_stats',
  rdl_transport_mode_list: 'rdl_transport_mode_list',
  rdl_customer_location: 'rdl_customer_location',
  rdl_payment_history: 'rdl_payment_history',
  rdl_return: 'rdl_return',
  rdl_return_list: 'rdl_return_list',
  rdl_visit_history: 'rdl_visit_history',
  rdl_odms_mobile_app: 'rdl_odms_mobile_app',
  rdl_return_list_sap: 'rdl_return_list_sap',
  rdl_return_sap: 'rdl_return_sap',
  rdl_return_sap_audit: 'rdl_return_sap_audit',
  rdl_route_wise_depot: 'rdl_route_wise_depot',
  rdl_visit_app_visithistorymodel: 'rdl_visit_app_visithistorymodel',
  rdl_da_movement: 'rdl_da_movement'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
