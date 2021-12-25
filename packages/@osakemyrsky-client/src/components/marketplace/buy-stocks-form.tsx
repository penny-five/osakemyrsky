import { DownloadIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

import Button from "@/atoms/button";
import DateInput from "@/components/forms/date-input";
import FormInput from "@/components/forms/form-input";
import TextInput from "@/components/forms/text-input";
import { Stock } from "@/types/stock";
import { currentISODay } from "@/utils/dates";

export interface SubmitBuyOrderInput {
  count: number;
  price: number;
  expirationDate: string;
}

export interface BuyStocksFormProps {
  stock: Stock;
  onSubmit: (order: SubmitBuyOrderInput) => void;
}

const BuyStocksForm = ({ stock, onSubmit }: BuyStocksFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<SubmitBuyOrderInput>({
    defaultValues: {
      count: 1,
      price: stock.priceCents != null ? stock.priceCents / 100 : 1,
      expirationDate: currentISODay()
    }
  });

  watch("count");
  watch("price");

  return (
    <div className="grid grid-cols-[5fr,4fr] gap-8 py-6">
      <div>
        <p>
          Tekemäsi ostotoimeksiannot käsitellään kerran tunnissa niinä ajankohtina, jolloin kaupankäynti osakkeella on
          mahdollista. Ostotoimeksiannon onnistuminen edellyttää, että sinulla on kassassa riittävästi rahaa
          toimeksiannon käsittelyhetkellä.
        </p>
        <p>Näet kaikki osto- ja myyntitoimeksiantosi omasta salkustasi.</p>
      </div>

      <form id="buyStocks" className="flex flex-col items-stretch" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="expirationDate"
          label="Voimassa"
          subLabel="Voimassaolo päättyy vuorokauden loputtua"
          error={errors.expirationDate}
        >
          <DateInput {...register("expirationDate", { required: true })} />
        </FormInput>
        <FormInput id="count" label="Määrä, kpl" error={errors.count}>
          <TextInput type="number" min={1} {...register("count", { required: true, min: 1 })} />
        </FormInput>
        <FormInput id="price" label="Kurssi, €" error={errors.price}>
          <TextInput
            type="number"
            min={0.01}
            step={0.01}
            {...register("price", { required: true, valueAsNumber: true, min: 0.01 })}
          />
        </FormInput>
        <span className="mt-4 mb-2 text-gray-500 text-lg text-right">
          {getValues().count} x {getValues().price} € ={" "}
          <span className="font-bold text-black-200">{(getValues().count * getValues().price).toFixed(2)} €</span>
        </span>
        <Button type="submit" icon={<DownloadIcon />} className="mt-4 self-end">
          Lähetä ostotoimeksianto
        </Button>
      </form>
    </div>
  );
};

export default BuyStocksForm;
