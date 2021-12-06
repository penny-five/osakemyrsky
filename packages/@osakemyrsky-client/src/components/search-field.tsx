import debounce from "lodash.debounce";
import React, { FormEvent, useMemo } from "react";

import TextInput from "@/components/forms/text-input";

export interface SearchFieldProps extends React.HTMLProps<HTMLInputElement> {
  onSearch: (searchphrase: string) => void;
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      onSearch = () => {
        /* noop */
      },
      ...props
    },
    ref
  ) => {
    const onChange = useMemo(
      () =>
        debounce((event: FormEvent<HTMLInputElement>) => {
          onSearch((event.target as HTMLInputElement).value);
        }, 500),
      [onSearch]
    );

    return <TextInput {...props} ref={ref} onChange={onChange} type="text" />;
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
