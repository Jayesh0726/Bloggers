import React from "react";
import { Button as ShadcnButton } from "./ui/button";

function Button({
  children,
  className = "",
  type = "button",
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <ShadcnButton
      type={type}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
}

export default Button;
