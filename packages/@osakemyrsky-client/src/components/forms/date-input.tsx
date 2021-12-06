import { useFloating, flip, shift, offset } from "@floating-ui/react-dom";
import classNames from "classnames";
import { format } from "date-fns";
import fi from "date-fns/locale/fi";
import React, { FocusEventHandler, useRef, useState } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { formatISODay, parseDate } from "@/utils/dates";
import { capitalize } from "@/utils/strings";

export interface DateInputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  min?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(({ value, defaultValue, min, ...props }, ref) => {
  const { x, y, strategy, reference, floating } = useFloating({
    middleware: [offset({ mainAxis: 4 }), flip({ padding: 5 }), shift({ padding: 5 })],
    placement: "bottom-start",
    strategy: "absolute"
  });

  const [internalValue, setInternalValue] = useState(value || defaultValue);

  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => {
    setPickerOpen(false);
  });

  const [isPickerOpen, setPickerOpen] = useState(false);

  const onSelect: SelectSingleEventHandler = (day, _selected, modifiers) => {
    if (day != null && !modifiers.disabled) {
      setInternalValue(formatISODay(day));
      setPickerOpen(false);
    }
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = () => {
    setPickerOpen(true);
  };

  return (
    <div className="flex" ref={wrapperRef} onFocus={onFocus}>
      <div className="flex-grow" ref={reference}>
        <input
          {...props}
          ref={ref}
          className={classNames({
            "w-full py-3 px-4 font-normal text-base placeholder-gray-500 border-gray-400 bg-gray-100 rounded-lg": true,
            "focus:ring-1 focus:ring-blue-200 transition-colors": true
          })}
          type="text"
          autoComplete="off"
          value={internalValue || value}
          onKeyDown={event => event.preventDefault()}
        />
      </div>
      {isPickerOpen && (
        <div
          className="bg-white border-1 border-gray-300 rounded-xl shadow-lg z-50"
          ref={floating}
          style={{
            position: strategy,
            top: y || "",
            left: x || ""
          }}
        >
          <DayPicker
            mode="single"
            locale={fi}
            fromDate={min != null ? parseDate(min) : undefined}
            styles={{
              caption: {
                fontSize: "0.8rem"
              },
              head_cell: {
                color: "#A9A9A9"
              }
            }}
            formatters={{
              formatCaption: date => capitalize(format(date, "LLLL", { locale: fi }))
            }}
            selected={internalValue != null ? parseDate(internalValue) : undefined}
            onSelect={onSelect}
          />
        </div>
      )}
    </div>
  );
});

DateInput.defaultProps = {
  onChange: () => {
    // noop
  }
};

export default DateInput;
