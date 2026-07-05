# PLAN ROZWOJU — ogrodelo.pl

Cel: najlepszy polski serwis narzędzi ogrodniczych — miejsce, do którego wraca się przez cały sezon,
a nie jednorazowy kalkulator z Google.

Stan obecny (lipiec 2026): **30 narzędzi** — kalkulatory (nawadnianie, żywopłot, prywatność, nawożenie,
deszczówka, cień, wzrost, trawnik, robot koszący, ziemia/kora, kostka, ogrodzenie, oczko wodne,
kompost, siew warzyw, wapnowanie, koszty ogrodu, łąka kwietna, budki lęgowe, plony warzywnika),
porównywarki (drzewa, krzewy), katalog kwitnienia z podstronami gatunków, kalendarz ogrodnika,
generator planu ogrodu, projektant ogrodu (canvas), alternatywy dla tui, wycinka drzewa,
odległość od granicy, dotacja Moja Woda, rośliny dla zwierząt, gra „Zgadnij roślinę".
Huby SEO: `/kalkulatory`, `/porownywarki`, `/rosliny`. Do tego strony presetowe pod SEO, JSON-LD, API pogodowe.

---

## 1. Szybkie wygrane (1–2 tygodnie, głównie generowanie danych)

### 1.1 Nowe kalkulatory na sprawdzonym szablonie (CalculatorLayout + presety)
**Status: wdrożone (lipiec 2026)** — poniższe narzędzia mają strony, FAQ JSON-LD i wpisy w `calculators.ts`:
- **Kalkulator ziemi i kory** — ile m³/worków ziemi, kory, żwiru na rabatę o podanych wymiarach
  i grubości warstwy. Frazy: „ile kory na m2", „ile ziemi do podniesienia terenu".
- **Kalkulator kostki brukowej / ścieżki** — powierzchnia, ilość kostki, podbudowa, obrzeża, koszt.
- **Kalkulator ogrodzenia** — panele/siatka/sztachety: liczba przęseł, słupków, koszt na metr bieżący.
- **Kalkulator oczka wodnego** — objętość, folia, pompa, rośliny wodne.
- **Kalkulator kompostownika** — wielkość pod rodzinę/działkę, co wrzucać, kiedy gotowy kompost.
- **Kalkulator siewu warzyw** — ile nasion/rozsady na zagon, rozstawy, plon szacunkowy.
- **Kalkulator wapnowania / pH gleby** — dawka wapna wg rodzaju gleby i wyniku pH.
- **Kalkulator kosztów utrzymania ogrodu** — roczny koszt: woda, nawozy, paliwo/prąd, usługi.

### 1.2 Rozbudowa danych w istniejących narzędziach
- Katalog kwitnienia: dobić do **200+ gatunków** ✅ ~206 gatunków; filtry:
  stanowisko (słońce/cień) ✅, mrozoodporność ✅, trujące dla psów/kotów/dzieci ✅ (baza pet-plants).
- Porównywarka krzewów/drzew: więcej gatunków + presety dla najczęstszych par ✅ grab vs buk, grab vs bukszpan + 18 nowych stron par
  („laurowiśnia vs ostrokrzew", „grab vs buk") — każda para to osobna strona SEO.
- Kalendarz ogrodnika: wersje regionalne (północ / centrum / południe / góry) ✅ 48 stron
  (`/kalendarz-ogrodnika/polnoc-styczen` itd.) — inne daty przymrozków, inne terminy siewu.

### 1.3 SEO techniczne
**Status: częściowo wdrożone** — huby `/kalkulatory`, `/porownywarki`, `/rosliny` w sitemap; FAQ JSON-LD ujednolicone na kalkulatorach; breadcrumbs + JSON-LD na presetach.
- ~~Strony „hub": `/kalkulatory`, `/porownywarki`, `/rosliny`~~ ✅
- Breadcrumbs + JSON-LD BreadcrumbList na wszystkich podstronach. ✅ (presetach przez PresetJsonLd)
- FAQ JSON-LD wszędzie tam, gdzie są sekcje FAQ (część już jest — ujednolicić). ✅ kalkulatory
- RSS/Atom dla nowych treści. ✅ `/feed.xml`

---

## 2. Treści programatyczne (największa dźwignia SEO, 1–2 miesiące)

### 2.1 Encyklopedia roślin (rozszerzenie `roslina/[slug]`)
Jedna karta gatunku = jedna strona, generowana z danych:
- wymagania (światło, gleba, woda, strefa), wzrost rok po roku (wykres z istniejącego silnika),
  kwitnienie, cięcie, choroby, sadzenie krok po kroku;
- automatyczne linki do kalkulatorów („policz żywopłot z grabu", „ile wody potrzebuje hortensja"); ✅ sekcje pielęgnacja + kalkulatory
- cel: **300–500 gatunków** = 300–500 stron o długim ogonie. ⏳ ~206 gatunków (+70 faza 3)
- wykres wzrostu rok po roku na kartach drzew/krzewów z presetem ✅ (grab, berberys, ostrokrzew, brzoza…)

### 2.2 Strony problemowe („choroby i szkodniki")
- Diagnostyka objawowa: „brązowe końcówki tui", „dziury w liściach funkii", „mech w trawniku" —
  każdy objaw to strona z przyczynami i planem działania. ✅ 16 poradników `/problemy-ogrodowe`
- Prosty kreator diagnozy: roślina → objaw → lista przyczyn z prawdopodobieństwem. ✅

### 2.3 Strony regionalne
- „Nawadnianie ogrodu w Warszawie/Krakowie/…" — presety miast z danymi opadowymi
  (API pogodowe już jest), daty ostatnich przymrozków, strefa mrozoodporności. ✅ 6 miast w kalkulatorze nawadniania
- Mapa stref mrozoodporności Polski (interaktywna) — magnes na linki. ✅ `/mapa-stref-mrozoodpornosci`

### 2.4 Poradniki sezonowe
- 12 stron „Ogród w styczniu…grudniu" spiętych z kalendarzem ogrodnika. ✅ `/ogrod-w/[miesiąc]`
- Aktualizowana strona „Co robić w ogrodzie TERAZ" (na bazie daty + regionu) — kandydat na stronę główną sezonową. ✅ `/ogrod-teraz`

---

## 3. Funkcje produktowe (przewaga nad konkurencją, 2–3 miesiące)

### 3.1 „Mój ogród" — profil bez konta (localStorage, później konto)
- Użytkownik zapisuje: lokalizację, wielkość działki, typ gleby, listę swoich roślin.
- Wszystkie kalkulatory prefill'ują się z profilu; kalendarz pokazuje zadania **dla jego roślin**.
- To zamienia zbiór kalkulatorów w serwis, do którego się wraca.

### 3.2 Rozbudowa projektanta ogrodu
- Eksport do PDF (plan + lista materiałów + kosztorys).
- Import wymiarów działki z liczby/mapy; warstwy (nasadzenia / infrastruktura).
- Symulacja cienia na planie (silnik z kalkulatora cienia) i dojrzałych rozmiarów roślin po X latach
  (silnik z kalkulatora wzrostu) — **unikat na polskim rynku**.
- Link „wyślij projekt" (serializacja do URL) — wiralność.

### 3.3 Powiadomienia sezonowe
- Newsletter / web-push: „za 3 dni przymrozek w Twoim regionie — zabezpiecz rośliny",
  „czas na wertykulację". Dane już są (pogoda + kalendarz), brakuje kanału dotarcia.

### 3.4 Eksporty i udostępnianie
- Każdy wynik kalkulatora: przycisk „pobierz PDF" i „kopiuj link z wynikami" (stan w URL).
- Obrazki OG generowane z wyników (już jest opengraph-image — rozszerzyć o dynamiczne wyniki).

---

## 4. Funkcje AI (wyróżnik, po ustabilizowaniu 1–3)

- **Rozpoznawanie roślin/chorób ze zdjęcia** — upload zdjęcia → gatunek lub diagnoza + link do karty rośliny.
- **Doradca ogrodowy (chat)** — odpowiada na bazie własnych danych serwisu (katalog, kalendarz,
  kalkulatory) i linkuje do narzędzi; nie ogólny chatbot.
- **Generator planu ogrodu 2.0** — obecna ankieta + AI układające rzeczywisty plan na siatce
  projektanta (most między generatorem a projektantem).

---

## 5. Monetyzacja i wzrost

- **Afiliacja**: linki do sadzonek/nawozów/robotów koszących przy wynikach kalkulatorów
  (kalkulator robota koszącego to naturalny start — porównuje konkretne modele).
- **Porównywarka cen sadzonek** — ceny z 3–5 sklepów przy każdej roślinie.
- **Katalog wykonawców** (dalsza przyszłość): architekci zieleni, firmy zakładające trawniki — lead gen.
- **Newsletter sezonowy** jako aktywo (patrz 3.3).

---

## 6. Techniczne / jakościowe (w tle, stale)

- PWA + tryb offline dla kalendarza i kalkulatorów (ogród = słaby zasięg).
- Web Vitals budżet: presety to statyczne strony — pilnować pełnego SSG.
- Testy jednostkowe silników kalkulatorów (`src/lib/calculators/*`) — dane liczbowe muszą być wiarygodne.
- Panel danych: jedna struktura gatunku współdzielona przez katalog, porównywarki i kalkulatory
  (dziś dane są rozproszone po `constants/*` — scalenie ułatwi skalowanie do setek gatunków).
- Wersja EN/DE w dalszej perspektywie (silniki są uniwersalne, dane łatwo przetłumaczyć).

---

## 7. Prawo i pieniądze — nisza prawie bez konkurencji narzędziowej

Tematy, których ludzie masowo szukają, a dostają tylko ściany tekstu w serwisach prawnych.
Narzędzie, które **liczy odpowiedź**, wygrywa te frazy z marszu:

- **„Czy mogę wyciąć drzewo?"** — kreator: gatunek + obwód pnia na 5 cm/130 cm + cel działki →
  odpowiedź: bez zgłoszenia / zgłoszenie / zezwolenie + szacunkowa opłata za wycinkę.
  Jedna z najczęściej wyszukiwanych spraw „ogrodniczych" w Polsce.
- **Kalkulator odległości sadzenia od granicy działki** — drzewo/krzew/żywopłot przy płocie:
  ile od granicy, co z gałęziami i korzeniami sąsiada (art. 148–150 KC w ludzkim języku).
- **Strony „spory sąsiedzkie"**: gałęzie nad moim płotem, liście sąsiada, cień od tui sąsiada,
  za wysoki żywopłot — każda to strona z konkretnym planem działania + linki do kalkulatora cienia
  i prywatności (te narzędzia już są!).
- **Kalkulator dotacji „Moja Woda"** — ile dofinansowania do zbiornika na deszczówkę, czy inwestycja
  się spina; naturalne rozszerzenie istniejącego kalkulatora deszczówki.
- **Cisza nocna a kosiarka/robot** — kiedy wolno kosić; spina się z kalkulatorem robota koszącego.

Uwaga: każda strona z wyraźnym zastrzeżeniem „to nie porada prawna" + data aktualizacji przepisów.

## 8. Eko-trend — frazy rosnące rok do roku

- **Kalkulator łąki kwietnej** — ile nasion na m², koszt vs trawnik, ile wody i koszenia się oszczędza.
  Mocno rosnący trend; naturalna przeciwwaga dla kalkulatora trawnika (linkują się wzajemnie).
- **Ogród przyjazny zwierzętom** — kreator: „mam psa/kota/dzieci" → filtr roślin bezpiecznych
  i trujących (dane dołożyć do wspólnej struktury gatunku z sekcji 6). Frazy typu
  „rośliny trujące dla psa" mają duży, stały ruch.
- **Kalkulator budek i karmników** — ile budek lęgowych/poidełek na wielkość działki, jakie ptaki
  w Polsce, kiedy wieszać i czyścić.
- **Kalkulator plonów warzywnika** — ile kg pomidorów/ogórków z X m² i ile to warte w sklepie —
  wynik „Twój warzywnik oszczędza ~800 zł/rok" to gotowy materiał do udostępniania.

## 9. Mechanizmy powrotów i linków (growth)

- **Codzienna gra roślinna** („Wordle z roślinami") — zgadnij gatunek po podpowiedziach
  (wysokość, kwitnienie, liść). Dane już są w katalogu. Gry dzienne = codzienne powroty
  i naturalne linki; koszt budowy niski.
- **Widgety do osadzenia** — kalkulatory jako embed (iframe/script) dla blogów i sklepów
  ogrodniczych z linkiem zwrotnym „powered by ogrodelo.pl" — systematyczny link building.
- **Licznik „do ostatniego przymrozku w Twojej okolicy zostało X dni"** — na stronie głównej
  i jako obrazek OG; sezonowy magnes na udostępnienia (dane pogodowe już są).
- **Ranking roczny** — „Najpopularniejsze rośliny żywopłotowe 2026 wg użytkowników ogrodelo.pl"
  z własnych danych użycia kalkulatorów: unikalne dane → cytowania w mediach → linki.
- **Galeria „przed/po"** — użytkownicy wrzucają metamorfozy ogrodów zrobione wg planu z generatora;
  UGC + dowód społeczny (moderowane, dalsza przyszłość).

---

## Proponowana kolejność

| Faza | Zakres | Efekt |
|------|--------|-------|
| 1 (teraz) | 1.1–1.3: nowe kalkulatory, huby, dane | szybki wzrost long-tail SEO — **Faza 1 ukończona** |
| 2 | 2.1–2.4 + 7: encyklopedia, diagnostyka, regiony, prawo | ×10 liczba indeksowanych stron |
| 3 | 3.1–3.4 + 9: profil, projektant 2.0, gra dzienna, widgety | retencja, powroty, linki |
| 4 | 4: AI + 5: monetyzacja + 8: eko-narzędzia | wyróżnik rynkowy i przychód |

Zasada przewodnia: **każda nowa strona liczy coś konkretnego albo odpowiada na konkretne
pytanie z Google** — żadnych ogólnych „blogów o ogrodzie", które ma każdy.
