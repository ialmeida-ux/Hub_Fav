import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";

interface PinnedLink {
  id: string;
  title: string;
  url: string;
  preview: string;
  description?: string;
}

const travelLinks: PinnedLink[] = [
  {
    id: "1",
    title: "Voo Rio-Penha 30/04-09/05",
    url: "https://www.skyscanner.com.br/transporte/passagens-aereas/rioa/pnza/260430/260509/?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false",
    preview: "https://www.google.com/s2/favicons?domain=skyscanner.com.br&sz=128",
    description: "Passagens Rio-Penha - 30 Abr a 09 Mai 2026",
  },
  {
    id: "2",
    title: "Google Flights - 30 Abril",
    url: "https://www.google.com/travel/flights/search?tfs=CBwQAhokEgoyMDI2LTA0LTMwag0IAxIJL20vMDIycGZtcgcIARIDUE5aQAFIAXABggELCP___________wGYAQI&tfu=EgYIACACKAEiAwoBMA&hl=pt-BR&gl=br&curr=BRL",
    preview: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    description: "Busca de voos no Google Flights - 30 Abril 2026",
  },
];

const shoppingLinks: PinnedLink[] = [
  {
    id: "1",
    title: "Desodorante Natura Homem 100ml",
    url: "https://www.natura.com.br/p/desodorante-corporal-natura-homem-100-ml/NATBRA-110686?utm_term=NATBRA-110686",
    preview: "https://www.google.com/s2/favicons?domain=natura.com.br&sz=128",
    description: "Desodorante Corporal Natura Homem - 100ml",
  },
  {
    id: "2",
    title: "Desodorante Malbec Black 100ml",
    url: "https://www.boticario.com.br/desodorante-body-spray-malbec-black-100-ml/",
    preview: "https://www.google.com/s2/favicons?domain=boticario.com.br&sz=128",
    description: "Desodorante Body Spray Malbec Black - O Boticário",
  },
  {
    id: "3",
    title: "Fone JBL Endurance Run 2",
    url: "https://www.pichau.com.br/fone-de-ouvido-intra-auricular-jbl-endurance-run-2-wireless-branco-jblendurrun2btwht",
    preview: "https://www.google.com/s2/favicons?domain=pichau.com.br&sz=128",
    description: "Fone de Ouvido JBL Endurance Run 2 Wireless Branco",
  },
  {
    id: "4",
    title: "Rocket Lawyer BR",
    url: "https://www.rocketlawyer.com/br/pt",
    preview: "https://www.google.com/s2/favicons?domain=rocketlawyer.com&sz=128",
    description: "Serviços jurídicos online",
  },
  {
    id: "5",
    title: "Monitor Dell 34\" USB-C Plus",
    url: "https://www.dell.com/pt-br/shop/monitor-usb-c-dell-34-plus-s3425dw/apd/210-brmv/monitores-e-acess%C3%B3rios",
    preview: "https://www.google.com/s2/favicons?domain=dell.com&sz=128",
    description: "Monitor Dell 34 Plus S3425DW com USB-C",
  },
  {
    id: "6",
    title: "Teclado e Mouse Dell Pro Plus",
    url: "https://www.dell.com/pt-br/shop/teclado-e-mouse-dell-pro-plus-km7321w-portugu%C3%AAs-brasil/apd/580-akpy/acess%C3%B3rios-para-computador?tfcid=31768715&gacd=9657105-15015-5761040-275878141-0&dgc=ST&cid=71700000122547979&gad_source=1&gad_campaignid=22716632639&gbraid=0AAAAADz5MFsX_ZiJ9kTtrt_ur8k91RQgP&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGJTU_5ukYjVcnYA3CAAsEFJJdYtoM7rYiXx4IIKz7dJwauUOaqIlXBoCtCcQAvD_BwE&gclsrc=aw.ds",
    preview: "https://www.google.com/s2/favicons?domain=dell.com&sz=128",
    description: "Teclado e Mouse Dell Pro Plus KM7321W Wireless",
  },
];

export default function PinnedLinksPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <BackgroundBlur />
      <Container>
        <div className="mt-25 desktop:mt-0 max-w-6xl mx-auto px-4 py-8">
          {/* Seção Viagens */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Viagens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <img
                        src={link.preview}
                        alt={link.title}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {link.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        {link.url}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Seção Compras */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Compras
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shoppingLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <img
                        src={link.preview}
                        alt={link.title}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {link.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        {link.url}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
