"use client";
import styled from "styled-components";
import Link from "next/link";

import { forwardRef } from "react";

interface StyledLinkProps {
  variant?: "external" | "access" | "secondary";
}

const CustomLink = forwardRef<HTMLAnchorElement, StyledLinkProps & React.ComponentProps<typeof Link>>(({ children, variant, ...props }, ref) => (
  <Link {...props} ref={ref}>
    {children}
  </Link>
));

CustomLink.displayName = "CustomLink";

export const StyledLink = styled(CustomLink)<StyledLinkProps>`
  font-size: 1.125rem;
  color: blue;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  text-underline-offset: 4px;

  &:hover {
    background: #d3d3d3;
    border-radius: 0.25rem;
  }

  ${(props) => (props.variant == "external" ? "color: green;" : "")}
  ${(props) => (props.variant == "secondary" ? "color: rgb(60,60,60); font-size: 12px; text-underline-offset: auto; text-decoration-skip-ink: auto; &:hover {background: #f3f3f3;}" : "")}
`;
