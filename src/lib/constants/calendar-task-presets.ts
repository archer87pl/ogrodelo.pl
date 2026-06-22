import type { CalendarCategory } from "./garden-calendar";
import { getAllCalendarMonthSlugs, getCalendarMonth } from "./garden-calendar";

export interface CalendarTaskPreset {
  slug: string;
  title: string;
  h1?: string;
  description: string;
  keywords: string[];
  category: CalendarCategory;
  monthSlugs: string[];
  intro: string;
  steps: string[];
  tips: string[];
  faq: { question: string; answer: string }[];
  relatedTool?: { href: string; label: string };
}

export const CALENDAR_TASK_PRESETS: CalendarTaskPreset[] = [
  {
    slug: "przycinanie-jabloni",
    title: "Kiedy przycinać jabłonie? Terminy i zasady cięcia",
    description:
      "Kiedy przycinać jabłonie w Polsce? Styczeń i luty to optymalny termin formującego cięcia. Poradnik: jak ciąć, czego unikać i kiedy zabezpieczać rany.",
    keywords: [
      "kiedy przycinać jabłonie",
      "cięcie jabłoni kiedy",
      "przycinanie jabłoni zimą",
      "formujące cięcie jabłoni",
      "jak przycinać jabłonie",
    ],
    category: "drzewa",
    monthSlugs: ["styczen", "luty"],
    intro:
      "Formujące cięcie jabłoni wykonujesz w głębokim spoczynku drzewa — najlepiej w styczniu lub lutym, w suche dni o temperaturze dodatniej. Dzięki temu rany szybciej się zasklepiają, a struktura korony jest dobrze widoczna.",
    steps: [
      "Wybierz suchy, mroźny dzień — unikaj deszczu i odwilży.",
      "Usuń chore, suche i krzyżujące się gałęzie.",
      "Wytnij pędy rosnące do wnętrza korony i wodne odrostki.",
      "Skróć pędy prowadzące, zachowując kielich lub piramidę.",
      "Rany powyżej 2 cm posmaruj maścią ogrodniczą.",
      "Zbierz i spal lub wyrzuć chore owoce i gałęzie.",
    ],
    tips: [
      "Nie przycinaj podczas pękania pąków — po marcu tylko cięcia sanitarne.",
      "Ostry sekator i piła = gładkie rany, mniejsze ryzyko infekcji.",
      "Młode drzewa formuj przez 3–4 lata, starsze — co 2–3 lata.",
    ],
    faq: [
      {
        question: "Czy można przycinać jabłonie w grudniu?",
        answer:
          "Tak, w łagodne, suche dni grudnia można wykonać cięcie sanitarne. Formujące cięcie lepiej zrobić w styczniu lub lutym.",
      },
      {
        question: "Czy cięcie jabłoni w mrozie szkodzi drzewu?",
        answer:
          "Lekki mróz (do -5°C) nie przeszkadza. Unikaj cięcia przy silnym mrozie i odwilży — wtedy sok płynie i rany gorzej się goją.",
      },
    ],
    relatedTool: { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
  },
  {
    slug: "nawozenie-hortensji",
    title: "Kiedy nawozić hortensje? Harmonogram na cały sezon",
    description:
      "Nawożenie hortensji: kwiecień, maj i lipiec dla hortensji ogrodowych, maj dla przesuwających. Jak dobrać nawóz do niebieskich, różowych i białych odmian.",
    keywords: [
      "nawożenie hortensji kiedy",
      "kiedy nawozić hortensje",
      "nawóz do hortensji",
      "hortensja nawożenie maj",
      "hortensja nawożenie kwiecień",
    ],
    category: "kwiaty",
    monthSlugs: ["kwiecien", "maj", "lipiec"],
    intro:
      "Hortensje są żarłoczne — bez regularnego nawożenia mają mniejsze kwiatostany i słabszy wzrost. Harmonogram zależy od gatunku: ogrodowe (macrophylla) vs przesuwające (arborescens, paniculata).",
    steps: [
      "Kwiecień: pierwsza dawka nawozu (50 g/m² wokół krzewu).",
      "Maj: druga dawka dla hortensji ogrodowych; główna dla przesuwających.",
      "Lipiec: opcjonalna lekka dawka potasowa dla ogrodowych.",
      "Rozsyp nawóz na wilgotnej glebie, nie dotykając pnia.",
      "Podlej po nawożeniu, jeśli nie pada.",
    ],
    tips: [
      "Hortensje niebieskie: nawóz do roślin kwasolubnych + kwaśna gleba.",
      "Za dużo azotu u przesuwających = liście zamiast kwiatów.",
      "Nie nawoź suchych roślin w pełnym słońcu.",
    ],
    faq: [
      {
        question: "Czy hortensje nawozić jesienią?",
        answer:
          "Nie — jesienne nawożenie azotem pobudza miękkie pędy, które zmarzną zimą. Ostatnia dawka najpóźniej w lipcu.",
      },
    ],
    relatedTool: { href: "/porownywarka-krzewow/hortensja-vs-forsycja", label: "Hortensja — profil krzewu" },
  },
  {
    slug: "wertykulacja-trawnika",
    title: "Kiedy wertykulować trawnik? Maj, czerwiec i wrzesień",
    description:
      "Wertykulacja trawnika: kiedy robić w Polsce? Najlepiej maj lub do połowy czerwca. Drugi termin we wrześniu. Instrukcja krok po kroku i częstotliwość.",
    keywords: [
      "wertykulacja trawnika kiedy",
      "kiedy wertykulować trawnik",
      "wertykulacja trawnika maj",
      "wertykulacja trawnika czerwiec",
      "jak wertykulować trawnik",
    ],
    category: "trawnik",
    monthSlugs: ["maj", "czerwiec", "wrzesien"],
    intro:
      "Wertykulacja to nacinanie filcu i sterty trawy na głębokość 2–3 mm. Poprawia dostęp powietrza, wody i nawozu do korzeni. Wykonuj, gdy trawa intensywnie rośnie — wtedy szybko się regeneruje.",
    steps: [
      "Skosz trawnik na 3–4 cm dzień wcześniej.",
      "Wertykuluj w dwóch kierunkach prostopadłych.",
      "Zgrabuj i usuń cały wyciągnięty filc.",
      "Opcjonalnie: piasek kwarcowy 1–2 l/m² na glebach ciężkich.",
      "Nawieś 30–40 g/m² nawozu wiosennego.",
      "Podlewaj obficie przez 2 tygodnie.",
    ],
    tips: [
      "Co 1–2 lata na trawnikach intensywnie użytkowanych.",
      "Unikaj wertykulacji w suszę, upały i tuż przed urlopem.",
      "Po wertykulacji nie używaj trawnika intensywnie przez 3 tygodnie.",
    ],
    faq: [
      {
        question: "Wertykulacja czy aeracja — co wybrać?",
        answer:
          "Wertykulacja usuwa filc z powierzchni. Aeracja (wgłębnianie) rozluźnia glebę głębiej. Na zadbanym trawniku zwykle wystarczy wertykulacja.",
      },
      {
        question: "Czy wertykulować młody trawnik?",
        answer:
          "Dopiero po pierwszym pełnym sezonie — gdy trawa jest dobrze ukorzeniona (min. 12 miesięcy od siewu).",
      },
    ],
    relatedTool: { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia trawnika" },
  },
  {
    slug: "nawozenie-trawnika",
    title: "Kiedy nawozić trawnik? Wiosna, lato i jesień",
    description:
      "Harmonogram nawożenia trawnika: marzec (wiosna), maj (po wertykulacji), wrzesień (jesień). Ile nawozu na m² i jak dobrać NPK.",
    keywords: [
      "nawożenie trawnika kiedy",
      "kiedy nawozić trawnik",
      "harmonogram nawożenia trawnika",
      "nawóz wiosenny trawnik",
      "nawóz jesienny trawnik",
    ],
    category: "trawnik",
    monthSlugs: ["marzec", "maj", "wrzesien"],
    intro:
      "Trawnik wymaga 3–4 nawożeń rocznie w polskim klimacie. Wiosną azot budzi trawę, latem utrzymuje zielony kolor, jesienią potas i fosfor wzmacniają korzenie przed zimą.",
    steps: [
      "Marzec: nawóz wiosenny NPK 15-5-10, 30–40 g/m² gdy trawa zieleni.",
      "Maj: druga dawka po wertykulacji lub koszeniu.",
      "Czerwiec–sierpień: opcjonalnie lekka dawka w suszy (nawóz długo działający).",
      "Wrzesień: nawóz jesienny (niski azot), 30–40 g/m².",
      "Podlej po nawożeniu, jeśli nie pada deszcz.",
    ],
    tips: [
      "Nie nawoź na mroźnym lub przemoczonym trawniku.",
      "Rozsypiacz równomiernie — plamy nawozu mogą spalić trawę.",
      "Luty: wapnowanie (150–250 g/m²) przed sezonem nawożenia.",
    ],
    faq: [
      {
        question: "Ile razy nawozić trawnik w roku?",
        answer:
          "Minimum 3 razy: wiosna, lato (opcjonalnie) i jesień. Intensywnie użytkowany trawnik sportowy — nawet 4–5 razy.",
      },
    ],
    relatedTool: { href: "/kalkulator-nawozenia", label: "Oblicz ilość nawozu" },
  },
  {
    slug: "ciecie-zywoplotu",
    title: "Kiedy ciąć żywopłot? Harmonogram cięć w sezonie",
    description:
      "Cięcie żywopłotu: maj (pierwsze), czerwiec (drugie u szybkorosnących), październik (ostatnie przed zimą). Grab, bukszpan, laurowiśnia, tuja.",
    keywords: [
      "kiedy ciąć żywopłot",
      "cięcie żywopłotu kiedy",
      "przycinanie żywopłotu maj",
      "harmonogram cięcia żywopłotu",
    ],
    category: "krzewy",
    monthSlugs: ["marzec", "maj", "czerwiec", "pazdziernik"],
    intro:
      "Częstotliwość cięć zależy od gatunku. Grab i bukszpan: 2–3 razy rocznie. Laurowiśnia i ostrokrzew: nawet 3–4. Zimozielone iglaste — unikaj cięć przy mrozie.",
    steps: [
      "Maj: pierwsze formujące cięcie po wiosennym przyroście.",
      "Czerwiec: drugie cięcie szybkorosnących gatunków.",
      "Lipiec: lekkie strzyżenie boków w upały — rano lub wieczorem.",
      "Październik: ostatnie cięcie liściastych przed mrozem.",
      "Używaj ostrych narzędzi — postrzępione cięcia gorzej się goją.",
    ],
    tips: [
      "Nie tnij tuja i laurowiśni w silny mróz — brązowienie igieł.",
      "Żywopłot młody: formuj stopniowo, nie skracaj o więcej niż 1/3 rocznie.",
      "Sprawdź odstępy sadzenia w kalkulatorze żywopłotu.",
    ],
    faq: [
      {
        question: "Czy można ciąć żywopłot w sierpniu?",
        answer:
          "Tak — lekkie cięcie formujące jest możliwe, ale unikaj silnego skracania w upały. Ostatnie mocne cięcie liściastych: wrzesień–październik.",
      },
    ],
    relatedTool: { href: "/kalkulator-zywoplotu", label: "Kalkulator żywopłotu" },
  },
  {
    slug: "sadzenie-zywoplotu",
    title: "Kiedy sadzić żywopłot? Wiosna i jesień",
    description:
      "Najlepszy termin sadzenia żywopłotu: marzec–kwiecień i wrzesień–październik. Jak przygotować glebę, jakie odstępy i ile podlewać.",
    keywords: [
      "kiedy sadzić żywopłot",
      "sadzenie żywopłotu wrzesień",
      "sadzenie żywopłotu wiosna",
      "jak posadzić żywopłot",
    ],
    category: "krzewy",
    monthSlugs: ["marzec", "wrzesien", "pazdziernik"],
    intro:
      "Żywopłot sadź w dni chłodne, pochmurne — mniejszy stres dla roślin. Jesień daje przewagę: ciepła gleba i jesienne opady wspierają ukorzenianie przed zimą.",
    steps: [
      "Wykop rów wzdłuż linii żywopłotu (głębokość bryły + 10 cm).",
      "Wymieszaj ziemię z kompostem (1:3).",
      "Sadź w odstępach wg gatunku (30–80 cm).",
      "Zagęść ziemię, podlej obficie (10–15 l na roślinę).",
      "Mulczuj korę 5 cm — utrzymuje wilgoć.",
      "Podlewaj co tydzień do listopada (jesienne sadzenie).",
    ],
    tips: [
      "Grab i bukszpan: tańsze sadzonki z gruntu — sadź jesienią.",
      "Laurowiśnia: lepiej kontener — wiosna lub wczesna jesień.",
      "Rozważ ostrokrzew zamiast tui — zdrowszy żywopłot.",
    ],
    faq: [
      {
        question: "Czy można sadzić żywopłot latem?",
        answer:
          "Można z pojemników, ale wymaga codziennego podlewania przez 4–6 tygodni. Lepiej poczekać na wrzesień.",
      },
    ],
    relatedTool: { href: "/kalkulator-zywoplotu/grab", label: "Żywopłot z grabu — kalkulator" },
  },
  {
    slug: "siew-pomidorow",
    title: "Kiedy siać pomidory? Luty–marzec pod osłonami",
    description:
      "Siew pomidorów w Polsce: luty (wczesne odmiany) lub marzec. Wysadzenie na miejsce w maju po Zimnej Zośce. Terminy i temperatura.",
    keywords: [
      "kiedy siać pomidory",
      "siew pomidorów luty",
      "siew pomidorów marzec",
      "kiedy wysadzać pomidory",
    ],
    category: "warzywnik",
    monthSlugs: ["luty", "marzec", "maj"],
    intro:
      "Pomidory potrzebują 8–10 tygodni od siewu do wysadzenia. Licz wstecz od daty ostatnich przymrozków w Twojej strefie — w środkowej Polsce to po 15 maja.",
    steps: [
      "Luty (2. połowa): wysiew wczesnych odmian pod osłonami.",
      "Marzec: wysiew późniejszych i balkonowych.",
      "Temperatura kiełkowania: 22–25°C, po wschodach 18–20°C.",
      "Maj (po 15.): hartowanie i wysadzenie na miejsce.",
      "Mulczuj słomą, podpieraj pałkami.",
    ],
    tips: [
      "Światło: 16–18 h — lampa LED ogrodnicza przy słabym nasłonecznieniu.",
      "Ziemia do siewów żyzna, przepuszczalna, przekwaszona (pH 6–6,5).",
      "Nie podlewaj zimną wodą — temperatura pokojowa.",
    ],
    faq: [
      {
        question: "Czy można siać pomidory w kwietniu?",
        answer:
          "Tak, ale sezon będzie krótszy — plony mniejsze. Kwiecień wystarczy dla odmian balkonowych i późnych.",
      },
    ],
    relatedTool: { href: "/kalkulator-nawadniania/warzywnik", label: "Podlewanie warzywnika" },
  },
  {
    slug: "ochrona-roz-na-zime",
    title: "Jak zabezpieczyć róże na zimę? Październik–listopad",
    description:
      "Ochrona róż na zimę: kopczykowanie, okrywanie włókniną, cięcie jesienne. Kiedy i jak zabezpieczyć róże w Polsce.",
    keywords: [
      "ochrona róż na zimę",
      "jak okryć róże na zimę",
      "kopczykowanie róż",
      "róże zima polska",
    ],
    category: "krzewy",
    monthSlugs: ["pazdziernik", "listopad"],
    intro:
      "Róże wielkokwiatowe i herbaciane wymagają okrycia w strefach 6–7. Czajnikowate i parkowe są mrozoodporniejsze. Działaj po pierwszych przymrozkach, przed stałymi mrozami.",
    steps: [
      "Październik: usuń chore liście i ściółkę pod krzewem.",
      "Skróć długie pędy o 1/3 (opcjonalnie — nie wszystkie odmiany).",
      "Usyp ziemię (kompost) do 20–25 cm — kopczykowanie.",
      "Okryj włókniną lub specjalną osłoną — nie folią!",
      "Listopad: dokopczykuj, jeśli ziemia opadła.",
    ],
    tips: [
      "Nie okrywaj na wilgotno — to grozi pleśnią.",
      "Odmrożone pędy wycinaj dopiero w marcach.",
      "Róże pnące: zdejmij z podpór, ułóż na ziemi, przykryj.",
    ],
    faq: [
      {
        question: "Czy róże trzeba okrywać w Polsce?",
        answer:
          "Większość odmian uprawianych — tak. Wyjątek: niektóre róże parkowe i mieszańcowe bardzo mrozoodporne.",
      },
    ],
    relatedTool: { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
  },
  {
    slug: "sadzenie-cebul-kwiatowych",
    title: "Kiedy sadzić cebulki kwiatowe? Wrzesień–październik",
    description:
      "Sadzenie tulipanów, narcyzów i krokusów: wrzesień i październik. Głębokość, odstępy i przygotowanie gleby.",
    keywords: [
      "kiedy sadzić cebulki kwiatowe",
      "sadzenie tulipanów kiedy",
      "sadzenie narcyzów jesień",
      "cebulki kwiatowe wrzesień",
    ],
    category: "kwiaty",
    monthSlugs: ["sierpien", "wrzesien", "pazdziernik"],
    intro:
      "Cebulki wiosenne wymagają okresu chłodu (stratyfikacji) — sadzenie jesienią to naturalny proces. Tulipany, narcyzy, hiacynty i krokusy sadź, zanim gleba zmarznie.",
    steps: [
      "Sierpień: zamów cebulki — wybierz twarde, bez pleśni.",
      "Wrzesień–październik: sadź 2–3× głębiej niż wysokość cebulki.",
      "Miejsce słoneczne, gleba przepuszczalna.",
      "Tulipany: 15 cm głęboko, co 10 cm.",
      "Podlej po sadzeniu — korzenie przed zimą.",
    ],
    tips: [
      "Nie sadź cebulek na mokrym, stojącym miejscu.",
      "Krokusy i śnieżyczki: płycej (5–8 cm).",
      "Zaznacz miejsca sadzenia — wiosną łatwo uszkodzić kosiarką.",
    ],
    faq: [
      {
        question: "Czy można sadzić tulipany w listopadzie?",
        answer:
          "Tak, jeśli gleba nie jest zmarznięta. Im później, tym mniejsze korzenie przed zimą — wiosenne kwitnienie może być słabsze.",
      },
    ],
  },
  {
    slug: "podlewanie-trawnika",
    title: "Kiedy i ile podlewać trawnik? Lato i susza",
    description:
      "Podlewanie trawnika w lecie: 20–35 l/m² tygodniowo, rano lub wieczorem. Jak często podlewać w czerwcu, lipcu i sierpniu.",
    keywords: [
      "podlewanie trawnika lato",
      "ile podlewać trawnik",
      "kiedy podlewać trawnik",
      "podlewanie trawnika czerwiec",
    ],
    category: "trawnik",
    monthSlugs: ["czerwiec", "lipiec", "sierpien"],
    intro:
      "Trawnik potrzebuje ok. 25–30 mm wody tygodniowo (25–30 l/m²). W upały bez deszczu podlewaj 1–2 razy w tygodniu, obficie — lepiej rzadziej i głęboko niż codziennie po trochu.",
    steps: [
      "Podlewaj rano (5–8) — mniejsze parowanie.",
      "Jedna sesja: 15–20 l/m² (do wilgotności 10 cm gleby).",
      "W suszy: 2× tygodniowo = 25–35 l/m² łącznie.",
      "Nie podlewaj w pełnym słońcu — krople mogą poparzyć trawę.",
      "Po podlewaniu: kosić wyżej (6–7 cm).",
    ],
    tips: [
      "Trawnik żółty po deszczu? Nie panikuj — odżyje w 7–10 dni.",
      "Nowy trawnik: podlewaj codziennie przez pierwsze 3 tygodnie.",
      "Deszczówka oszczędza 30–50% kosztów wody.",
    ],
    faq: [
      {
        question: "Czy podlewać trawnik wieczorem?",
        answer:
          "Można, ale wilgoć na nocy sprzyja chorobom grzybowym. Rano jest bezpieczniej.",
      },
    ],
    relatedTool: { href: "/kalkulator-nawadniania/trawnik", label: "Kalkulator nawadniania trawnika" },
  },
  {
    slug: "wapnowanie-trawnika",
    title: "Kiedy wapnować trawnik? Luty i marzec",
    description:
      "Wapnowanie trawnika: luty lub marzec, 150–250 g/m². Kiedy wapnować, jak dobrać wapno i co daje wapnowanie.",
    keywords: [
      "wapnowanie trawnika kiedy",
      "kiedy wapnować trawnik",
      "ile wapna na trawnik",
      "wapno na trawnik luty",
    ],
    category: "trawnik",
    monthSlugs: ["luty", "marzec"],
    intro:
      "Wapnowanie obniża kwaśność gleby, hamuje mchy i ułatwia wchłanianie składników odżywczych. Wykonuj na mroźnym, suchym trawniku — wapno wsiąka powoli z opadami wiosennymi.",
    steps: [
      "Luty: rozsyp wapno mączne lub granulowane (150–250 g/m²).",
      "Rozprowadź grabiami lub rozsypiaczem.",
      "Nie łącz z nawożeniem azotowym tego samego dnia.",
      "Marzec: opcjonalnie druga dawka na bardzo kwaśnych glebach.",
      "Test pH gleby co 2–3 lata — optymalne pH trawnika: 6,0–7,0.",
    ],
    tips: [
      "Wapnuj max raz w roku — nadmiar szkodzi.",
      "Po wapnowaniu odczekaj 2–3 tygodnie przed nawożeniem azotem.",
      "Mchy i koniczyna? Często sygnał zbyt niskiego pH.",
    ],
    faq: [
      {
        question: "Czy wapnować co roku?",
        answer:
          "Tylko gdy pH < 6,0. Zbyt częste wapnowanie podnosi pH za wysoko i blokuje mikroelementy.",
      },
    ],
    relatedTool: { href: "/kalkulator-nawozenia", label: "Kalkulator nawożenia" },
  },
  {
    slug: "ciecie-winorosli",
    title: "Kiedy przycinać winorośl? Luty i marzec",
    description:
      "Cięcie winorośli: luty–marzec w spoczynku. Jak ciąć na pędy owocujące, ile pąków zostawić i formy uprawy.",
    keywords: [
      "kiedy ciąć winorośl",
      "przycinanie winorośli luty",
      "cięcie winorośli kiedy",
      "jak przycinać winorośl",
    ],
    category: "drzewa",
    monthSlugs: ["luty", "marzec"],
    intro:
      "Winorośl owocuje na zeszłorocznym drewnie — cięcie wykonuj w głębokim spoczynku, zanim pąki spęcznieją. Zostaw 2–3 pąki na pędzie owocującym (zależnie od formy).",
    steps: [
      "Luty: usuń chore, suche i słabe pędy.",
      "Skróć pędy owocujące do 2–8 pąków (forma zależna).",
      "Usuń pędy zdrewniałe starsze niż 2 lata (u form sztaplowych).",
      "Zabezpiecz duże rany maścią.",
      "Marzec: ostatnia korekta przed pęcznieniem.",
    ],
    tips: [
      "Odmiany winorośli stołowej: łagodniejsze cięcie niż winorośl winna.",
      "Młoda winorośl: formuj przez 3 lata, nie oczekuj plonów od razu.",
      "Nożyczki muszą być ostre — ścisk niszczy tkanki.",
    ],
    faq: [
      {
        question: "Czy winorośl można ciąć jesienią?",
        answer:
          "Tylko lekkie cięcie sanitarne. Główne cięcie formujące — zima, gdy sok nie płynie.",
      },
    ],
  },
  {
    slug: "sadzenie-drzew",
    title: "Kiedy sadzić drzewa? Wiosna i jesień",
    description:
      "Sadzenie drzew w ogrodzie: marzec–kwiecień i wrzesień–listopad. Liściaste z bryłą, iglaste z gruntu. Poradnik krok po kroku.",
    keywords: [
      "kiedy sadzić drzewa",
      "sadzenie drzew jesień",
      "sadzenie drzew wiosna",
      "kiedy posadzić drzewo w ogrodzie",
    ],
    category: "drzewa",
    monthSlugs: ["marzec", "wrzesien", "pazdziernik"],
    intro:
      "Drzewa liściaste najlepiej sadzić wiosną (bryła) lub jesienią (bryła lub kontener). Iglaste z gruntu — wczesna jesień. Unikaj sadzenia w upały i mrozy.",
    steps: [
      "Wykop dołek 2× większy od bryły korzeniowej.",
      "Rozluźnij ściany dołu — korzenie muszą przejść.",
      "Wymieszaj ziemię z kompostem, nie dodawaj nawozu do dołu.",
      "Posadź na tej samej głębokości co w szkółce.",
      "Podlej 20–30 l wody, mulczuj korę 5–8 cm.",
      "Podlewaj co tydzień przez pierwszy rok.",
    ],
    tips: [
      "Sprawdź odległość od domu i linii — korzenie i cień.",
      "Porównaj gatunki w porównywarce drzew przed zakupem.",
      "Pałąk i pasek — stabilizacja przez 1–2 lata.",
    ],
    faq: [
      {
        question: "Czy można sadzić drzewa latem?",
        answer:
          "Tylko z pojemnika, z intensywnym podlewaniem. Lepiej poczekać na wrzesień.",
      },
    ],
    relatedTool: { href: "/porownywarka-drzew", label: "Porównywarka drzew" },
  },
  {
    slug: "aeracja-trawnika",
    title: "Aeracja trawnika — kiedy i jak wykonać?",
    description:
      "Aeracja trawnika we wrześniu: wgłębnianie gleby, rozluźnianie zbitej murawy. Kiedy aerować i czym różni się od wertykulacji.",
    keywords: [
      "aeracja trawnika kiedy",
      "kiedy aerować trawnik",
      "aeracja trawnika wrzesień",
      "wgłębnianie trawnika",
    ],
    category: "trawnik",
    monthSlugs: ["wrzesien", "pazdziernik"],
    intro:
      "Aeracja (wgłębnianie) rozluźnia zbitą glebę pod trawnikiem — korzenie dostają tlen i wodę. Wykonuj na wilgotnym trawniku we wrześniu, najlepiej po wertykulacji.",
    steps: [
      "Wrzesień: nawodnij trawnik dzień wcześniej.",
      "Wgłębnij w odstępach 10–15 cm, głębokość 8–10 cm.",
      "Zostaw „bulwy” na powierzchni — zgniją w ciągu tygodnia.",
      "Opcjonalnie: nawóz jesienny po aeracji.",
      "Podlej po zabiegu.",
    ],
    tips: [
      "Gleby gliniaste: aeracja co rok. Lekkie: co 2–3 lata.",
      "Nie aeruj suchego, twardego trawnika — uszkodzisz korzenie.",
      "Łącz z wertykulacją jesienią dla pełnej regeneracji.",
    ],
    faq: [
      {
        question: "Aeracja czy wertykulacja?",
        answer:
          "Wertykulacja = powierzchnia (filc). Aeracja = głębiej (zbita gleba). Na zaniedbanym trawniku warto oba zabiegi.",
      },
    ],
    relatedTool: { href: "/kalkulator-nawozenia", label: "Nawożenie jesienne" },
  },
  {
    slug: "przycinanie-roz",
    title: "Kiedy przycinać róże? Kwiecień i jesień",
    description:
      "Cięcie róż wielkokwiatowych: kwiecień (wiosenne) i październik (jesienne). Forsycja po kwitnieniu. Zasady i terminy.",
    keywords: [
      "kiedy przycinać róże",
      "cięcie róż kwiecień",
      "przycinanie róż wiosna",
      "jak ciąć róże",
    ],
    category: "krzewy",
    monthSlugs: ["kwiecien", "pazdziernik"],
    intro:
      "Róże wielkokwiatowe cię w kwietniu — usuń chore pędy i skróć zdrowe o 1/3 do pąka skierowanego na zewnątrz. Forsycja i lilak — zaraz po kwitnieniu, nie wcześniej.",
    steps: [
      "Kwiecień: wiosenne cięcie róż (przed pęcznieniem).",
      "Usuń chore, suche i krzyżujące się pędy.",
      "Skróć pędy główne nad 5. listkiem (ok. 1/3 długości).",
      "Forsycja: przycinaj po kwitnieniu — kwiecień.",
      "Październik: usuń niezdrewniałe pędy, przygotuj do okrycia.",
    ],
    tips: [
      "Nie tnij róż jesienią mocno — osłabia przed zimą.",
      "Sekator musi być ostry — postrzępienie = choroby.",
      "Róże pnące: cięcie po kwitnieniu na bocznych pędach.",
    ],
    faq: [
      {
        question: "Czy róże można ciąć w marcu?",
        answer:
          "W marcu tylko lekkie cięcie sanitarne. Główne cięcie formujące — kwiecień, gdy pąki zaczynają pęcznieć (łatwo je zobaczyć).",
      },
    ],
    relatedTool: { href: "/porownywarka-krzewow", label: "Porównywarka krzewów" },
  },
  {
    slug: "zakladanie-trawnika",
    title: "Kiedy założyć trawnik? Marzec–maj i wrzesień",
    description:
      "Zakładanie trawnika z siewu: marzec–maj lub wrzesień. Przygotowanie gleby, ilość nasion i pierwsze koszenie.",
    keywords: [
      "kiedy siać trawnik",
      "zakładanie trawnika kiedy",
      "siew trawnika marzec",
      "siew trawnika wrzesień",
    ],
    category: "trawnik",
    monthSlugs: ["marzec", "kwiecien", "wrzesien"],
    intro:
      "Najlepsze terminy siewu: wiosna (marzec–maj) i wczesna jesień (wrzesień). Gleba musi być wilgotna i ciepła (min. 10°C). Jesienny siew daje gęstszy trawnik wiosną.",
    steps: [
      "Usuń chwasty, kamienie, zgrabiuj.",
      "Wyrównaj i lekko ubij wałem.",
      "Wysiew: 30–50 g nasion/m² (wg mieszanki).",
      "Przykryj cienko ziemią lub wałuj.",
      "Podlewaj codziennie lekko przez 3 tygodnie.",
      "Pierwsze koszenie: gdy trawa osiągnie 8–10 cm.",
    ],
    tips: [
      "Wrzesień: mniej chwastów, więcej deszczu — mniej podlewania.",
      "Unikaj siewu w lipcu — susza zabija kiełki.",
      "Policz nasiona i koszt w kalkulatorze trawnika.",
    ],
    faq: [
      {
        question: "Trawnik z rolki czy z siewu?",
        answer:
          "Rolka: natychmiastowy efekt, droższa. Siew: tańszy, 8–12 tygodni do pełnej murawy. Oba terminy: wiosna lub jesień.",
      },
    ],
    relatedTool: { href: "/kalkulator-trawnika", label: "Kalkulator trawnika" },
  },
];

export function getCalendarTask(slug: string): CalendarTaskPreset | undefined {
  return CALENDAR_TASK_PRESETS.find((t) => t.slug === slug);
}

export function getAllCalendarTaskSlugs(): string[] {
  return CALENDAR_TASK_PRESETS.map((t) => t.slug);
}

export function getCalendarPreset(slug: string):
  | { type: "month"; slug: string }
  | { type: "task"; slug: string }
  | undefined {
  if (getCalendarMonth(slug)) return { type: "month", slug };
  if (getCalendarTask(slug)) return { type: "task", slug };
  return undefined;
}

export function getAllCalendarPresetSlugs(): string[] {
  return [...getAllCalendarMonthSlugs(), ...getAllCalendarTaskSlugs()];
}
