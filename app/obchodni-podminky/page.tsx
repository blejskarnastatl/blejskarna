import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky | Blejskárna ŠTATL",
  description: "Obchodní podmínky pro nákup dárkových poukazů Blejskárna ŠTATL.",
  alternates: { canonical: "/obchodni-podminky" },
};

export default function ObchodniPodminkyPage() {
  return (
    <div className="page-shell">
      <section className="legal">
        <h1>Obchodní podmínky e-shopu Blejskárna ŠTATL</h1>

        <h2>I. Základní ustanovení</h2>
        <ol>
          <li>
            Tyto všeobecné obchodní podmínky (dále jen „obchodní podmínky“) jsou
            vydané dle § 1751 a násl. zákona č. 89/2012 Sb., občanský zákoník
            (dále jen „občanský zákoník“), a upravují vzájemná práva a povinnosti
            prodávajícího a kupujícího při nákupu dárkových poukazů.
          </li>
          <li>
            Prodávající:
            <br />
            <strong>InPartners Service s.r.o.</strong>
            <br />
            IČ: 02267918
            <br />
            DIČ: CZ02267918
            <br />
            Sídlo: Tuřanka 1519/115a, Slatina, 627 00 Brno
            <br />
            Zapsána: C 80715/KSBR, Krajský soud v Brně
            <br />
            Kontaktní e-mail: <strong>blejskarnastatl@gmail.com</strong>
            <br />
            Telefon: <strong>+420 601 006 076</strong>
          </li>
          <li>
            Kupujícím je fyzická osoba uzavírající kupní smlouvu mimo svou
            podnikatelskou činnost jako spotřebitel, nebo v rámci své
            podnikatelské činnosti (dále jen „kupující“).
          </li>
          <li>
            E-shop je dostupný na internetové adrese <strong>www.blejskarna.cz</strong>.
          </li>
          <li>
            Ustanovení obchodních podmínek jsou nedílnou součástí kupní smlouvy.
            Odchylná ujednání v kupní smlouvě mají přednost před ustanoveními
            těchto obchodních podmínek.
          </li>
          <li>
            Kupní smlouva i obchodní podmínky se uzavírají v českém jazyce.
          </li>
        </ol>

        <h2>II. Informace o poukazech a cenách</h2>
        <ol>
          <li>
            Předmětem koupě jsou dárkové poukazy (vouchery) na služby Blejskárny
            (dále jen „poukaz“). Informace o poukazech a jejich cenách jsou
            uvedeny u jednotlivých poukazů na webu.
          </li>
          <li>
            Ceny jsou uvedeny v českých korunách (CZK) a jsou uvedeny včetně DPH,
            pokud není výslovně uvedeno jinak.
          </li>
          <li>
            Prezentace poukazů na webu je informativního charakteru a sama o sobě
            nepředstavuje návrh na uzavření kupní smlouvy.
          </li>
          <li>
            U poukazu „na přání“ si kupující volí nominální hodnotu v rozmezí,
            které e-shop umožňuje. Prodávající je oprávněn odmítnout objednávku s
            evidentně chybnou částkou vzniklou technickou chybou.
          </li>
        </ol>

        <h2>III. Objednávka a uzavření kupní smlouvy</h2>
        <ol>
          <li>
            Kupující provádí objednávku vyplněním objednávkového formuláře bez
            registrace.
          </li>
          <li>
            Při objednávce kupující zvolí poukaz(y), množství, případně hodnotu
            poukazu „na přání“, a způsob doručení (e-mailem / vyzvednutí).
          </li>
          <li>
            Před odesláním objednávky je kupujícímu umožněno zkontrolovat a měnit
            údaje, které do objednávky zadal. Objednávku kupující odešle kliknutím
            na tlačítko <strong>„Odeslat objednávku“</strong>.
          </li>
          <li>
            Podmínkou platnosti objednávky je vyplnění všech povinných údajů v
            objednávkovém formuláři a potvrzení seznámení s těmito obchodními
            podmínkami.
          </li>
          <li>
            Po obdržení objednávky zašle prodávající kupujícímu automatické
            potvrzení o přijetí objednávky na uvedený e-mail. Toto potvrzení je
            pouze informativní a samo o sobě neznamená uzavření kupní smlouvy.
          </li>
          <li>
            Kupní smlouva je uzavřena okamžikem připsání kupní ceny na účet
            prodávajícího nebo zaplacením při osobním odběru (pokud je tato volba
            v daném okamžiku umožněna).
          </li>
          <li>
            Kupující může objednávku zrušit do okamžiku, než dojde k úhradě. Zrušení
            je možné e-mailem nebo telefonicky na kontaktech prodávajícího.
          </li>
          <li>
            V případě zjevné technické chyby při uvedení ceny poukazu nebo v průběhu
            objednávání není prodávající povinen dodat poukaz za zjevně chybnou cenu.
            Prodávající kontaktuje kupujícího a navrhne nápravu / nový postup.
          </li>
        </ol>

        <h2>IV. Platební podmínky</h2>
        <ol>
          <li>
            Kupující může cenu poukazů uhradit:
            <ul>
              <li>
                bezhotovostně bankovním převodem (včetně QR platby / platebních údajů
                zaslaných po objednávce),
              </li>
              <li>
                případně hotově nebo kartou při osobním odběru, pokud to prodávající
                v daném okamžiku umožňuje.
              </li>
            </ul>
          </li>
          <li>
            U bezhotovostní platby je závazek kupujícího uhradit kupní cenu splněn
            okamžikem připsání příslušné částky na účet prodávajícího.
          </li>
          <li>
            Prodávající může k objednávce vystavit daňový doklad (fakturu) a zaslat jej
            kupujícímu elektronicky na e-mail uvedený v objednávce.
          </li>
        </ol>

        <h2>V. Dodání poukazu</h2>
        <ol>
          <li>
            Po přijetí platby prodávající dodá poukaz jedním z těchto způsobů:
            <ul>
              <li>elektronicky na e-mail kupujícího, nebo</li>
              <li>připraví poukaz k vyzvednutí v provozovně Blejskárny.</li>
            </ul>
          </li>
          <li>
            Volba způsobu dodání se provádí během objednávky.
          </li>
          <li>
            Kupující je povinen uvést správné kontaktní údaje (zejména e-mail), aby
            mohlo dojít k doručení elektronického poukazu.
          </li>
        </ol>

        <h2>VI. Odstoupení od smlouvy</h2>
        <ol>
          <li>
            Kupující, který uzavřel kupní smlouvu jako spotřebitel, má obecně právo
            od smlouvy odstoupit do 14 dnů.
          </li>
          <li>
            Kupující bere na vědomí, že podle § 1837 občanského zákoníku nelze mimo jiné
            odstoupit od smlouvy o dodání digitálního obsahu, pokud nebyl dodán na
            hmotném nosiči a byl dodán s předchozím výslovným souhlasem kupujícího před
            uplynutím lhůty pro odstoupení od smlouvy a prodávající před uzavřením smlouvy
            sdělil, že tím zaniká právo na odstoupení.
          </li>
          <li>
            V praxi to znamená: pokud je elektronický poukaz (digitální obsah) dodán po
            zaplacení, může být právo na odstoupení omezeno dle zákona. Pokud poukaz ještě
            dodán nebyl, kupující může požádat o storno dle těchto podmínek.
          </li>
          <li>
            Pro uplatnění odstoupení / storna může kupující kontaktovat prodávajícího
            e-mailem nebo telefonicky.
          </li>
        </ol>

        <h2>VII. Práva z vadného plnění</h2>
        <ol>
          <li>
            Prodávající odpovídá kupujícímu, že poukaz bude dodán ve sjednané podobě
            (např. správná hodnota, správné údaje, funkční kód/identifikace apod.).
          </li>
          <li>
            Pokud kupující zjistí vadu (např. nesprávná hodnota, nefunkční poukaz, chybně
            uvedené údaje), uplatní reklamaci u prodávajícího e-mailem nebo telefonicky.
          </li>
          <li>
            Prodávající reklamaci vyřídí bez zbytečného odkladu, nejpozději ve lhůtách
            vyplývajících z právních předpisů na ochranu spotřebitele.
          </li>
        </ol>

        <h2>VIII. Doručování a komunikace</h2>
        <ol>
          <li>
            Smluvní strany si mohou veškerou korespondenci doručovat elektronicky.
          </li>
          <li>
            Kupující doručuje prodávajícímu korespondenci na e-mail uvedený v těchto
            obchodních podmínkách. Prodávající doručuje kupujícímu na e-mail uvedený v
            objednávce.
          </li>
        </ol>

        <h2>IX. Mimosoudní řešení sporů</h2>
        <ol>
          <li>
            K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je příslušná
            Česká obchodní inspekce (ČOI). Kupující může využít také platformu pro řešení
            sporů online.
          </li>
        </ol>

        <h2>X. Závěrečná ustanovení</h2>
        <ol>
          <li>
            Veškerá ujednání se řídí právním řádem České republiky. Tím nejsou dotčena
            práva spotřebitele vyplývající z obecně závazných právních předpisů.
          </li>
          <li>
            Prodávající nenese odpovědnost za chyby vzniklé v důsledku zásahů třetích osob
            do webu nebo v důsledku užití webu v rozporu s jeho určením.
          </li>
          <li>
            Kupní smlouva včetně obchodních podmínek může být prodávajícím archivována v
            elektronické podobě a není veřejně přístupná.
          </li>
          <li>
            Znění obchodních podmínek může prodávající měnit či doplňovat. Tím nejsou
            dotčena práva a povinnosti vzniklá po dobu účinnosti předchozího znění.
          </li>
          <li>
            Tyto obchodní podmínky nabývají účinnosti dnem:{" "}
            <strong>______. ______. 20__</strong>
          </li>
        </ol>
      </section>
    </div>
  );
}
