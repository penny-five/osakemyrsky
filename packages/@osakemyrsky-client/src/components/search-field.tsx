import debounce from "lodash.debounce";
import React, { FunctionComponent, useMemo } from "react";

import TextInput from "@/atoms/text-input";

export interface SearchFieldProps {
  maxLength?: number;
  placeholder?: string;
  onSearch: (searchphrase: string) => void;
}

const SearchField: FunctionComponent<SearchFieldProps> = ({ maxLength, placeholder, onSearch }) => {
  const onChange = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 500),
    [onSearch]
  );

  return <TextInput maxLength={maxLength} placeholder={placeholder} onChange={onChange} />;
};

SearchField.defaultProps = {
  onSearch: () => {
    // noop
  }
};

export default SearchField;
