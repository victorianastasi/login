import { Container, EyeButton, EyeIcon, InputEl, Label } from "./InputElements";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { InputFieldProps } from "./InputFieldInterface";

export const InputField: React.FC<InputFieldProps> = ({ label, type, isPassword, toggleAction, showPassword, onChange, onFocus, onBlur }) => {
  return (
    <>
      <Container>
        <InputEl type={type} $variant={isPassword} placeholder=" " onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
        <Label>{label}</Label>
        {isPassword && (
          <EyeButton type="button" onClick={toggleAction}>
            <EyeIcon>{showPassword ? <RiEye2Line /> : <RiEyeCloseLine />}</EyeIcon>
          </EyeButton>
        )}
      </Container>
    </>
  );
};
