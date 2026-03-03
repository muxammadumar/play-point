// Common component props and types

export interface IIconProps {
  name: string;
  color?: string;
  size?: number | string;
}

export interface IAvatarProps {
  src?: string;
  size?: number | "small" | "default" | "large";
  shape?: "circle" | "square";
  name?: string;
}

export interface IUserInfoProps {
  src?: string;
  size?: number | "small" | "default" | "large";
  shape?: "circle" | "square";
  name?: string;
  role?: string;
  status?: "online" | "offline" | "away" | "busy";
}

export interface IMessageProps {
  message: any; // This will be replaced with IMessage from chat types
}

export interface IProgressiveImageProps {
  src: string;
  placeholder?: string;
  alt?: string;
  lazy?: boolean;
}

export interface ICustomSelectProps {
  modelValue: any;
  options: ISelectOption[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  filterable?: boolean;
}

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
}

export interface IStatusSelectProps {
  modelValue: string;
  options?: ISelectOption[];
  size?: "small" | "default" | "large";
}

export interface IMultiselectProps {
  modelValue: any[];
  options: ISelectOption[];
  placeholder?: string;
  disabled?: boolean;
  max?: number;
}

// Filter types
export interface IAppealFilter {
  search: string;
  agent: number | "all";
  status: string;
  priority?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface IConsultationFilter {
  search: string;
  status: string;
  dateFrom?: string;
  dateTo?: string;
  doctor?: number | "all";
}

export interface IAgentFilter {
  search: string;
  role?: string;
  status?: string;
  department?: string;
}

// Dialog/Modal types
export interface IDialogProps {
  visible: boolean;
  title?: string;
  width?: string | number;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
}

export interface IConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "info" | "success" | "error";
}

// Form types
export interface IFormProps {
  modelValue: any;
  rules?: any;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
  inline?: boolean;
  disabled?: boolean;
}

export interface IFormItemProps {
  prop?: string;
  label?: string;
  required?: boolean;
  rules?: any;
}

// Tab types
export interface ITabPane {
  name: string;
  label: string;
  disabled?: boolean;
  closable?: boolean;
  lazy?: boolean;
}

// Table types
export interface ITableColumn {
  prop: string;
  label: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: "left" | "right" | boolean;
  sortable?: boolean | "custom";
  filterable?: boolean;
  formatter?: (row: any, column: ITableColumn, cellValue: any, index: number) => any;
}

export interface ITableProps {
  data: any[];
  columns: ITableColumn[];
  loading?: boolean;
  pagination?: IPaginationProps;
  rowKey?: string;
  selectable?: boolean;
}

export interface IPaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  pageSizes?: number[];
  layout?: string;
}

