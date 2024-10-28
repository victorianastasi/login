import styled from "styled-components";

export const Feedback = styled.p<{ type?: "error" | "success" }>`
  width: 100%;
  position: absolute;
  top: 0.25rem;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px 0px gray;
  box-shadow: 0px 4px 4px 2px rgba(81, 81, 84, 1);
  padding: 0.5rem 0;

  ${(props) => (props.type == "error" && "color: #8c1515; background-color: #e3c2c2;")}
  ${(props) => (props.type == "success" && "color: #0f300e; background-color: #b3cf99; top: -3rem; padding: 1rem 0;")}
`;
