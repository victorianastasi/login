export interface InputFieldProps {
  label: string;
  type: string;
  isPassword?: string;
  toggleAction?: () => void;
  showPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface InputProps {
  $variant?: string;
}
