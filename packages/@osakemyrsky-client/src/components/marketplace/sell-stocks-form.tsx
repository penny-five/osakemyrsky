import { UploadIcon } from "@heroicons/react/solid";
import { FormEventHandler, FunctionComponent, useState } from "react";

import Button from "@/atoms/button";
import FormInput from "@/atoms/form-input";
import TextInput from "@/atoms/text-input";
import { Stock } from "@/types/stock";

export interface SellStocksFormProps {
  stock: Stock;
  onSubmit: (order: { count: number; price: number }) => void;
}

const SellStocksForm: FunctionComponent<SellStocksFormProps> = ({ stock, onSubmit }) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(stock.price || 1);

  const onSubmitForm: FormEventHandler = event => {
    event.preventDefault();
    onSubmit({
      count,
      price
    });
  };

  return (
    <div className="grid grid-cols-2 gap-8 py-6">
      <div>
        <p>
          Tekemäsi myyntitoimeksiannot käsitellään kerran tunnissa niinä ajankohtina, jolloin kaupankäynti osakkeella on
          mahdollista. Myyntitoimeksiannon onnistuminen edellyttää, että salkussasi on riittävä määrä myytävää osaketta
          toimeksiannon käsittelyhetkellä.
        </p>
        <p>Näet kaikki osto- ja myyntitoimeksiantosi omasta salkustasi.</p>
      </div>

      <form className="flex flex-col items-stretch" onSubmit={onSubmitForm}>
        <FormInput id="deadline" label="Voimassa" subLabel="Voimassaolo päättyy vuorokauden loputtua">
          <TextInput />
        </FormInput>
        <FormInput id="count" label="Määrä, kpl">
          <TextInput type="number" value={count} onChange={setCount} />
        </FormInput>
        <FormInput id="price" label="Hinta, €">
          <TextInput type="number" value={price} onChange={setPrice} />
        </FormInput>
        <span className="mt-4 mb-2 text-gray-400 text-lg text-right">
          {count} x {price} € = <span className="font-bold text-black-200">{(price * count).toFixed(2)} €</span>
        </span>
        <Button type="submit" icon={<UploadIcon />} className="mt-4 self-end">
          Lähetä myyntitoimeksianto
        </Button>
      </form>
    </div>
  );
};

export default SellStocksForm;
