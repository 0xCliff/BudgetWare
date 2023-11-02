interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  transactions: Transaction[];
}

interface Transaction {
  category: string;
  date: Date;
  name: string;
  price: number;
  userId: string;
  _id: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

interface TransactionsListItemProps {
  transaction: Transaction;
}

interface Category {
  name: string;
  transactions: [];
}

interface AuthFormProps {
  toggleVariant: () => void;
}

interface Link {
  label: string;
  path: string;
  fn: () => void;
}

interface NavProps {
  close: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  links: Link[];
}

interface SideBarProps {
  links: Link[];
}

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  fullWidth: boolean;
  children: React.ReactNode;
  onClick: () => void;
  secondary: boolean;
  danger: boolean;
  disabled: boolean;
  className: string;
}

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  disabled?: boolean;
  classNames?: string;
  min?: number;
  step?: number;
}

interface SearchBarProps {
  value: string;
  id: string;
  required: boolean;
  disabled: boolean;
  classNames: string;
  onChange: (e: any) => void;
  placeholder: string;
}

interface Credentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SkeletonProps {
  times: number;
  classNames?: string;
}
