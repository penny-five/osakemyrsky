import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

import Modal from "../modals/modal";

import Button, { ButtonPriority } from "@/atoms/button";
import DateInput from "@/components/forms/date-input";
import FormInput from "@/components/forms/form-input";
import TextInput from "@/components/forms/text-input";
import { currentISODay } from "@/utils/dates";

export interface CreateLeagueModalProps {
  onSubmit: (input: SubmitCreateLeagueModalInputs) => void;
  onClose: () => void;
}

export interface SubmitCreateLeagueModalInputs {
  name: string;
  startDate: string;
  endDate: string;
}

const CreateLeagueModal: FunctionComponent<CreateLeagueModalProps> = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SubmitCreateLeagueModalInputs>();

  return (
    <Modal
      title="Perusta uusi liiga"
      closeOnClickOutside={false}
      onClose={onClose}
      buttons={
        <Button priority={ButtonPriority.PRIMARY} type="submit" form="createLeague">
          Perusta liiga
        </Button>
      }
    >
      <form id="createLeague" onSubmit={handleSubmit(onSubmit)}>
        <FormInput id="name" label="Nimi" error={errors.name}>
          <TextInput {...register("name", { required: true })}></TextInput>
        </FormInput>
        <div className="flex flex-row gap-4">
          <FormInput id="start-date" label="Alkupäivä" error={errors.startDate}>
            <DateInput
              min={currentISODay()}
              defaultValue={currentISODay()}
              {...register("startDate", { required: true })}
            ></DateInput>
          </FormInput>
          <FormInput id="end-date" label="Loppupäivä" error={errors.endDate}>
            <DateInput {...register("endDate", { required: true })}></DateInput>
          </FormInput>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLeagueModal;
