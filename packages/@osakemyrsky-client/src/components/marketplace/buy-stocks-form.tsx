import { DownloadIcon } from "@heroicons/react/solid";
import { FormEventHandler, FunctionComponent, useState } from "react";

import Button from "@/atoms/button";
import FormInput from "@/atoms/form-input";
import TextInput from "@/atoms/text-input";
import { Stock } from "@/types/stock";

export interface BuyStocksFormProps {
  stock: Stock;
  onSubmit: (order: { stockCount: number; stockPriceCents: number; expirationDate: string }) => void;
}

const BuyStocksForm: FunctionComponent<BuyStocksFormProps> = ({ stock, onSubmit }) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(stock.price || 1);

  const onSubmitForm: FormEventHandler = event => {
    event.preventDefault();
    onSubmit({
      stockCount: count,
      stockPriceCents: price * 100,
      expirationDate: "2022-01-01"
    });
  };

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

      <form className="flex flex-col items-stretch" onSubmit={onSubmitForm}>
        <FormInput id="expirationDate" label="Voimassa" subLabel="Voimassaolo päättyy vuorokauden loputtua">
          <TextInput />
        </FormInput>
        <FormInput id="count" label="Määrä, kpl">
          <TextInput type="number" value={count} onChange={setCount} />
        </FormInput>
        <FormInput id="price" label="Kurssi, €">
          <TextInput type="number" value={price} onChange={setPrice} />
        </FormInput>
        <span className="mt-4 mb-2 text-gray-400 text-lg text-right">
          {count} x {price} € = <span className="font-bold text-black-200">{(price * count).toFixed(2)} €</span>
        </span>
        <Button type="submit" icon={<DownloadIcon />} className="mt-4 self-end">
          Lähetä ostotoimeksianto
        </Button>
      </form>
    </div>
  );
};

export default BuyStocksForm;
