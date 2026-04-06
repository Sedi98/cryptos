import React from "react";
import { cn } from "@/lib/utils";
import { ContainerProps } from "@/constants/types";

const Container = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) => {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
