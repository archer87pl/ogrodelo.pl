# Ogrodelo.pl

Darmowe kalkulatory ogrodowe — Next.js, SEO, polski klimat.

## Kalkulatory

1. **Nawadnianie** — zapotrzebowanie na wodę, harmonogram, pogoda
2. **Żywopłot** — sadzonki, koszt, wysokość w czasie
3. **Prywatność** — wysokość roślin, symulacja sezonowa
4. **Nawożenie** — ilość nawozu, harmonogram
5. **Deszczówka** — zbiornik, roczna ilość wody
6. **Cień** — powierzchnia zacienienia wg miesiąca
7. **Wzrost roślin** — grab, tuja, laurowiśnia i inne
8. **Trawnik** — nasiona, ziemia, koszt
9. **Robot koszący** — dobór modelu, opłacalność
10. **Alternatywy dla tui** — zamienniki zimozielone

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm start
```

## SEO

- Metadata i Open Graph na każdej stronie
- JSON-LD (WebSite, WebApplication, BreadcrumbList)
- `sitemap.xml` i `robots.txt`
- Treści SEO pod kalkulatorami
- Semantyczny HTML, `lang="pl"`

## API pogodowe

Kalkulatory nawadniania i deszczówki korzystają z [Open-Meteo](https://open-meteo.com/) (bez klucza API).
