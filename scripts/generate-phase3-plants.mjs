import fs from "fs";

const plants = [
  ["jesion-wyniosly", "Jesion wyniosły", "Fraxinus excelsior", "drzewo", [[4, "light"], [5, "peak"]], ["zolty"], "none", true, false, true, false, false, true, ["pelne-slonce"], "25–35 m", "Kwitnienie niepozorne w maju — miododajne kwiaty przed liśćmi."],
  ["kasztan-jadalny", "Kasztan jadalny", "Castanea sativa", "drzewo", [[6, "peak"], [7, "light"]], ["bialy", "zolty"], "mild", true, false, true, false, true, true, ["pelne-slonce"], "20–30 m", "Białe kwiaty w gronie — jesienne owoce i złote liście."],
  ["klon-srebrzysty", "Klon srebrzysty", "Acer saccharinum", "drzewo", [[3, "light"], [4, "peak"]], ["zolty"], "none", true, false, false, false, true, true, ["pelne-slonce"], "20–30 m", "Zielono-żółte kwiaty przed liśćmi — srebrzyste od spodu liście."],
  ["modrzew-europejski", "Modrzew europejski", "Larix decidua", "drzewo", [[4, "peak"]], ["rozowy"], "none", true, false, false, false, false, true, ["pelne-slonce"], "30–40 m", "Różowe szyszki kwiatowe — jedyne iglaste liściaste w Polsce."],
  ["sosna-zwyczajna", "Sosna zwyczajna", "Pinus sylvestris", "drzewo", [[5, "peak"]], ["zolty"], "none", true, false, true, false, false, false, ["pelne-slonce"], "20–35 m", "Żółte kwiaty męskie w maju — charakterystyczna kora pomarańczowa."],
  ["swierk-pospolity", "Świerk pospolity", "Picea abies", "drzewo", [[5, "peak"]], ["czerwony", "zolty"], "none", true, false, false, false, false, false, ["pelne-slonce", "polcien"], "30–50 m", "Czerwono-żółte szyszki kwiatowe — klasyczne drzewo leśne."],
  ["buk-zwyczajny", "Buk zwyczajny", "Fagus sylvatica", "drzewo", [[4, "light"], [5, "peak"]], ["zolty"], "none", true, false, false, false, false, true, ["pelne-slonce", "polcien"], "25–40 m", "Zielonkawe kwiaty w maju — miedziane liście jesienią."],
  ["wiaz-maly", "Wiąz mały", "Ulmus minor", "drzewo", [[3, "light"], [4, "peak"]], ["zolty"], "none", true, false, true, false, false, false, ["pelne-slonce"], "15–25 m", "Czerwone kwiaty przed liśćmi — odporne na choroby."],
  ["topola-biala", "Topola biała", "Populus alba", "drzewo", [[3, "peak"], [4, "light"]], ["czerwony"], "none", true, false, false, false, false, false, ["pelne-slonce"], "20–30 m", "Czerwone kwiaty męskie wczesną wiosną — szybki wzrost."],
  ["dab-czerwony", "Dąb czerwony", "Quercus rubra", "drzewo", [[4, "light"], [5, "peak"]], ["zolty"], "none", true, false, false, false, false, true, ["pelne-slonce"], "25–30 m", "Długie kwiaty męskie — intensywne czerwone liście jesienią."],
  ["olmo-wyniosly", "Olmo wyniosły", "Ulmus laevis", "drzewo", [[3, "peak"], [4, "light"]], ["zolty", "czerwony"], "none", true, false, false, false, false, false, ["pelne-slonce"], "20–30 m", "Czerwone kwiaty przed liśćmi — dobrze znosi wilgoć."],
  ["jodla-pospolita", "Jodła pospolita", "Abies alba", "drzewo", [[5, "peak"]], ["zolty", "czerwony"], "none", true, false, false, false, false, false, ["polcien", "cien"], "40–50 m", "Stojące szyszki kwiatowe — preferuje chłodniejsze stanowiska."],
  ["wierzba-biala", "Wierzba biała", "Salix alba", "drzewo", [[4, "peak"]], ["zolty"], "none", true, false, true, false, false, false, ["pelne-slonce"], "15–25 m", "Żółte kotki wczesną wiosną — bardzo szybki wzrost."],
  ["klon-jesionolistny", "Klon jesionolistny", "Acer negundo", "drzewo", [[4, "peak"], [5, "light"]], ["zolty", "czerwony"], "none", true, false, false, false, false, false, ["pelne-slonce"], "10–15 m", "Zielono-czerwone kwiaty — odporny na zanieczyszczenia."],
  ["grab-pospolity-drzew", "Grab pospolity (drzewo)", "Carpinus betulus", "drzewo", [[4, "light"], [5, "peak"]], ["zolty"], "none", true, false, true, false, false, true, ["pelne-slonce", "polcien"], "15–25 m", "Kwitnienie niepozorne — żółte liście jesienią."],
  ["fotinia", "Fotinia", "Photinia × fraseri", "krzew", [[5, "peak"]], ["bialy"], "mild", true, false, false, false, true, false, ["pelne-slonce"], "2–4 m", "Białe kwiaty w maju — czerwone młode liście przez cały sezon."],
  ["jasminowiec", "Jaśminowiec", "Philadelphus coronarius", "krzew", [[5, "peak"], [6, "light"]], ["bialy"], "strong", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "2–3 m", "Intensywnie pachnące białe kwiaty w czerwcu."],
  ["spiraea-japonska", "Spiraea japońska", "Spiraea japonica", "krzew", [[6, "peak"], [7, "light"]], ["rozowy", "czerwony"], "mild", true, true, false, false, false, true, ["pelne-slonce"], "0.5–1 m", "Różowe kwiaty latem — kompaktowy krzew rabatowy."],
  ["spiraea-late", "Tawułka vanhouttei", "Spiraea × vanhouttei", "krzew", [[4, "peak"], [5, "light"]], ["bialy"], "mild", true, true, false, false, false, true, ["pelne-slonce"], "2–3 m", "Kaskady białych kwiatów w kwietniu — łukowate pędy."],
  ["skrzydlak", "Skrzydlak", "Euonymus alatus", "krzew", [[5, "peak"]], ["mieszany"], "none", true, false, false, false, true, true, ["pelne-slonce", "polcien"], "2–3 m", "Drobne kwiaty — intensywnie czerwone liście jesienią."],
  ["deren-kousa", "Derień kousa", "Cornus kousa", "krzew", [[5, "peak"], [6, "light"]], ["bialy"], "mild", true, false, false, false, true, true, ["pelne-slonce", "polcien"], "3–5 m", "Białe kwiaty w maju — czerwone owoce jesienią."],
  ["roza-okraglolistna", "Róża okrąglistna", "Rosa spinosissima", "krzew", [[5, "peak"], [6, "light"]], ["bialy", "zolty", "rozowy"], "mild", true, true, false, false, true, false, ["pelne-slonce"], "1–1.5 m", "Pachnące kwiaty w czerwcu — bardzo mrozoodporna."],
  ["hortensja-pnaca", "Hortensja pnąca", "Hydrangea anomala subsp. petiolaris", "pnacze", [[6, "peak"], [7, "light"]], ["bialy"], "mild", true, true, false, false, false, false, ["polcien", "cien"], "do 15 m", "Białe kwiaty latem — pnącze na północne ściany."],
  ["pigwowiec-japonski", "Pigwowiec japoński", "Chaenomeles japonica", "krzew", [[4, "peak"]], ["czerwony", "rozowy"], "mild", true, false, false, false, true, false, ["pelne-slonce", "polcien"], "1–1.5 m", "Czerwone kwiaty przed liśćmi — niskie, gęste krzewy."],
  ["cotoneaster", "Cotoneaster", "Cotoneaster lucidus", "krzew", [[5, "peak"], [6, "light"]], ["bialy", "rozowy"], "mild", true, false, false, false, true, true, ["pelne-slonce"], "2–3 m", "Białe kwiaty w maju — czarne jagody jesienią, żywopłot."],
  ["abelia", "Abelia", "Abelia × grandiflora", "krzew", [[6, "peak"], [7, "light"], [8, "light"], [9, "peak"]], ["bialy", "rozowy"], "mild", true, true, false, false, false, false, ["pelne-slonce"], "1–2 m", "Długie kwitnienie od lipca — delikatny zapach."],
  ["kalina-kuszczowa", "Kalina kuszczowa", "Viburnum lantana", "krzew", [[5, "peak"]], ["bialy"], "mild", true, false, false, false, true, true, ["pelne-slonce", "polcien"], "3–5 m", "Białe kwiaty w maju — czarne jagody i żółte liście jesienią."],
  ["tawula-nippon", "Tawułka japońska", "Spiraea nipponica", "krzew", [[5, "peak"], [6, "light"]], ["bialy"], "mild", true, true, false, false, false, false, ["pelne-slonce"], "1–1.5 m", "Obfite białe kwiaty w maju — niski, gęsty krzew."],
  ["bluszcz-kolczasty", "Bluszcz kolczasty", "Hedera helix", "pnacze", [[9, "peak"], [10, "light"]], ["zolty", "mieszany"], "mild", true, false, false, false, true, false, ["polcien", "cien"], "do 20 m", "Żółto-zielone kwiaty jesienią — pokrywa ściany i pnie."],
  ["euonymus", "Euonymus", "Euonymus fortunei", "krzew", [[5, "peak"], [6, "light"]], ["mieszany"], "none", true, false, false, false, true, true, ["pelne-slonce", "polcien"], "0.5–1 m", "Drobne kwiaty — zimozielony runiec lub żywopłot."],
  ["alchemilla", "Alchemilka", "Alchemilla mollis", "bylina", [[5, "peak"], [6, "light"], [7, "light"]], ["zolty", "mieszany"], "none", true, false, false, false, false, false, ["pelne-slonce", "polcien"], "30–50 cm", "Żółto-zielone kwiaty przez całe lato — srebrzyste liście."],
  ["monarda", "Monarda", "Monarda didyma", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["czerwony", "rozowy"], "strong", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "60–90 cm", "Czerwone kwiaty latem — intensywny zapach mięty."],
  ["pulmonaria", "Miodunka", "Pulmonaria officinalis", "bylina", [[4, "peak"], [5, "light"]], ["rozowy", "niebieski"], "none", true, true, false, false, false, false, ["polcien", "cien"], "20–30 cm", "Różowo-niebieskie kwiaty wiosną — plamiste liście."],
  ["geum", "Kuklik", "Geum chiloense", "bylina", [[5, "peak"], [6, "light"], [7, "light"]], ["pomaranczowy", "czerwony", "zolty"], "none", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "40–60 cm", "Pomarańczowe kwiaty od maja — długie kwitnienie."],
  ["helenium", "Helenium", "Helenium autumnale", "bylina", [[7, "peak"], [8, "light"], [9, "peak"]], ["zolty", "pomaranczowy", "czerwony"], "none", true, true, false, false, false, false, ["pelne-slonce"], "80–120 cm", "Jesienne kwiaty w odcieniach żółci i czerwieni."],
  ["heuchera", "Żurawka", "Heuchera", "bylina", [[5, "peak"], [6, "light"]], ["bialy", "rozowy"], "mild", true, true, false, false, false, true, ["polcien", "cien"], "30–50 cm", "Delikatne kwiaty nad kolorowymi liśćmi."],
  ["sanguisorba", "Sanguisorba", "Sanguisorba officinalis", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["czerwony", "rozowy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "60–100 cm", "Czerwone kwiatostany latem — architektoniczna forma."],
  ["scabiosa", "Szczyr", "Scabiosa columbaria", "bylina", [[6, "peak"], [7, "light"], [8, "light"], [9, "light"]], ["niebieski", "fioletowy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "40–60 cm", "Niebieskie kwiaty całe lato — motyle."],
  ["trollius", "Trollius", "Trollius europaeus", "bylina", [[5, "peak"], [6, "light"]], ["zolty"], "none", true, false, false, false, false, false, ["polcien"], "40–60 cm", "Złote miski kwiatów w maju — wilgotne stanowiska."],
  ["coreopsis", "Coreopsis", "Coreopsis verticillata", "bylina", [[6, "peak"], [7, "light"], [8, "light"], [9, "peak"]], ["zolty"], "none", true, true, false, false, false, false, ["pelne-slonce"], "40–60 cm", "Żółte kwiaty od czerwca do października."],
  ["gaillardia", "Gaillardia", "Gaillardia × grandiflora", "bylina", [[6, "peak"], [7, "light"], [8, "light"], [9, "peak"]], ["czerwony", "zolty", "pomaranczowy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "40–60 cm", "Dwukolorowe kwiaty całe lato — suszoodporna."],
  ["penstemon", "Penstemon", "Penstemon digitalis", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["bialy", "rozowy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "60–90 cm", "Białe dzwonkowate kwiaty latem."],
  ["digitalis", "Naparstnica", "Digitalis purpurea", "bylina", [[6, "peak"], [7, "light"]], ["rozowy", "fioletowy", "bialy"], "none", true, true, false, false, false, false, ["polcien"], "1–1.5 m", "Wysokie kwiatostany w czerwcu — cień i wilgoć."],
  ["baptisia", "Baptisia", "Baptisia australis", "bylina", [[5, "peak"], [6, "light"]], ["niebieski"], "none", true, false, false, false, false, false, ["pelne-slonce"], "1–1.5 m", "Niebieskie kwiaty w maju — głęboki korzeniowy system."],
  ["veronica", "Przetacznik długolistny", "Veronica longifolia", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["niebieski", "rozowy", "bialy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "60–90 cm", "Niebieskie kwiaty latem — wysokie kłosy."],
  ["wiesiolka", "Wiesiołek", "Oenothera biennis", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["zolty"], "mild", true, true, false, false, false, false, ["pelne-slonce"], "80–120 cm", "Żółte kwiaty wieczorem — motyle nocne."],
  ["geranium-bloody", "Geranium", "Geranium sanguineum", "bylina", [[5, "peak"], [6, "light"], [7, "light"]], ["rozowy", "czerwony"], "none", true, true, false, false, false, true, ["pelne-slonce", "polcien"], "30–40 cm", "Różowe kwiaty od maja — czerwone liście jesienią."],
  ["alstroemeria", "Alstremeria", "Alstroemeria aurea", "bylina", [[6, "peak"], [7, "light"], [8, "light"]], ["pomaranczowy", "zolty", "rozowy"], "none", true, false, false, false, false, false, ["pelne-slonce", "polcien"], "60–80 cm", "Kolorowe kwiaty latem — okazałe kwiaty cięte."],
  ["astilbe", "Astilbe", "Astilbe arendsii", "bylina", [[6, "peak"], [7, "light"]], ["rozowy", "bialy", "czerwony"], "mild", true, false, false, false, false, false, ["polcien", "cien"], "60–90 cm", "Puszyste kwiatostany w czerwcu — wilgotne cieniste miejsca."],
  ["epimedium", "Epimedium", "Epimedium × versicolor", "bylina", [[4, "peak"], [5, "light"]], ["zolty", "rozowy"], "none", true, false, false, false, false, true, ["polcien", "cien"], "20–40 cm", "Delikatne kwiaty wiosną — okazałe liście jesienią."],
  ["allium-ozdobne", "Czosnek ozdobny", "Allium giganteum", "cebula", [[5, "peak"], [6, "light"]], ["fioletowy"], "mild", true, true, false, false, false, false, ["pelne-slonce"], "1–1.5 m", "Fioletowe kule kwiatów w maju — architektoniczna forma."],
  ["gladiola", "Gladiola", "Gladiolus", "cebula", [[7, "peak"], [8, "light"]], ["czerwony", "rozowy", "fioletowy", "bialy"], "mild", true, false, false, false, false, false, ["pelne-slonce"], "80–120 cm", "Wysokie kwiaty latem — wykop bulwy na zimę."],
  ["freesja", "Frezja", "Freesia", "cebula", [[6, "peak"], [7, "light"]], ["zolty", "bialy", "rozowy"], "strong", true, false, false, false, false, false, ["pelne-slonce"], "30–40 cm", "Intensywnie pachnące kwiaty — doniczka lub grządka."],
  ["amaryllis", "Amarylis", "Hippeastrum", "cebula", [[12, "peak"], [1, "light"], [2, "light"]], ["czerwony", "rozowy", "bialy"], "none", false, false, false, true, false, false, ["pelne-slonce"], "40–60 cm", "Duże kwiaty zimą — wymuszenie w doniczce."],
  ["scilla", "Scylla", "Scilla siberica", "cebula", [[3, "peak"], [4, "light"]], ["niebieski"], "none", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "10–15 cm", "Niebieskie kwiaty wczesną wiosną — naturalizacja w trawniku."],
  ["brunera", "Brunnera", "Brunnera macrophylla", "bylina", [[4, "peak"], [5, "light"]], ["niebieski"], "none", true, true, false, false, false, false, ["polcien", "cien"], "30–40 cm", "Niebieskie kwiaty w kwietniu — srebrzyste liście."],
  ["cyclamen", "Cyklamen", "Cyclamen coum", "cebula", [[2, "peak"], [3, "light"]], ["rozowy", "bialy"], "mild", true, false, false, true, false, false, ["polcien"], "10–15 cm", "Różowe kwiaty zimą i wczesną wiosną."],
  ["ixia", "Ixia", "Ixia", "cebula", [[6, "peak"], [7, "light"]], ["czerwony", "rozowy", "zolty"], "mild", true, false, false, false, false, false, ["pelne-slonce"], "40–60 cm", "Kolorowe kwiaty latem — cebulki wymagają wykopu."],
  ["ranunculus", "Jaskier", "Ranunculus asiaticus", "cebula", [[5, "peak"], [6, "light"]], ["czerwony", "rozowy", "zolty", "bialy"], "none", true, false, false, false, false, false, ["pelne-slonce"], "30–40 cm", "Pełne kwiaty w maju — okazałe kwiaty cięte."],
  ["wisteria", "Glicynia chińska", "Wisteria sinensis", "pnacze", [[4, "peak"], [5, "light"]], ["fioletowy", "bialy", "rozowy"], "strong", true, true, false, false, false, false, ["pelne-slonce"], "do 10 m", "Fioletowe grona w maju — intensywny zapach."],
  ["akebia", "Akebia", "Akebia quinata", "pnacze", [[4, "peak"], [5, "light"]], ["fioletowy"], "mild", true, false, false, false, true, false, ["pelne-slonce", "polcien"], "do 8 m", "Fioletowe kwiaty wiosną — egzotyczne owoce jesienią."],
  ["campsis", "Milin", "Campsis radicans", "pnacze", [[7, "peak"], [8, "light"], [9, "peak"]], ["pomaranczowy", "czerwony"], "none", true, true, false, false, false, false, ["pelne-slonce"], "do 10 m", "Pomarańczowe trąbki latem — szybki wzrost."],
  ["ipomoea", "Wilec", "Ipomoea purpurea", "roczna", [[7, "peak"], [8, "light"], [9, "peak"]], ["fioletowy", "rozowy", "bialy"], "mild", true, true, false, false, false, false, ["pelne-slonce"], "2–3 m", "Fioletowe kwiaty latem — roczne pnącze na kratę."],
  ["celosia", "Celozja", "Celosia argentea", "roczna", [[7, "peak"], [8, "light"], [9, "light"]], ["czerwony", "zolty", "rozowy"], "none", true, false, false, false, false, false, ["pelne-slonce"], "30–60 cm", "Płomienne kwiaty latem — roślina jednoroczna."],
  ["begonia", "Begonia", "Begonia semperflorens", "roczna", [[6, "peak"], [7, "light"], [8, "light"], [9, "peak"]], ["rozowy", "czerwony", "bialy"], "none", true, false, false, false, false, false, ["polcien"], "20–30 cm", "Kwitnienie od czerwca — rabaty w półcieniu."],
  ["bratek", "Bratek", "Viola × wittrockiana", "roczna", [[4, "peak"], [5, "light"], [9, "peak"], [10, "light"]], ["fioletowy", "zolty", "bialy", "niebieski"], "mild", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "15–25 cm", "Kwitnienie wiosną i jesienią — mrozoodporny."],
  ["cosmos", "Kosmos", "Cosmos bipinnatus", "roczna", [[7, "peak"], [8, "light"], [9, "peak"]], ["rozowy", "bialy", "fioletowy"], "none", true, true, false, false, false, false, ["pelne-slonce"], "80–120 cm", "Różowe kwiaty latem — motyle i pszczoły."],
  ["eschscholzia", "Kalifornia", "Eschscholzia californica", "roczna", [[6, "peak"], [7, "light"], [8, "light"], [9, "peak"]], ["pomaranczowy", "zolty"], "none", true, true, false, false, false, false, ["pelne-slonce"], "30–40 cm", "Pomarańczowe maki latem — samosiew."],
  ["nemesia", "Nemezja", "Nemesia strumosa", "roczna", [[5, "peak"], [6, "light"], [7, "light"], [8, "light"]], ["niebieski", "rozowy", "bialy", "zolty"], "mild", true, true, false, false, false, false, ["pelne-slonce", "polcien"], "20–30 cm", "Kolorowe kwiaty od maja — doniczka i rabata."],
  ["agastache", "Agastache", "Agastache foeniculum", "bylina", [[7, "peak"], [8, "light"], [9, "peak"]], ["fioletowy", "niebieski"], "strong", true, true, true, false, false, false, ["pelne-slonce"], "60–90 cm", "Fioletowe kwiaty latem — miodunka dla pszczół."],
];

const lines = plants.map((p) => {
  const [id, name, latin, cat, bloom, colors, scent, bee, bfly, honey, winter, fruit, autumn, light, height, desc] = p;
  const bloomStr = bloom.map(([m, i]) => `[${m}, "${i}"]`).join(", ");
  const colorStr = colors.map((c) => `"${c}"`).join(", ");
  const lightStr = light.map((l) => `"${l}"`).join(", ");
  return `  {
    id: "${id}",
    name: "${name}",
    latinName: "${latin}",
    category: "${cat}",
    bloomMonths: bm(${bloomStr}),
    colors: [${colorStr}],
    scent: "${scent}",
    beeFriendly: ${bee},
    butterflyFriendly: ${bfly},
    honeyPlant: ${honey},
    winterBloom: ${winter},
    ornamentalFruit: ${fruit},
    autumnColor: ${autumn},
    light: [${lightStr}],
    height: "${height}",
    description: "${desc}",
  }`;
});

const content = `import type { BloomIntensity, FloweringPlant } from "./flowering-plants";

function bm(...entries: [number, BloomIntensity][]) {
  return Object.fromEntries(entries) as Partial<Record<number, BloomIntensity>>;
}

/** Faza 3 — rozbudowa do 200+ gatunków */
export const FLOWERING_PLANTS_PHASE3: FloweringPlant[] = [
${lines.join(",\n")}
];
`;

const out = new URL("../src/lib/constants/flowering-plants-phase3.ts", import.meta.url);
fs.writeFileSync(out, content);
console.log("Generated", plants.length, "plants ->", out.pathname);
