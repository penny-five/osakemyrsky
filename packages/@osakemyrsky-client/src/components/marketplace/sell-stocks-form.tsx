import { UploadIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";

import OrderSubmittedMessage from "./order-submitted-message";

import Button from "@/atoms/button";
import DateInput from "@/components/forms/date-input";
import FormInput from "@/components/forms/form-input";
import TextInput from "@/components/forms/text-input";
import { Stock } from "@/types/stock";
import { formatCurrency } from "@/utils/currency";
import { currentISODay } from "@/utils/dates";

export interface SubmitSellOrderInput {
  stock: Stock;
  count: number;
  price: number;
  expirationDate: string;
}

export interface SellStocksFormProps {
  stock: Stock;
  onSubmit: (order: SubmitSellOrderInput) => Promise<void>;
}

const SellStocksForm = ({ stock, onSubmit }: SellStocksFormProps) => {
  const [submittedOrder, setSubmittedOrder] = useState<SubmitSellOrderInput | null>(null);

  if (submittedOrder != null && submittedOrder.stock.symbol != stock.symbol) {
    setSubmittedOrder(null);
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<Omit<SubmitSellOrderInput, "stock">>({
    defaultValues: {
      count: 1,
      price: stock.priceCents != null ? stock.priceCents / 100 : 1,
      expirationDate: currentISODay()
    }
  });

  watch("count");
  watch("price");

  const onSubmitWrapper = async (order: Omit<SubmitSellOrderInput, "stock">) => {
    await onSubmit({ ...order, stock });
    setSubmittedOrder({ ...order, stock });
  };

  if (submittedOrder != null) {
    return (
      <div className="py-4">
        <OrderSubmittedMessage
          message="Myyntitoimeksianto lähetetty"
          count={submittedOrder.count}
          priceCents={submittedOrder.price}
          expirationDate={submittedOrder.expirationDate}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[5fr,4fr] gap-8 py-6">
      <div>
        <p>
          Tekemäsi myyntitoimeksiannot käsitellään kerran tunnissa niinä ajankohtina, jolloin kaupankäynti osakkeella on
          mahdollista. Myyntitoimeksiannon onnistuminen edellyttää, että salkussasi on riittävä määrä myytävää osaketta
          toimeksiannon käsittelyhetkellä.
        </p>
        <p>Näet kaikki osto- ja myyntitoimeksiantosi omasta salkustasi.</p>
      </div>

      <form id="sellStocks" className="flex flex-col items-stretch" onSubmit={handleSubmit(onSubmitWrapper)}>
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
        <FormInput id="price" label="Hinta, €" error={errors.price}>
          <TextInput
            type="number"
            min={0.01}
            step={0.01}
            {...register("price", { required: true, valueAsNumber: true, min: 0.01 })}
          />
        </FormInput>
        <span className="mt-4 mb-2 text-lg text-right text-gray-500">
          <span className="font-bold">{getValues().count}</span>
          <span> × </span>
          <span className="font-bold">{formatCurrency(getValues().price)}</span>
          <span> = </span>
          <span className="font-bold text-black-200">{(getValues().count * getValues().price).toFixed(2)} €</span>
        </span>
        <Button type="submit" icon={<UploadIcon />} className="mt-4 self-end">
          Lähetä myyntitoimeksianto
        </Button>
      </form>
    </div>
  );
};

export default SellStocksForm;
