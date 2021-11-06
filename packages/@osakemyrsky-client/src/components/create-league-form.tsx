import { format } from "date-fns";
import { FunctionComponent, SyntheticEvent, useState } from "react";

import Button from "../atoms/button";

export interface CreateLeagueFormData {
  name: string;
  startDate: string;
  endDate: string;
}

export interface CreateLeagueFormProps {
  onSubmit?: (data: CreateLeagueFormData) => void;
}

const CreateLeagueForm: FunctionComponent<CreateLeagueFormProps> = props => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit!({
      name,
      startDate: startDate,
      endDate: endDate!
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label htmlFor="league-name">Liigan nimi</label>
      <input id="league-name" type="text" value={name} onChange={event => setName(event.target.value)}></input>
      <label htmlFor="league-start-date">Alkupäivämäärä</label>
      <input
        id="league-start-date"
        type="date"
        value={startDate}
        onChange={event => setStartDate(format(new Date(event.target.value), "yyyy-MM-dd"))}
      ></input>
      <label htmlFor="league-end-date">Loppupäivämäärä</label>
      <input
        id="league-end-date"
        type="date"
        value={endDate}
        onChange={event => setEndDate(format(new Date(event.target.value), "yyyy-MM-dd"))}
      ></input>
      <Button type="submit">Lisää</Button>
    </form>
  );
};

CreateLeagueForm.defaultProps = {
  onSubmit: () => {
    /* noop */
  }
};

export default CreateLeagueForm;
