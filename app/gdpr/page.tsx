export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="page-shell">
      <section className="highlight" style={{ maxWidth: 900, margin: "2rem auto" }}>
        <h1>Ochrana osobních údajů</h1>

        NENÍ HOTOVÉ!!!

        <p>
          Provozovatelem webu a správcem osobních údajů je:
        </p>

        <p>
          <strong>InPartners Service s.r.o.</strong><br />
          IČ: 02267918<br />
          DIČ: CZ02267918<br />
          e-mail: blejskarnastatl@gmail.com<br />
          telefon: +420 601 006 076
        </p>

        <h2>Jaké údaje zpracováváme</h2>
        <p>
          Zpracováváme pouze údaje, které zadáte při objednávce:
        </p>
        <ul>
          <li>jméno a příjmení</li>
          <li>e-mailovou adresu</li>
          <li>telefonní číslo</li>
        </ul>

        <h2>Za jakým účelem</h2>
        <p>
          Údaje slouží výhradně k:
        </p>
        <ul>
          <li>vyřízení objednávky</li>
          <li>zaslání voucheru nebo domluvě vyzvednutí</li>
          <li>komunikaci ohledně platby</li>
        </ul>

        <p>
          Vaše údaje nepoužíváme k marketingu ani je nepředáváme třetím stranám mimo
          nezbytné technické zpracování platby a objednávky.
        </p>

        <h2>Doba uchování</h2>
        <p>
          Údaje uchováváme pouze po dobu nezbytnou k vyřízení objednávky a splnění
          zákonných povinností (např. účetnictví).
        </p>

        <h2>Vaše práva</h2>
        <p>
          Máte právo:
        </p>
        <ul>
          <li>požadovat přístup ke svým údajům</li>
          <li>požadovat jejich opravu nebo výmaz</li>
          <li>vznést námitku proti zpracování</li>
          <li>obrátit se na Úřad pro ochranu osobních údajů</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Web používá pouze technické ukládání dat. Nepoužíváme marketingové ani
          sledovací cookies.
        </p>

        <p style={{ marginTop: "2rem", fontWeight: 600 }}>
          Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
        </p>
      </section>
    </div>
  );
}