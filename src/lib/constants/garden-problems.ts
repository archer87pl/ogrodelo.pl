export type ProblemPlantType =
  | "tuja"
  | "trawnik"
  | "hortensja"
  | "funkia"
  | "jablon"
  | "roz"
  | "lawenda"
  | "bukszpan"
  | "laurowisnia"
  | "warzywa"
  | "bluszcz"
  | "ogolne";

export type CauseProbability = "wysokie" | "srednie" | "niskie";

export interface GardenProblemCause {
  name: string;
  probability: CauseProbability;
  fix: string;
}

export interface GardenProblem {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  plantTypes: ProblemPlantType[];
  symptoms: string[];
  intro: string;
  causes: GardenProblemCause[];
  actionPlan: string[];
  prevention: string[];
  relatedTools: { href: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export const PROBLEM_PLANT_LABELS: Record<ProblemPlantType, string> = {
  tuja: "Tuja / żywotnik",
  trawnik: "Trawnik",
  hortensja: "Hortensja",
  funkia: "Funkia / hosta",
  jablon: "Jabłoń / drzewo owocowe",
  roz: "Róża",
  lawenda: "Lawenda",
  bukszpan: "Bukszpan",
  laurowisnia: "Laurowiśnia",
  warzywa: "Warzywa / pomidory",
  bluszcz: "Bluszcz",
  ogolne: "Inne / ogólnie",
};

export const GARDEN_PROBLEMS: GardenProblem[] = [
  {
    slug: "brunatne-koncowki-tui",
    title: "Brązowe końcówki tui — przyczyny i ratunek",
    description:
      "Dlaczego tuja ma brązowe końcówki? Susza, mróz, choroba grzybowa i zasolenie gleby — diagnoza objawów i plan naprawczy krok po kroku.",
    keywords: [
      "brązowe końcówki tui",
      "tuja brązowe gałązki",
      "suszenie tui",
      "choroba tui",
    ],
    plantTypes: ["tuja"],
    symptoms: ["brązowe końcówki", "suszenie igieł", "żółknięcie"],
    intro:
      "Brązowe końcówki u tui to jeden z najczęstszych problemów w polskich ogrodach. Objaw może oznaczać suszę letnią, uszkodzenia mrozowe, zasolenie po nawozie lub początek choroby grzybowej — każda przyczyna wymaga innego działania.",
    causes: [
      {
        name: "Susza letnia / niedowodnienie",
        probability: "wysokie",
        fix: "Podlewaj głęboko 1–2× tygodniowo (20–30 l/m²), mulczuj korę. Unikaj płytkiego codziennego podlewania.",
      },
      {
        name: "Uszkodzenia mrozowe i wiatr zimowy",
        probability: "wysokie",
        fix: "Usuń suche fragmenty w marcu–kwietniu. Jesienią podlej przed zamarznięciem gleby i osłoń agrowłókniną przy młodych nasadzeniach.",
      },
      {
        name: "Choroba grzybowa (mikrodochium, kabatina)",
        probability: "srednie",
        fix: "Przycinaj chore gałązki do zdrowego drewna, dezynfekuj narzędzia. Rozważ zamienniki odporne — ostrokrzew, cis.",
      },
      {
        name: "Zasolenie gleby (nawóz, śnieg z solą)",
        probability: "srednie",
        fix: "Spłucz glebę obfitym podlewaniem wiosną. Nie stosuj nawozów chlorkowych przy żywopłocie.",
      },
    ],
    actionPlan: [
      "Oceń, czy brąz dotyczy tylko końcówek czy całych pędów — końcówki często = susza lub mróz.",
      "Sprawdź wilgotność gleby na głębokości 10 cm — sucha = podlewanie.",
      "Usuń chore fragmenty nożycami, dezynfekuj ostrze po każdym cięciu.",
      "Jeśli choroba postępuje mimo pielęgnacji — rozważ wymianę na ostrokrzew lub laurowiśnię.",
    ],
    prevention: [
      "Podlewaj rzadko, ale obficie — korzenie schodzą głębiej.",
      "Nie sadź tui w rowach bez odpływu wody.",
      "Monitoruj żywopłot od marca — wczesna interwencja ratuje rośliny.",
    ],
    relatedTools: [
      { href: "/alternatywy-dla-tui", label: "Alternatywy dla tui" },
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      { href: "/porownywarka-krzewow/tuja-vs-ostrokrzew", label: "Tuja vs ostrokrzew" },
    ],
    faq: [
      {
        question: "Czy brązowe tuje odrastają?",
        answer:
          "Lekkie uszkodzenia mrozowe i susza — tak, po przycięciu i podlewaniu. Przy chorobie grzybowej całe pędy często giną — wtedy lepiej wymienić roślinę.",
      },
      {
        question: "Kiedy przycinać brązowe tuje?",
        answer: "Najlepiej marzec–kwiecień, gdy roślina budzi się ze spoczynku. Unikaj cięcia w pełnym słońcu letnim.",
      },
    ],
  },
  {
    slug: "choroba-tui-grzybica",
    title: "Choroba tui — objawy grzybicy i co zrobić",
    description:
      "Tuja choruje na grzyby — brązowienie od wewnątrz żywopłotu, opad igieł, czarne plamki. Jak rozpoznać chorobę i kiedy wymienić nasadzenia.",
    keywords: ["choroba tui", "grzybica tui", "mikrodochium", "tuja choruje"],
    plantTypes: ["tuja"],
    symptoms: ["brązowienie od środka", "opad igieł", "czarne plamki"],
    intro:
      "Choroby grzybowe tui (mikrodochium, kabatina) atakują coraz częściej w wilgotnych, słabo przewiewnych żywopłotach. Brązowienie zaczyna się od wewnątrz, a nie od końcówek — to ważna różnica diagnostyczna.",
    causes: [
      {
        name: "Mikrodochium (brunatna plamistość)",
        probability: "wysokie",
        fix: "Usuń chore rośliny, nie kompostuj. Zwiększ rozstaw sadzenia przy nowym żywopłocie. Rozważ ostrokrzew lub cis.",
      },
      {
        name: "Kabatina (opadanie pędów)",
        probability: "srednie",
        fix: "Przycinaj do zdrowego drewna, popraw drenaż. Unikaj zraszania liści.",
      },
      {
        name: "Zbyt gęste nasadzenie",
        probability: "wysokie",
        fix: "Przerzedź żywopłot lub zaplanuj luźniejszy rozstaw (3–4 szt./mb zamiast 5–6).",
      },
    ],
    actionPlan: [
      "Sprawdź, czy brąz pojawia się od środka żywopłotu — typowe dla grzybicy.",
      "Usuń i spal lub wywieź chore rośliny — nie kompostuj.",
      "Zdezynfekuj narzędzia 10% roztworem wybielacza.",
      "Przy poważnym zniszczeniu — planuj wymianę na gatunki odporne.",
    ],
    prevention: [
      "Sadź w przewiewnym miejscu, nie w cieniu wilgotnym.",
      "Nie podlewaj liści — tylko korzeń.",
      "Wybieraj odmiany odporne lub alternatywy.",
    ],
    relatedTools: [
      { href: "/alternatywy-dla-tui", label: "Alternatywy dla tui" },
      { href: "/porownywarka-krzewow/laurowisnia-vs-tuja", label: "Tuja vs laurowiśnia" },
    ],
    faq: [
      {
        question: "Czy można uratować chore tuje?",
        answer:
          "Pojedyncze chore pędy — czasem tak, po agresywnym cięciu. Rozległa infekcja w gęstym żywopłocie — praktycznie nie, bo grzyb pozostaje w glebie i sąsiednich roślinach.",
      },
    ],
  },
  {
    slug: "dziury-w-lisciach-funkii",
    title: "Dziury w liściach funkii — ślimaki, choroby, mróz",
    description:
      "Dlaczego funkia (hosta) ma dziury w liściach? Ślimaki, grad, plamistość i uszkodzenia mrozowe — rozpoznaj przyczynę po wyglądzie uszkodzeń.",
    keywords: [
      "dziury w liściach funkii",
      "hosta dziury",
      "ślimaki na funkii",
      "funkia choruje",
    ],
    plantTypes: ["funkia"],
    symptoms: ["dziury w liściach", "poszarpane brzegi", "plamy na liściach"],
    intro:
      "Funkie w cieniu są magnesem na ślimaki — to najczęstsza przyczyna dziur. Plamiste uszkodzenia mogą też wynikać z chorób grzybowych lub gradu wiosennego.",
    causes: [
      {
        name: "Ślimaki i ślimaki lądowe",
        probability: "wysokie",
        fix: "Pułapki na ślimaki, żwirek wokół roślin, ręczne zbieranie wieczorem. Ferom owocowy jako pułapka.",
      },
      {
        name: "Grad wiosenny",
        probability: "srednie",
        fix: "Usuń najbardziej uszkodzone liście — nowe wyrośnie w sezonie. Osłoń przy prognozie gradu.",
      },
      {
        name: "Plamistość liści (grzyby)",
        probability: "niskie",
        fix: "Usuń chore liście, nie zraszaj wieczorem. Popraw przewiew między roślinami.",
      },
    ],
    actionPlan: [
      "Sprawdź ślady śluzu na liściach i glebie — ślimaki.",
      "Dziury od środka liścia z brązową obwódką — często choroba.",
      "Nierówne, poszarpane brzegi — typowo ślimaki.",
      "Wieczorem obejrzyj rośliny z latarką — zbierz szkodniki.",
    ],
    prevention: [
      "Mulcz z wapnem lub piaskiem odstrasza ślimaki.",
      "Sadź funkie dalej od wilgotnych murów i kostki.",
      "Wiosną stosuj pułapki przed wyrastaniem liści.",
    ],
    relatedTools: [
      { href: "/katalog-kwitnienia", label: "Katalog kwitnienia" },
      { href: "/kalkulator-cienia", label: "Kalkulator cienia" },
    ],
    faq: [
      {
        question: "Czy dziurawe liście funkii odrastają?",
        answer: "Tak — w sezonie wegetacyjnym wyrastają nowe liście. Usuń mocno uszkodzone, by poprawić wygląd rabaty.",
      },
    ],
  },
  {
    slug: "mech-w-trawniku",
    title: "Mech w trawniku — przyczyny i jak się pozbyć",
    description:
      "Mech w trawniku oznacza kwaśną glebę, cień lub zagęszczenie darń. Wertykulacja, wapnowanie i poprawa nasłonecznienia — plan krok po kroku.",
    keywords: [
      "mech w trawniku",
      "jak usunąć mech z trawnika",
      "mech na trawie",
      "wapnowanie trawnika",
    ],
    plantTypes: ["trawnik"],
    symptoms: ["mech na trawie", "żółta trawa w cieniu", "zagęszczona darń"],
    intro:
      "Mech nie konkuruje z trawą na równych warunkach — wygrywa tam, gdzie trawa jest osłabiona: w cieniu, na kwaśnej glebie, przy zbyt płytkim koszeniu lub zaleganiu wody.",
    causes: [
      {
        name: "Zbyt kwaśna gleba (pH < 6)",
        probability: "wysokie",
        fix: "Wapnuj wiosną lub jesienią — 1–2 kg wapna na 10 m². Powtórz test gleby po roku.",
      },
      {
        name: "Cień drzew i budynków",
        probability: "wysokie",
        fix: "Przerzedź korony drzew lub wybierz mieszankę traw cieniolubnych. Mech w głębokim cieniu — rozważ rabatę zamiast trawnika.",
      },
      {
        name: "Zagęszczona darń i filc",
        probability: "srednie",
        fix: "Wertykulacja wiosną, aeracja, nawożenie azotem po wertykulacji.",
      },
      {
        name: "Zbyt płytkie koszenie",
        probability: "srednie",
        fix: "Kosź na wysokości min. 4–5 cm — nie skracaj więcej niż 1/3 długości naraz.",
      },
    ],
    actionPlan: [
      "Wiosną: wertykulacja + wapnowanie (jeśli pH niskie).",
      "Kwiecień–maj: nawóz azotowy, podlewanie w suszy.",
      "Jesienią: ponowna wertykulacja przy silnym mchu.",
      "Oceń nasłonecznienie — mech wraca, jeśli cień pozostaje.",
    ],
    prevention: [
      "Koszenie na 4–5 cm, regularne nawożenie.",
      "Test pH co 2–3 lata.",
      "Aeracja co 2 lata na ciężkich glebach.",
    ],
    relatedTools: [
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
      { href: "/kalkulator-wapnowania", label: "Kalkulator wapnowania" },
      { href: "/kalkulator-nawadniania/trawnik", label: "Nawadnianie trawnika" },
    ],
    faq: [
      {
        question: "Kiedy wapnować trawnik z mchem?",
        answer:
          "Wiosną (marzec–kwiecień) lub wczesną jesienią — po wertykulacji. Nie łącz wapnowania z nawozem azotowym w tym samym tygodniu.",
      },
    ],
  },
  {
    slug: "zolkniecie-trawy",
    title: "Żółknięcie trawy — susza, choroby, nawóz",
    description:
      "Trawa żółknie z wielu powodów: przelanie, susza, niedobór azotu, choroby grzybowe. Jak odróżnić objawy i co zrobić w każdym przypadku.",
    keywords: [
      "żółta trawa",
      "żółknięcie trawnika",
      "trawa żółknie",
      "susza trawnik",
    ],
    plantTypes: ["trawnik"],
    symptoms: ["żółte plamy", "suszenie trawy", "wilgotna żółta trawa"],
    intro:
      "Żółte plamy na trawniku mogą oznaczać suszę, przelanie, niedobór składników lub chorobę. Klucz to dotyk i wilgotność gleby — sucha żółć to susza, mokra i śliska to często grzyb lub przelewanie.",
    causes: [
      {
        name: "Susza letnia",
        probability: "wysokie",
        fix: "Podlewaj 20–30 mm naraz, 2–3× tygodniowo rano. Nie kosź w upał.",
      },
      {
        name: "Przelanie / słaby drenaż",
        probability: "srednie",
        fix: "Ogranicz podlewanie, aeracja, popraw odpływ. Żółć od korzenia przy mokrej glebie.",
      },
      {
        name: "Niedobór azotu",
        probability: "srednie",
        fix: "Nawóz azotowy wiosną i po wertykulacji — ok. 20–30 g N na m².",
      },
      {
        name: "Choroba (rhizoctonia, dollar spot)",
        probability: "niskie",
        fix: "Popraw nawożenie i podlewanie rano. Przy powtarzających się plamach — fungicyd ogrodniczy.",
      },
    ],
    actionPlan: [
      "Sprawdź wilgotność gleby — sucha = podlewanie, mokra = ogranicz wodę.",
      "Oceń wzorzec plam — okrągłe plamy często choroba, równomierna żółć susza.",
      "Nawieź azotem, jeśli trawa wyblakła po zimie.",
      "Nie kosź żółtej trawy poniżej 4 cm.",
    ],
    prevention: [
      "Głębokie, rzadsze podlewanie.",
      "Regularne nawożenie sezonowe.",
      "Wertykulacja zapobiega chorobom w filcu.",
    ],
    relatedTools: [
      { href: "/kalkulator-nawadniania/trawnik", label: "Nawadnianie trawnika" },
      { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
    ],
    faq: [
      {
        question: "Czy żółta trawa odżyje?",
        answer:
          "Przy suszy i niedoborze azotu — tak, w 2–4 tygodnie. Przy długotrwałym przelaniu lub chorobie korzeni — może wymagać wysiewu ubytków.",
      },
    ],
  },
  {
    slug: "chloroza-hortensji",
    title: "Chloroza hortensji — żółte liście z zielonymi żyłkami",
    description:
      "Hortensja ma żółte liście? Chloroza z żelaza, złe pH gleby lub przelanie — jak rozpoznać i leczyć żółknięcie liści hortensji.",
    keywords: [
      "żółte liście hortensji",
      "chloroza hortensji",
      "hortensja żółknie",
      "niedobór żelaza hortensja",
    ],
    plantTypes: ["hortensja"],
    symptoms: ["żółte liście", "zielone żyłki", "opad liści"],
    intro:
      "Chloroza hortensji to charakterystyczne żółknięcie liści z zachowanymi zielonymi żyłkami — klasyczny objaw niedoboru żelaza lub zbyt wysokiego pH gleby, przez co roślina nie pobiera żelaza.",
    causes: [
      {
        name: "Zbyt wysokie pH gleby (zasadowa)",
        probability: "wysokie",
        fix: "Podkwas glik glebę siarczanem żelaza lub chelatami. Mulcz z kory sosnowej.",
      },
      {
        name: "Przelanie / zimne, wilgotne korzenie",
        probability: "srednie",
        fix: "Popraw drenaż, podlewaj rzadziej. Sadź na wzniesieniu przy ciężkiej glinie.",
      },
      {
        name: "Niedobór azotu (jednolita żółć)",
        probability: "srednie",
        fix: "Nawóz wieloskładnikowy dla roślin kwasolubnych wiosną.",
      },
    ],
    actionPlan: [
      "Sprawdź wzorzec: żółte liście + zielone żyłki = chloroza żelazowa.",
      "Zmierz pH — hortensje preferują 5,0–6,0.",
      "Zastosuj chelat żelaza lub siarczan żelaza według etykiety.",
      "Mulczuj korą sosnową, unikaj wapnowania w pobliżu.",
    ],
    prevention: [
      "Regularne podkwaszanie gleby u hortensji.",
      "Podlewanie rano, nie wieczorem.",
      "Nawóz dla roślin kwasolubnych 2× w sezonie.",
    ],
    relatedTools: [
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      { href: "/kalkulator-wapnowania", label: "Kalkulator wapnowania" },
      { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
    ],
    faq: [
      {
        question: "Jak szybko zielenią się liście hortensji po nawozie?",
        answer: "Chelat żelaza działa w 1–2 tygodnie. Poprawa pH gleby to proces wielomiesięczny.",
      },
    ],
  },
  {
    slug: "mszyce-na-rozach",
    title: "Mszyce na różach — jak zwalczyć i zapobiec",
    description:
      "Mszyce na pąkach i młodych pędach róż — przyczyny naporu wiosną, metody biologiczne i mechaniczne, kiedy interweniować.",
    keywords: ["mszyce na różach", "mszyce róża", "jak pozbyć się mszyc", "szkodniki róż"],
    plantTypes: ["roz"],
    symptoms: ["mszyce na pędach", "lepkie liście", "zwinięte liście"],
    intro:
      "Mszyce wiosną atakują soczyste pędy róż — ssą sok, zwijają liście i wydzielają spadziś, na której rozwija się sadza. Wczesne działanie chroni kwitnienie.",
    causes: [
      {
        name: "Napor wiosenny mszyc",
        probability: "wysokie",
        fix: "Zmyj strugą wody, użyj preparatu z mydłem potasowym. Biedronki i złotooki — sojusznicy.",
      },
      {
        name: "Zbyt azotowe nawożenie",
        probability: "srednie",
        fix: "Ogranicz azot — miękkie pędy przyciągają szkodniki. Preferuj nawóz zrównoważony.",
      },
      {
        name: "Brak naturalnych drapieżników",
        probability: "srednie",
        fix: "Sadź byliny melliferowe, unikaj szerokospektralnych insektycydów.",
      },
    ],
    actionPlan: [
      "Obserwuj pąki od kwietnia — pierwsze kolonie łatwo zmyć wodą.",
      "Przy większej skali — mydło potasowe lub olej mineralny (nie w słońcu).",
      "Usuń mocno zaatakowane pędy.",
      "Nie stosuj chemii w okresie kwitnienia — szkodzi pszczołom.",
    ],
    prevention: [
      "Zimowe przycinanie i usuwanie starych liści.",
      "Różnorodność roślin w ogrodzie = więcej biedronek.",
      "Unikaj nadmiaru azotu.",
    ],
    relatedTools: [
      { href: "/katalog-kwitnienia", label: "Katalog kwitnienia" },
      { href: "/kalendarz-ogrodnika/przycinanie-roz", label: "Cięcie róż w kalendarzu" },
    ],
    faq: [
      {
        question: "Czy mszyce zabijają róże?",
        answer:
          "Pojedynczy atak rzadko — ale osłabiają roślinę i przenoszą wirusy. Silna kolonia może zniekształcić kwiaty i pędy.",
      },
    ],
  },
  {
    slug: "przypalona-lawenda",
    title: "Przypalona lawenda — żółte liście po zimie",
    description:
      "Lawenda żółknie i brązowieje po zimie? Mróz, przelanie i zbyt późne cięcie — jak ratować lawendę i kiedy wymienić.",
    keywords: [
      "lawenda żółknie",
      "przypalona lawenda",
      "lawenda po zimie",
      "lawenda brązowe liście",
    ],
    plantTypes: ["lawenda"],
    symptoms: ["żółte liście", "brązowe pędy", "zimowe uszkodzenia"],
    intro:
      "Lawenda w polskim klimacie jest na granicy mrozoodporności — zimy bez śniegu i wiosenne przymrozki często powodują żółknięcie i brązowienie. Przelanie zimą dodatkowo pogarsza sytuację.",
    causes: [
      {
        name: "Uszkodzenia mrozowe",
        probability: "wysokie",
        fix: "Przytnij do zdrowego drewna w kwietniu — nie w marcu przy mrozach. Osłoń agrowłókniną przy -15°C i poniżej.",
      },
      {
        name: "Przelanie zimą",
        probability: "srednie",
        fix: "Popraw drenaż, nie podlewaj na mrozie. Lawenda woli sucho.",
      },
      {
        name: "Zbyt późne cięcie jesienią",
        probability: "srednie",
        fix: "Cięcie tylko po kwitnieniu (sierpień) — jesienne cięcie stymuluje młode pędy wrażliwe na mróz.",
      },
    ],
    actionPlan: [
      "Kwietniu: usuń chore fragmenty, przytnij do zdrowego zielonego drewna.",
      "Jeśli brak zieleni na pędzie — wyrwij i posadź nową.",
      "Nie nawoź intensywnie — lawenda lubi ubogie gleby.",
    ],
    prevention: [
      "Sadź na przepuszczalnej, słabo żyznej glebie.",
      "Osłoń na zimę przy młodych nasadzeniach.",
      "Cięcie po kwitnieniu, nie jesienią.",
    ],
    relatedTools: [
      { href: "/kalkulator-nawadniania", label: "Kalkulator nawadniania" },
      { href: "/katalog-kwitnienia", label: "Katalog kwitnienia" },
    ],
    faq: [
      {
        question: "Czy lawenda odrasta po mrozie?",
        answer:
          "Lekkie uszkodzenia — tak, po przycięciu w kwietniu. Jeśli cały krzew jest brązowy bez zieleni — zwykle ginie.",
      },
    ],
  },
  {
    slug: "kruche-liscie-bukszpanu",
    title: "Kruche liście bukszpanu — choroba i susza",
    description:
      "Bukszpan traci liście, ma czarne plamki lub kruche pędy? Cylindrokarpium, susza i zbyt gęste cięcie — diagnoza i leczenie.",
    keywords: [
      "bukszpan choroba",
      "cylindrokarpium",
      "bukszpan traci liście",
      "choroba bukszpanu",
    ],
    plantTypes: ["bukszpan"],
    symptoms: ["opad liści", "czarne plamki", "kruche pędy"],
    intro:
      "Bukszpan w Polsce jest atakowany przez grzyba cylindrokarpium — czarne plamki na liściach i opadanie. Susza i zbyt gęste cięcie osłabiają odporność.",
    causes: [
      {
        name: "Cylindrokarpium (bukszpanowa plamistość)",
        probability: "wysokie",
        fix: "Usuń chore liście, nie kompostuj. Zwiększ rozstaw, popraw przewiew. Rozważ berberys jako zamiennik.",
      },
      {
        name: "Susza letnia",
        probability: "srednie",
        fix: "Podlewaj młode nasadzenia w pierwsze 2 lata. Mulczuj korę.",
      },
      {
        name: "Zbyt gęste, częste cięcie",
        probability: "srednie",
        fix: "Cięcie max 2× rocznie, zostaw luźniejszą strukturę.",
      },
    ],
    actionPlan: [
      "Zbierz i spal opadłe liście — źródło zarazy.",
      "Przerzedź żywopłot dla przewiewu.",
      "Przy powtarzającej się chorobie — planuj wymianę na berberys lub ostrokrzew.",
    ],
    prevention: [
      "Wybieraj odmiany odporne (np. Buxus microphylla).",
      "Nie sadź w wilgotnym zacienieniu.",
      "Dezynfekuj nożyce między roślinami.",
    ],
    relatedTools: [
      { href: "/porownywarka-krzewow/berberys-vs-bukszpan", label: "Berberys vs bukszpan" },
      { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
    ],
    faq: [
      {
        question: "Czy można uratować chorego bukszpanu?",
        answer:
          "Wczesna infekcja — czasem po agresywnym cięciu i poprawie warunków. Rozległa choroba w żywopłocie — praktycznie wymaga wymiany gatunku.",
      },
    ],
  },
  {
    slug: "mrozowe-uszkodzenia-laurowisni",
    title: "Mrozowe uszkodzenia laurowiśni — brązowe liście",
    description:
      "Laurowiśnia ma brązowe liście po zimie? Przymrozki wiosenne, wiatr i brak śniegu — jak przycinać i regenerować żywopłot.",
    keywords: [
      "laurowiśnia brązowe liście",
      "laurowiśnia po zimie",
      "mrozowe uszkodzenia laurowiśnia",
    ],
    plantTypes: ["laurowisnia"],
    symptoms: ["brązowe liście", "czarne liście po mrozie", "suszenie pędów"],
    intro:
      "Laurowiśnia jest zimozielona, ale w ostrej zimie bez osłony liście brązowieją lub czernieją. Wiosenne przymrozki po łagodnej zimie też uszkadzają młode przyrosty.",
    causes: [
      {
        name: "Przymrozki wiosenne",
        probability: "wysokie",
        fix: "Nie przycinaj od razu — poczekaj do majowego ocieplenia. Usuń czarne liście w maju–czerwcu.",
      },
      {
        name: "Wiatr zimowy bez śniegu",
        probability: "srednie",
        fix: "Osłoń młode nasadzenia agrowłókniną. Podlej przed zamarznięciem jesienią.",
      },
      {
        name: "Choroba grzybowa (shothole)",
        probability: "niskie",
        fix: "Dziurawe liście z brązową obwódką — usuń, popraw przewiew, nie zraszaj wieczorem.",
      },
    ],
    actionPlan: [
      "Maj: oceń, które pędy są martwe (pociągnij — łamią się).",
      "Przytnij do zdrowego drewna formująco.",
      "Nawieź nawozem wieloskładnikowym po cięciu.",
    ],
    prevention: [
      "Wybieraj odmiany mrozoodporne (np. 'Caucasica').",
      "Jesienne podlewanie przed zimą.",
      "Osłona przy ekspozycji na wiatr.",
    ],
    relatedTools: [
      { href: "/kalkulator-zywoplotu/laurowisnia", label: "Żywopłot z laurowiśni" },
      { href: "/porownywarka-krzewow/laurowisnia-vs-tuja", label: "Laurowiśnia vs tuja" },
    ],
    faq: [
      {
        question: "Kiedy przycinać laurowiśnię po zimie?",
        answer: "Maj–czerwiec, gdy minie ryzyko przymrozków i widać, które pędy ożyły.",
      },
    ],
  },
  {
    slug: "plamistosc-lisci-jabloni",
    title: "Plamistość liści jabłoni — choroby i pielęgnacja",
    description:
      "Czarne, brązowe plamy na liściach jabłoni — parch, mączniak, opad liści. Program ochrony i zasady sanitarne w sadzie.",
    keywords: [
      "plamy na liściach jabłoni",
      "parch jabłoni",
      "choroby jabłoni",
      "jabłoń opada liście",
    ],
    plantTypes: ["jablon"],
    symptoms: ["plamy na liściach", "opad liści", "brązowe krawędzie liści"],
    intro:
      "Jabłonie w wilgotnym lecie chorują na parcho i mączniaka — plamy na liściach prowadzą do przedwczesnego opadu i słabszego owocowania. Profilaktyka od jesieni jest skuteczniejsza niż leczenie w lipcu.",
    causes: [
      {
        name: "Parch jabłoni (Venturia)",
        probability: "wysokie",
        fix: "Usuń opadłe liście jesienią. Oprysk miedziowy wczesną wiosną przed pąkami. Wybieraj odmiany odporne.",
      },
      {
        name: "Mączniak prawdziwy",
        probability: "srednie",
        fix: "Przerzedź koronę, popraw przewiew. Oprysk siarką lub preparatami do mączniaka.",
      },
      {
        name: "Niedobór wapnia (gorzka plamistość)",
        probability: "niskie",
        fix: "Oprysk wapniowy w okresie wzrostu owoców.",
      },
    ],
    actionPlan: [
      "Jesień: zbierz wszystkie liście spod drzewa.",
      "Wiosna: oprysk miedziowy przed pęknięciem pąków.",
      "Lato: monitoruj — przy mokrej pogodzie ryzyko rośnie.",
      "Przerzedź koronę co 2–3 lata.",
    ],
    prevention: [
      "Odmiany odporne (np. 'Freedom', 'Topaz').",
      "Nie sadź w zacienionym, wilgotnym miejscu.",
      "Rotacja — nie kompostuj chorych liści.",
    ],
    relatedTools: [
      { href: "/kalendarz-ogrodnika/przycinanie-jabloni", label: "Cięcie jabłoni" },
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu drzew" },
    ],
    faq: [
      {
        question: "Czy chore liście jabłoni wpływają na owoce?",
        answer:
          "Silna infekcja osłabia drzewo i może zmniejszyć plon. Wczesny opad liści = mniej cukrów w jabłkach.",
      },
    ],
  },
  {
    slug: "wyleganie-trawnika",
    title: "Wyleganie trawnika — żółte plamy po nacisku",
    description:
      "Trawnik wylega po meblach, zabawach i śniegu — jak naprawić ubytki i wzmocnić darń przed kolejnym sezonem.",
    keywords: [
      "wyleganie trawnika",
      "żółte plamy na trawie",
      "naprawa trawnika",
      "wysiew trawnika",
    ],
    plantTypes: ["trawnik"],
    symptoms: ["żółte plamy pod meblami", "ubytki w trawniku", "zagęszczona trawa wokół plam"],
    intro:
      "Wyleganie to zgniatanie źdźbeł bez dostępu do światła — meble ogrodowe, basen dmuchany, śnieg na jednym miejscu. Trawa regeneruje się, jeśli nacisk zniknie szybko — po tygodniach zostają gołe plamy.",
    causes: [
      {
        name: "Długotrwały nacisk (meble, zabawki)",
        probability: "wysokie",
        fix: "Przesuwaj meble co kilka dni. Po sezonie — wertykulacja i wysiew ubytków.",
      },
      {
        name: "Śnieg i lód na jednym miejscu",
        probability: "srednie",
        fix: "Wiosną aeracja i wysiew. Nie chodź po mroźnym trawniku.",
      },
      {
        name: "Słaba darń (rzadka trawa)",
        probability: "srednie",
        fix: "Wysiew + nawóz startowy wiosną. Regularne koszenie na 4–5 cm.",
      },
    ],
    actionPlan: [
      "Usuń źródło nacisku.",
      "Wertykuluj plamę, wysiej mieszankę traw.",
      "Podlewaj codziennie lekko przez 2 tygodnie po wysiewie.",
      "Nawieź startowym nawozem do trawnika.",
    ],
    prevention: [
      "Rotacja mebogrodowych na tarasie zamiast trawnika pod leżakiem.",
      "Ścieżki z kostki w miejscach ruchu.",
      "Jesienna regeneracja trawnika.",
    ],
    relatedTools: [
      { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
      { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
    ],
    faq: [
      {
        question: "Jak szybko odrasta wylegający trawnik?",
        answer:
          "Lekkie wyleganie (1–3 dni) — kilka dni. Gołe plamy wymagają wysiewu — pełna regeneracja 3–6 tygodni.",
      },
    ],
  },
  {
    slug: "zaraza-ogniskowa-pomidorow",
    title: "Zaraza późna pomidorów — brązowe plamy na liściach",
    description:
      "Brązowe plamy na pomidorach od dołu — zaraza późna (Phytophthora). Profilaktyka, wentylacja szklarni i odmiany odporne.",
    keywords: [
      "zaraza pomidorów",
      "brązowe liście pomidora",
      "phytophthora pomidor",
      "choroba pomidorów",
    ],
    plantTypes: ["warzywa"],
    symptoms: ["brązowe plamy na liściach", "opad liści od dołu", "biała pleśń pod liściem"],
    intro:
      "Zaraza późna to najgroźniejsza choroba pomidorów w wilgotnym lecie — brązowe plamy rozprzestrzeniają się od dolnych liści w górę. Grzyb żyje w glebie i na resztkach roślinnych.",
    causes: [
      {
        name: "Phytophthora infestans (zaraza późna)",
        probability: "wysokie",
        fix: "Usuń chore liście, nie podlewaj liści. Preparaty miedziowe profilaktycznie. Odmiany odporne.",
      },
      {
        name: "Zbyt gęste sadzenie, słaby przewiew",
        probability: "wysokie",
        fix: "Rozstaw min. 50 cm, usuwaj dolne liście przy ziemi, palikuj.",
      },
      {
        name: "Podlewanie liści wieczorem",
        probability: "srednie",
        fix: "Podlewaj rano u podstawy — mokre liście w nocy = idealne warunki dla grzyba.",
      },
    ],
    actionPlan: [
      "Usuń pierwsze chore liście natychmiast — nie kompostuj.",
      "Zwiększ rozstaw, popraw przewiew.",
      "Mulczuj słomą — ogranicza rozprysk z gleby.",
      "Rotacja — pomidory co 3–4 lata w tym samym miejscu.",
    ],
    prevention: [
      "Odmiany odporne (np. 'Mountain Magic').",
      "Profilaktyczny oprysk miedzią przed deszczową pogodą.",
      "Czysta szklarnia i nowa ziemia co sezon.",
    ],
    relatedTools: [
      { href: "/kalkulator-siewu-warzyw", label: "Kalkulator siewu warzyw" },
      { href: "/kalkulator-plonow-warzywnika", label: "Plony warzywnika" },
      { href: "/kalendarz-ogrodnika", label: "Kalendarz ogrodnika" },
    ],
    faq: [
      {
        question: "Czy pomidory z zarazą są jadalne?",
        answer:
          "Owoce bez plam — tak. Uszkodzone owoce wyrzuć. Choroba na liściach nie zatruwa owoców, ale drastycznie obcina plon.",
      },
    ],
  },
  {
    slug: "snietek-na-rozach",
    title: "Śnieć na różach — biały nalot na liściach",
    description:
      "Biały, mączysty nalot na różach to mączniak prawdziwy. Przyczyny, opryski i odmiany odporne dla rabat różanych.",
    keywords: ["śnieć na różach", "mączniak róża", "biały nalot na różach", "choroba róż"],
    plantTypes: ["roz"],
    symptoms: ["biały nalot", "zwinięte liście", "plamy na pędach"],
    intro:
      "Mączniak róż (Podosphaera) tworzy charakterystyczny biały nalot na liściach, pąkach i młodych pędach. Występuje przy wilgotnej pogodzie i słabym przewiewie — często wiosną i wczesnym latem.",
    causes: [
      {
        name: "Mączniak prawdziwy (Podosphaera)",
        probability: "wysokie",
        fix: "Usuń chore pędy, oprysk siarką lub preparatem. Popraw przewiew — nie sadź zbyt gęsto.",
      },
      {
        name: "Wilgotne, zacienione stanowisko",
        probability: "srednie",
        fix: "Przesadź na słoneczne miejsce (min. 6 h słońca).",
      },
      {
        name: "Odmiany podatne",
        probability: "srednie",
        fix: "Wybieraj odmiany oznaczone jako odporne na mączniaka (np. 'Bonica', 'The Fairy').",
      },
    ],
    actionPlan: [
      "Usuń mocno zaatakowane liście i pędy.",
      "Oprysk — najlepiej profilaktycznie przed wystąpieniem objawów.",
      "Nie nawoź azotem w okresie infekcji — miękkie pędy są podatniejsze.",
    ],
    prevention: [
      "Odmiany odporne.",
      "Przycinanie dla przewiewu.",
      "Podlewanie u korzenia, nie liści.",
    ],
    relatedTools: [
      { href: "/katalog-kwitnienia", label: "Katalog kwitnienia" },
      { href: "/kalendarz-ogrodnika/przycinanie-roz", label: "Cięcie róż" },
    ],
    faq: [
      {
        question: "Czy śnieć zabija róże?",
        answer:
          "Rzadko bezpośrednio — ale osłabia roślinę i może powtarzać się co sezon. Chroniczna infekcja wymaga wymiany odmiany.",
      },
    ],
  },
  {
    slug: "przegladzanie-bluszczu",
    title: "Przegryzanie bluszczu — dziury w liściach",
    description:
      "Dziury i brązowe plamy na bluszczu — przegryzacz bluszczowy, choroby i zbyt wilgotne stanowisko.",
    keywords: [
      "dziury w bluszczu",
      "przegryzacz bluszczowy",
      "bluszcz choruje",
      "brązowe plamy bluszcz",
    ],
    plantTypes: ["bluszcz"],
    symptoms: ["dziury w liściach", "brązowe plamy", "wygładzone brzegi liści"],
    intro:
      "Charakterystyczne „wygładzone” dziury w bluszczu to praca przegryzacza bluszczowego (Polydrusus) — chrząszcz żerujący nocą. Brązowe plamy mogą też oznaczać chorobę bakteryjną przy wilgotnej ziemi.",
    causes: [
      {
        name: "Przegryzacz bluszczowy (chrząszcz)",
        probability: "wysokie",
        fix: "Zbieraj chrząszcze wieczorem, pułapki. Oprysk preparatem na szkodniki przy silnym ataku.",
      },
      {
        name: "Bakteryjna plamistość (Xanthomonas)",
        probability: "srednie",
        fix: "Usuń chore liście, popraw drenaż. Nie zraszaj liści.",
      },
      {
        name: "Mrozowe uszkodzenia zimozielonego bluszczu",
        probability: "niskie",
        fix: "Przytnij wiosną — odrasta z korzenia.",
      },
    ],
    actionPlan: [
      "Wieczorem sprawdź spód liści — chrząszcze i larwy.",
      "Usuń mocno uszkodzone pędy.",
      "Przy chorobie bakteryjnej — ogranicz podlewanie, popraw przewiew.",
    ],
    prevention: [
      "Regularne przeglądy w maju–czerwcu (szczyt żerowania).",
      "Nie sadź w stojącej wodzie.",
      "Różnorodność roślin = mniej monokultury szkodników.",
    ],
    relatedTools: [
      { href: "/kalkulator-prywatnosci", label: "Kalkulator prywatności (żywe ogrodzenie)" },
      { href: "/kalkulator-wzrostu", label: "Kalkulator wzrostu" },
    ],
    faq: [
      {
        question: "Czy bluszcz odrasta po przegryzaniu?",
        answer: "Tak — uszkodzenia kosmetyczne. Przy powtarzającym się ataku liście mogą być poszarpane cały sezon.",
      },
    ],
  },
  {
    slug: "przelany-trawnik",
    title: "Przelany trawnik — żółta, wilgotna trawa",
    description:
      "Za dużo wody na trawniku powoduje żółknięcie, grzyby i cuchnącą darń. Jak rozpoznać przelanie i ustawić właściwe nawadnianie.",
    keywords: [
      "przelany trawnik",
      "za dużo wody trawnik",
      "żółta mokra trawa",
      "podlewanie trawnika błędy",
    ],
    plantTypes: ["trawnik"],
    symptoms: ["wilgotna żółta trawa", "cuchnąca darń", "grzybnia na trawie"],
    intro:
      "Przelany trawnik ma żółte, czasem wilgotne i miękkie źdźbła — korzenie duszą się bez tlenu. Częsty błąd to codzienne, płytkie podlewanie zamiast rzadszego i głębszego.",
    causes: [
      {
        name: "Zbyt częste, płytkie podlewanie",
        probability: "wysokie",
        fix: "2–3× tygodniowo po 20–30 mm. Sprawdź wilgotność sondą lub palcem na 10 cm głębokości.",
      },
      {
        name: "Słaby drenaż / gliniasta gleba",
        probability: "srednie",
        fix: "Aeracja, piasek po wertykulacji, rowki odwadniające.",
      },
      {
        name: "Podlewanie wieczorem",
        probability: "srednie",
        fix: "Podlewaj rano — liście i gleba schną w ciągu dnia.",
      },
    ],
    actionPlan: [
      "Ogranicz podlewanie — poczekaj, aż wierzch gleby wyschnie.",
      "Aeracja + wertykulacja przy silnym filcu.",
      "Ustaw harmonogram na podstawie kalkulatora nawadniania.",
    ],
    prevention: [
      "Głębokie podlewanie rzadziej.",
      "Deszczomierz lub czujnik wilgotności.",
      "Popraw spadek terenu pod trawnikiem.",
    ],
    relatedTools: [
      { href: "/kalkulator-nawadniania/trawnik", label: "Nawadnianie trawnika" },
      { href: "/kalkulator-nawadniania/harmonogram", label: "Harmonogram podlewania" },
    ],
    faq: [
      {
        question: "Jak długo regeneruje się przelany trawnik?",
        answer:
          "Po poprawie nawadniania 2–4 tygodnie. Przy zgniliźnie korzeni może być potrzebny wysiew ubytków.",
      },
    ],
  },
];

export function getGardenProblem(slug: string): GardenProblem | undefined {
  return GARDEN_PROBLEMS.find((p) => p.slug === slug);
}

export function getAllGardenProblemSlugs(): string[] {
  return GARDEN_PROBLEMS.map((p) => p.slug);
}

/** Unikalne objawy do kreatora diagnozy */
export function getDiagnosticSymptoms(plantType?: ProblemPlantType): string[] {
  const problems = plantType
    ? GARDEN_PROBLEMS.filter((p) => p.plantTypes.includes(plantType))
    : GARDEN_PROBLEMS;
  return [...new Set(problems.flatMap((p) => p.symptoms))].sort();
}

export function diagnoseProblems(
  plantType: ProblemPlantType,
  symptom: string
): GardenProblem[] {
  return GARDEN_PROBLEMS.filter(
    (p) =>
      p.plantTypes.includes(plantType) &&
      p.symptoms.some((s) => s.toLowerCase().includes(symptom.toLowerCase()) || symptom.toLowerCase().includes(s.toLowerCase()))
  );
}
