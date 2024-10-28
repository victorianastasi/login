import styled from "styled-components";
import { InputProps } from "./InputFieldInterface";

export const Container = styled.div`
  padding: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;
export const ContainerRow = styled.div`
  padding: 0.75rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export const Label = styled.span`
  position: absolute;
  left: 0;
  padding-left: 1.2rem;
  font-size: 1rem;
  color: #6e6d6d;
  font-weight: 600;
  pointer-events: none;
  transition: 0.35s ease;
`;

export const InputEl = styled.input<InputProps>`
  margin-top: 0.25rem;
  background-color: #ffffff;
  outline: 1px solid #cdcdcd;
  color: rgb(28, 30, 30);
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: "__Quicksand_7f5e9f", "__Quicksand_Fallback_7f5e9f";
  ${(props) => (props.$variant == "password" ? "padding-right: 2.5rem;" : "")}

  &:focus {
    outline: 2px solid #45457a;
  }
  &:not(:placeholder-shown) + span,
  &:focus + span {
    color: #47475c;
    color: #45457a;
    transform: translateX(10px) translateY(-20px);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0 6px;
    background-color: #fff;
  }

  &:not(:focus) + span {
    color: #6e6d6d;
  }
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 6px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const EyeIcon = styled.span`
  font-size: 1.25rem;
  color: rgb(28, 30, 30);
`;
