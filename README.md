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

## GitHub Pages

Statyczny export (542 strony) z workflow CI:

```bash
# lokalnie (custom domain — bez basePath)
$env:GITHUB_PAGES="true"
$env:NEXT_PUBLIC_SITE_URL="https://www.ogrodelo.pl"
npm run build:pages

# alternatywnie: github.io/project (wymaga basePath)
$env:GITHUB_PAGES="true"
$env:GITHUB_PAGES_BASE_PATH="/ogrodelo.pl"
$env:NEXT_PUBLIC_SITE_URL="https://archer87pl.github.io/ogrodelo.pl"
npm run build:pages
```

Po pushu na `main` workflow `.github/workflows/deploy-pages.yml` publikuje katalog `out/` na:

**https://www.ogrodelo.pl**

### Włączenie w repozytorium

1. GitHub → **Settings** → **Pages**
2. **Source:** GitHub Actions
3. Push na `main` uruchomi build i deploy

Kalkulatory pogodowe (nawadnianie, deszczówka) wołają Open-Meteo bezpośrednio z przeglądarki — bez serwera Node.

## SEO

- Metadata i Open Graph na każdej stronie
- JSON-LD (WebSite, WebApplication, BreadcrumbList)
- `sitemap.xml` i `robots.txt`
- Treści SEO pod kalkulatorami
- Semantyczny HTML, `lang="pl"`

## API pogodowe

Kalkulatory nawadniania i deszczówki korzystają z [Open-Meteo](https://open-meteo.com/) (bez klucza API).
