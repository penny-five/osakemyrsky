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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date>();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit!({
      name,
      startDate: startDate.toISOString(),
      endDate: endDate!.toISOString()
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
        value={format(startDate, "yyyy-MM-dd")}
        onChange={event => setStartDate(new Date(event.target.value))}
      ></input>
      <label htmlFor="league-end-date">Loppupäivämäärä</label>
      <input
        id="league-end-date"
        type="date"
        value={endDate != null ? format(endDate, "yyyy-MM-dd") : undefined}
        onChange={event => setEndDate(new Date(event.target.value))}
      ></input>
      <Button>Lisää</Button>
    </form>
  );
};

CreateLeagueForm.defaultProps = {
  onSubmit: () => {
    /* noop */
  }
};

export default CreateLeagueForm;
