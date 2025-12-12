import Image from "next/image";

export default function JakKNamPage() {
  return (
    <main className="page-shell">
      <section className="howto">
        {/* LEVÝ SLOUPEC */}
        <div className="howto-left">
          <h1 className="howto-title">
            <span className="howto-title-scribble">Jak do Blejskárny?</span>
          </h1>

          <ol className="howto-steps">
            <li>
              Chytni si čas blejsku na{" "}
              <a className="highlight" href="tel:+420601006076">
                +420&nbsp;601&nbsp;006&nbsp;076
              </a>
              .
            </li>
            <li>Nebo rovnou jeď směr IBC na Příkop 4.</li>
            <li>
              Pokračuj do{" "}
              <span className="highlight">podzemního parkingu</span> za
              závorou.
            </li>
            <li>
              Řekni, jakej blejsk pak chceš, nebo se domluvíme na specialitce.
            </li>
            <li>My ti řeknem, kdy si káru vyzvednout.</li>
            <li>Hoď nám klíče a běž na kafe nebo kam chceš.</li>
            <li>Vrať se pro nablejskaný fáro.</li>
            <li>
              A až ti bude chybět blejsk,{" "}
              <span className="howto-underline">přijeď zas.</span>
            </li>
          </ol>
        </div>

        {/* PRAVÝ SLOUPEC */}
        <div className="howto-right">
          <div className="howto-mapCard">

            {/* FOTO */}
            <div className="howto-photo">
              <Image
                src="/jak_do_blejskarny.png"
                alt="Blejskárna Štatl - podzemní garáže IBC"
                className="howto-photoImage"
                width={500}            
                height={200}             
              />
            </div>

            {/* MAPA */}
            <div className="howto-mapFrame">
              <iframe
                title="Mapa Blejskárna Štatl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://mapy.com/s/labecenopa"
              />
            </div>

            {/* META */}
            <div className="howto-mapMeta">
              <div className="howto-mapLine">
                <strong>Podzemní garáže IBC Brno</strong>
              </div>
              <div className="howto-mapLine">Příkop 4, 602 00 Brno</div>

              <a className="howto-callPill" href="tel:+420601006076">
                Chytni blejsk na 📞+420 601 006 076
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
