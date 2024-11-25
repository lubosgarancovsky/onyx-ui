import { useCallback, useId, useMemo, useRef } from "react";
import { cn, HTMLOnyxIUProps, ReactRef } from "../../../utils";

interface Props extends HTMLOnyxIUProps<"textarea"> {
  ref?: ReactRef<HTMLTextAreaElement | null>;
  label?: string;
  error?: boolean | string;
  isDisabled?: boolean;
  optionalText?: string;
  hideAsterix?: boolean;
  fullWidth?: boolean;
}

export type UseTextareaProps = Props;

function useTextarea(props: UseTextareaProps) {
  const {
    as,
    ref,
    id: idProp,
    label,
    isDisabled,
    error,
    optionalText,
    hideAsterix,
    className,
    fullWidth,
    onChange: onChangeProp,
    ...textAreaProps
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const id = idProp || useId();
  const Component = as || "textarea";
  const showAsterix = !hideAsterix && !!label && textAreaProps.required;

  const style = useMemo(
    () =>
      cn(
        "focusable border rounded-md border-default-border px-4 py-[0.37rem] focus:outline-none flex items-center gap-2 bg-background",
        {
          "border-danger": !!error,
          "w-full": fullWidth,
          "bg-default-light/50 pointer-events-none": isDisabled,
        },
        className
      ),
    [className]
  );

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeProp?.(event);
  };

  const getTextareaProps = useCallback(
    (props = {}) => ({
      "aria-labelledby": id,
      "aria-disabled": isDisabled,
      disabled: isDisabled,
      onChange,
      ...props,
      ...textAreaProps,
    }),
    [textAreaProps]
  );

  return {
    Component,
    id,
    showAsterix,
    style,
    textareaRef,
    label,
    optionalText,
    error,
    getTextareaProps,
  };
}

export default useTextarea;
