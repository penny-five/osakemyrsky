import Image from "next/image";

import { signIn } from "@/auth/index";
import { InstructionItem } from "@/components/home/instruction-item";

const Home = () => {
  return (
    <div className="flex w-full z-0">
      <div
        className="absolute w-full h-[550px] opacity-50 z-0"
        style={{
          background: "url(/images/home-bg-stars.svg)",
          maskImage: "linear-gradient(rgba(0, 0, 0, 1.0), transparent)"
        }}
      />
      <div className="flex flex-col items-center mx-auto max-w-screen-desktop pt-[200px] pb-8 px-8">
        <div
          className="w-[400px] h-[337px] z-10"
          style={{ background: "url(/images/home-illustration-astronaut.svg)" }}
        />
        <h2 className="text-[3rem] leading-[4rem] font-black text-white text-center mt-14 mb-8">
          Pörssiversumin kohtalo ratkaistaan selaimessasi
        </h2>
        <p className="my-8 text-white text-lg text-center opacity-80 leading-relaxed whitespace-pre-line">
          Osakemyrsky on jännittävä selainpohjainen peli, jossa pelaajat mittelevät toisiaan vastaan virtuaalisessa
          pörssissä.{"\n"}Tässä taistossa todelliset pörssihait erotellaan lammikon pikkusinteistä.
        </p>
        <div className="my-36">
          <Image src="/images/home-illustration-planet.svg" width={100} height={34} alt="illustration" />
        </div>
        <h3 className="text-2xl font-black text-white text-center my-8">Kuinka osakemyrsky toimii?</h3>
        <ol className="w-full">
          <InstructionItem
            index={0}
            title="Kirjaudu sisään sometunnuksillasi"
            body={
              <p className="text-lg font-medium">
                Kirjautuminen on helppoa ja onnistuu omilla Google-tunnuksillasi. Erillistä rekisteröitymistä ei
                tarvita.{" "}
                <button className="text-lg font-medium text-blue-200 hover:underline" onClick={() => signIn("google")}>
                  Voit kirjautua sisään tästä.
                </button>
              </p>
            }
            illustration={
              <Image src="/images/home-instructions-1.svg" alt="illustration" width="275px" height="275px" />
            }
          />
          <InstructionItem
            index={1}
            title="Perusta liiga ystäviesi kanssa"
            body="Salasanalla suojattuihin liigoihin pääsevät jäseniksi vain ne ihmiset, joille paljastat liigasi salasanan."
            illustration={
              <Image src="/images/home-instructions-2.svg" alt="illustration" width="275px" height="275px" />
            }
          />
          <InstructionItem
            index={2}
            title="Käy kauppaa virtuaalisilla osakkeilla"
            body="Kaupankäynti Osakemyrskyssä tapahtuu oikeilla osakkeilla, oikeilla hinnoilla ja oikean pörssin säännöillä."
            illustration={
              <Image src="/images/home-instructions-3.svg" alt="illustration" width="275px" height="275px" />
            }
          />
          <InstructionItem
            index={3}
            title="Tarkkaile sähköpostiasi"
            body="Saat ilmoituksen sähköpostiisi, kun toimeksiantosi suoritetaan onnistuneesti. Voit halutessasi kytkeä ilmoitukset pois päältä."
            illustration={
              <Image src="/images/home-instructions-4.svg" alt="illustration" width="275px" height="275px" />
            }
          />
          <InstructionItem
            index={4}
            title="Juhlista voittajia"
            body="Kun liiga tulee päätökseensä, näet osallistujien lopulliset sijoitukset ja salkun arvon."
            illustration={
              <Image src="/images/home-instructions-5.svg" alt="illustration" width="250px" height="275px" />
            }
          />
        </ol>
      </div>
    </div>
  );
};

export default Home;
