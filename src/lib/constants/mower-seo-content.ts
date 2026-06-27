/** Długie treści SEO na stronie głównej kalkulatora robota koszącego */

export const MAIN_MOWER_GUIDE = {
  howItWorks: {
    heading: "Jak działa robot koszący?",
    paragraphs: [
      "Robot koszący to autonomiczna kosiarka elektryczna, która regularnie przycina trawę na niewielkiej wysokości (zwykle 2–5 cm). Nie zbiera skoszonej trawy — drobne resztki mulczują glebę i zwracają azot do trawnika. Dzięki codziennemu lub co-drugiemu koszeniu trawa nie rośnie wysoko, więc robot ma mniej pracy niż tradycyjna kosiarka raz w tygodniu.",
      "Robot porusza się po zaprogramowanym obszarze wyznaczonym przewodem granicznym (kładzionym pod ziemią lub na trawie) albo — w nowszych modelach — przez GPS i mapowanie terenu. Czujniki zderzeniowe, podnoszenia i nachylenia zatrzymują lub omijają przeszkody. Gdy bateria się wyczerpie, robot sam wraca do stacji ładowania.",
      "W polskim klimacie robot koszący pracuje od kwietnia/maja do października — ok. 180–200 dni sezonu. Reszta roku spędza w garażu lub pod zadaszeniem stacji. Dobrze dobrany model do powierzchni i nachylenia pracuje bezobsługowo przez cały sezon.",
    ],
  },
  choosing: {
    heading: "Jaki robot koszący wybrać? 5 kryteriów",
    items: [
      {
        title: "Powierzchnia trawnika (m²)",
        content:
          "Producenci podają maksymalną powierzchnię pracy — wybieraj model z zapasem 20–30%. Robot na 500 m² na trawniku 480 m² będzie miał rezerwę na deszcz i wolniejsze ładowanie. Na 1000 m²+ potrzebujesz większej baterii i szerszej kosiarki.",
      },
      {
        title: "Nachylenie terenu (%)",
        content:
          "Modele budżetowe radzą sobie do 15–20% nachylenia. Średnia klasa: 25–35%. Premium (Husqvarna Automower 430X, STIHL iMow 7) — do 45% lub więcej. Stromy ogród wymaga lepszej trakcji i większych koła.",
      },
      {
        title: "Przeszkody i strefy",
        content:
          "Drzewa, rabaty, piaskownice i wąskie przejścia wymagają wielostrefowego programowania. Robot musi przejechać wąskim korytarzem (typowo min. 60–80 cm). Przy wielu przeszkodach wybierz model z GPS lub łatwym dzieleniem stref w aplikacji.",
      },
      {
        title: "Przewód vs GPS",
        content:
          "Przewód graniczny (400–800 PLN materiał + montaż) daje precyzyjne granice, ale wymaga układania. GPS/RTK eliminuje przewód, ale kosztuje więcej i wymaga dobrego sygnału. Hybrydy łączą oba systemy.",
      },
      {
        title: "Serwis w Polsce",
        content:
          "Husqvarna, STIHL, Gardena i Worx mają rozbudowaną sieć serwisową. Przed zakupem sprawdź autoryzowany punkt w promieniu 50 km — ostrza, akumulatory i elektronika wymagają czasem naprawy poza gwarancją.",
      },
    ],
  },
  costs: {
    heading: "Ile kosztuje robot koszący? Koszty roczne",
    paragraphs: [
      "Cena zakupu w Polsce (2025/2026): od ok. 2500 PLN za mały robot (do 200 m²) do 15 000+ PLN za modele premium na 3000 m² z GPS. Montaż przewodu: 500–2000 PLN (DIY tańsze). Roczne koszty eksploatacji to głównie prąd (80–200 PLN), ostrza (50–150 PLN co 2–3 lata) i ewentualny serwis (100–300 PLN).",
      "Koszenie ręczne kosiarką spalinową: benzyna 200–400 PLN, olej, serwis — ok. 300–500 PLN rocznie plus Twój czas (20–40 godzin). Usługa firmy ogrodniczej: 15–25 PLN/m² sezonu — przy 500 m² to 7500–12 500 PLN rocznie. Robot na tym samym trawniku zwraca się często w 2–4 lata.",
    ],
    table: [
      { method: "Robot koszący (500 m²)", purchase: "3500–6500 PLN", yearly: "150–350 PLN", time: "0–2 h/rok" },
      { method: "Kosiarka spalinowa (DIY)", purchase: "800–2500 PLN", yearly: "300–600 PLN", time: "25–40 h/rok" },
      { method: "Kosiarka akumulatorowa", purchase: "1200–3500 PLN", yearly: "50–100 PLN prąd", time: "25–40 h/rok" },
      { method: "Firma ogrodnicza", purchase: "—", yearly: "7500–12 500 PLN", time: "0 h" },
    ],
  },
  brands: {
    heading: "Popularne marki robotów koszących w Polsce",
    items: [
      {
        brand: "Husqvarna Automower",
        note: "Lider rynku, szeroki wybór od 600 m² do 5000 m², GPS w wyższych modelach, bardzo cicha praca (58–62 dB).",
      },
      {
        brand: "STIHL iMow",
        note: "Niemiecka jakość, dobre na nachyleniach, intuicyjna aplikacja, popularna wśród profesjonalistów.",
      },
      {
        brand: "Worx Landroid",
        note: "Korzystny stosunek ceny do powierzchni, WiFi i app, moduł GPS opcjonalny, dobry wybór na 500–1000 m².",
      },
      {
        brand: "Gardena SILENO",
        note: "Prosta obsługa, ciche modele life, dobra sieć serwisowa Gardena/Husqvarna Group.",
      },
      {
        brand: "Ambrogio",
        note: "Włoska marka premium, modele na bardzo duże ogrody (3000 m²+), zaawansowana nawigacja AI.",
      },
      {
        brand: "Robomow / McCulloch",
        note: "Tańsze modele na małe trawniki do 600 m², prostsza nawigacja przewodowa.",
      },
    ],
  },
  install: {
    heading: "Montaż robota koszącego — krok po kroku",
    steps: [
      "Wybierz miejsce na stację ładowania: płaskie, nasłonecznione, blisko gniazda 230 V, min. 3 m wolnej trawy przed stacją.",
      "Ułóż przewód graniczny wzdłuż krawędzi trawnika — w szczelinie wyciętej w trawie (3–5 cm głębokości) lub na kołkach tymczasowo.",
      "Przewód wokół przeszkód: wyznacz strefy wykluczone (rabaty, oczko) owijając przewód wokół nich.",
      "Podłącz stację do prądu i robota — kalibracja wg instrukcji producenta (10–30 min).",
      "Ustaw harmonogram koszenia (np. codziennie 6:00–22:00 z przerwami) i wysokość cięcia.",
      "Pierwsze 2–3 tygodnie obserwuj robota — popraw przewód jeśli zostawia nieskoszone pasy.",
    ],
  },
  winter: {
    heading: "Robot koszący zimą — przechowywanie i konserwacja",
    paragraphs: [
      "Pod koniec października wyłącz robota, wyczyść obudowę i ostrza, naładuj baterię do 80–100% i przechowuj w suchym miejscu (5–25°C). Zimą naładuj raz na 2–3 miesiące, żeby nie dopuścić do głębokiego rozładowania akumulatora litowego.",
      "Wiosną (marzec–kwiecień) wymień ostrza jeśli są tępe, sprawdź przewód graniczny po mrozach i uruchom robota gdy trawa zacznie rosnąć. Pierwsze koszenie ustaw na wyższej wysokości (4 cm), potem obniż do docelowej.",
    ],
  },
};

export const MAIN_MOWER_FAQ = [
  {
    question: "Czy robot koszący nadaje się do każdego trawnika?",
    answer:
      "Najlepiej sprawdza się na równym lub umiarkowanie pochyłym trawniku z jasno wyznaczoną granicą. Trudne są: bardzo strome stoki (>35%), trawniki podzielone wąskimi korytarzami (<60 cm), duże korzenie na powierzchni i bardzo miękka, mocno wilgotna gleba.",
  },
  {
    question: "Ile kosztuje robot koszący na 500 m²?",
    answer:
      "Robot do 500–600 m² kosztuje ok. 3000–5500 PLN (np. Worx Landroid M500, Husqvarna 105/305). Montaż przewodu: 500–1500 PLN. Roczna eksploatacja: ok. 150–250 PLN (prąd + drobny serwis).",
  },
  {
    question: "Czy robot koszący jest głośny?",
    answer:
      "Nowoczesne roboty pracują przy 58–65 dB — cichsze niż rozmowa czy kosiarka spalinowa (90+ dB). Można je uruchamiać w nocy, choć niektóre gminy mają regulacje dotyczące hałasu po 22:00.",
  },
  {
    question: "Robot koszący a dzieci i zwierzęta — czy jest bezpieczny?",
    answer:
      "Roboty mają czujniki zderzeniowe i unoszenia — po podniesieniu ostrza się zatrzymują. PIN na panelu blokuje uruchomienie przez dzieci. Zwierzęta zwykle uciekają przed robotem; unikaj zostawiania małych zwierząt na trawniku podczas pierwszych koszeń.",
  },
  {
    question: "Czy robot koszący działa w deszczu?",
    answer:
      "Większość modeli ma czujnik deszczu i wraca do stacji. Koszenie mokrej trawy jest możliwe, ale gorsze dla trawnika (ubija glebę) i szybciej tępi ostrza. Producenci zalecają przerwę przy ulewnym deszczu.",
  },
  {
    question: "Przewód graniczny czy GPS — co wybrać?",
    answer:
      "Przewód daje precyzję i niższą cenę zakupu, ale wymaga montażu. GPS/RTK (np. Husqvarna EPOS, Worx Landroid Vision) eliminuje przewód, ułatwia zmianę granic, ale kosztuje więcej. Na mały, stabilny ogród przewód wystarczy.",
  },
  {
    question: "Kiedy robot koszący się zwraca?",
    answer:
      "Przy trawniku 500 m² i porównaniu z firmą ogrodniczą (ok. 7500 PLN/rok) robot za 4500 PLN zwraca się w ok. 1–2 lata. Przy koszeniu własnym kosiarką spalinową zwrot to zwykle 3–5 lat, ale oszczędzasz 30+ godzin rocznie.",
  },
  {
    question: "Czy robot mulczuje trawę?",
    answer:
      "Tak — ścina drobne fragmenty, które opadają między źdźbła i rozkładają się jako naturalny nawóz. Nie trzeba zbierać skoszonej trawy. Przy bardzo wysokiej trawie (np. po urlopie) warto raz skosić kosiarką zanim włączysz robota.",
  },
];
