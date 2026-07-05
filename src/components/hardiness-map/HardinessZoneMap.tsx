"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
  VOIVODESHIP_ZONES,
  ZONE_COLORS,
  ZONE_LEGEND,
  projectPoland,
  getVoivodeshipById,
  type VoivodeshipZone,
  type HardinessZone,
} from "@/lib/constants/hardiness-zones";
import { VOIVODESHIP_PATHS } from "@/lib/constants/poland-voivodeship-paths";
import {
  searchHardinessCities,
  getCityZone,
  HARDINESS_CITIES,
  type HardinessCity,
} from "@/lib/constants/hardiness-cities";

const PATH_BY_ID = Object.fromEntries(VOIVODESHIP_PATHS.map((p) => [p.id, p]));

export function HardinessZoneMap() {
  const [selectedId, setSelectedId] = useState<string>("mazowieckie");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<HardinessCity | null>(null);
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => searchHardinessCities(query), [query]);

  const region = useMemo(
    () => getVoivodeshipById(selectedId) ?? VOIVODESHIP_ZONES[0]!,
    [selectedId]
  );

  const activeZone: HardinessZone = selectedCity
    ? getCityZone(selectedCity, region.zone)
    : region.zone;

  const activeId = hoverId ?? selectedId;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function selectCity(city: HardinessCity) {
    setSelectedCity(city);
    setSelectedId(city.voivodeshipId);
    setQuery(city.name);
    setSuggestionsOpen(false);
  }

  function clearCity() {
    setSelectedCity(null);
    setQuery("");
  }

  const cityMarker = selectedCity
    ? projectPoland(selectedCity.lon, selectedCity.lat)
    : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <CitySearch
          ref={searchRef}
          query={query}
          onQueryChange={(v) => {
            setQuery(v);
            setSuggestionsOpen(true);
            if (!v.trim()) setSelectedCity(null);
          }}
          suggestions={suggestions}
          open={suggestionsOpen && suggestions.length > 0}
          onSelect={selectCity}
          onClear={clearCity}
          onFocus={() => query.length >= 2 && setSuggestionsOpen(true)}
        />

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 overflow-hidden">
          <svg
            viewBox="0 0 800 780"
            className="w-full h-auto max-h-[520px]"
            role="img"
            aria-label="Interaktywna mapa stref mrozoodporności USDA w Polsce"
          >
            <rect x="0" y="0" width="800" height="780" fill="#f0f7f4" rx="8" />

            {VOIVODESHIP_ZONES.map((v) => {
              const pathData = PATH_BY_ID[v.id];
              if (!pathData) return null;
              const colors = ZONE_COLORS[v.zone];
              const isActive = v.id === activeId;
              const isSelected = v.id === selectedId;
              return (
                <path
                  key={v.id}
                  d={pathData.path}
                  fill={isActive ? colors.hover : colors.fill}
                  stroke={isSelected ? "#0f172a" : colors.stroke}
                  strokeWidth={isSelected ? 2.5 : 1}
                  strokeLinejoin="round"
                  opacity={hoverId && hoverId !== v.id ? 0.65 : 0.92}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => {
                    setSelectedId(v.id);
                    setSelectedCity(null);
                    setQuery("");
                  }}
                  onMouseEnter={() => setHoverId(v.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(v.id)}
                  onBlur={() => setHoverId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${v.name}, strefa ${v.zone}`}
                  aria-pressed={isSelected}
                />
              );
            })}

            {VOIVODESHIP_PATHS.map((p) => {
              const v = getVoivodeshipById(p.id);
              if (!v) return null;
              const isActive = p.id === activeId;
              return (
                <text
                  key={`label-${p.id}`}
                  x={p.label[0]}
                  y={p.label[1]}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  fill={isActive ? "#fff" : "rgba(255,255,255,0.92)"}
                  fontSize={10}
                  fontWeight={isActive ? 700 : 500}
                >
                  {v.zone.toUpperCase()}
                </text>
              );
            })}

            {cityMarker && (
              <g aria-label={`Wybrane miasto: ${selectedCity!.name}`}>
                <circle
                  cx={cityMarker[0]}
                  cy={cityMarker[1]}
                  r={9}
                  fill="#0f172a"
                  opacity={0.15}
                />
                <circle
                  cx={cityMarker[0]}
                  cy={cityMarker[1]}
                  r={5}
                  fill="#dc2626"
                  stroke="#fff"
                  strokeWidth={2}
                />
              </g>
            )}
          </svg>
        </div>

        <ZoneLegend />
      </div>

      <RegionPanel region={region} city={selectedCity} activeZone={activeZone} />
    </div>
  );
}

interface CitySearchProps {
  query: string;
  onQueryChange: (v: string) => void;
  suggestions: HardinessCity[];
  open: boolean;
  onSelect: (city: HardinessCity) => void;
  onClear: () => void;
  onFocus: () => void;
}

const CitySearch = ({
  ref,
  query,
  onQueryChange,
  suggestions,
  open,
  onSelect,
  onClear,
  onFocus,
}: CitySearchProps & { ref: RefObject<HTMLDivElement | null> }) => (
  <div ref={ref} className="relative">
    <label htmlFor="city-search" className="block text-sm font-medium text-foreground mb-1">
      Wyszukaj miasto
    </label>
    <div className="flex gap-2">
      <input
        id="city-search"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onFocus}
        placeholder="np. Warszawa, Zakopane, Gdańsk…"
        autoComplete="off"
        className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-border px-3 text-sm text-muted hover:text-foreground"
        >
          Wyczyść
        </button>
      )}
    </div>
    {open && (
      <ul
        className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden"
        role="listbox"
      >
        {suggestions.map((city) => {
          const voiv = getVoivodeshipById(city.voivodeshipId);
          const zone = voiv ? getCityZone(city, voiv.zone) : city.zoneOverride;
          return (
            <li key={city.id} role="option">
              <button
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/50 flex items-center justify-between gap-2"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(city)}
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-xs text-muted shrink-0">
                  USDA {zone?.toUpperCase()}
                  {voiv ? ` · ${voiv.name}` : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    )}
    <p className="mt-1.5 text-xs text-muted">
      {HARDINESS_CITIES.length} miast w bazie — w tym miejscowości górskie ze strefą 5b.
    </p>
  </div>
);

function ZoneLegend() {
  return (
    <div className="flex flex-wrap gap-3">
      {ZONE_LEGEND.map(({ zone, description }) => {
        const c = ZONE_COLORS[zone];
        return (
          <div
            key={zone}
            className="flex items-start gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs max-w-xs"
          >
            <span
              className="mt-0.5 h-3 w-3 shrink-0 rounded-sm border"
              style={{ backgroundColor: c.fill, borderColor: c.stroke }}
              aria-hidden
            />
            <div>
              <span className="font-semibold text-foreground">
                {c.label} ({c.temp})
              </span>
              <p className="text-muted mt-0.5">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RegionPanel({
  region,
  city,
  activeZone,
}: {
  region: VoivodeshipZone;
  city: HardinessCity | null;
  activeZone: HardinessZone;
}) {
  const colors = ZONE_COLORS[activeZone];
  const voivColors = ZONE_COLORS[region.zone];

  return (
    <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 h-fit lg:sticky lg:top-24">
      {city ? (
        <>
          <p className="text-xs font-semibold text-muted uppercase mb-2">Wybrane miasto</p>
          <h2 className="text-xl font-bold text-primary-dark">{city.name}</h2>
          <p className="text-sm text-muted mt-1">{region.name}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-primary-dark">{region.name}</h2>
          <p className="text-sm text-muted mt-1">Stolica: {region.capital}</p>
        </>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: colors.fill }}
        >
          USDA {activeZone.toUpperCase()}
        </span>
        <span className="text-xs text-muted">{colors.temp}</span>
        {city?.zoneOverride && city.zoneOverride !== region.zone && (
          <span className="text-xs text-muted">
            (województwo: {voivColors.label.toLowerCase()})
          </span>
        )}
      </div>

      {(city?.zoneNote || (!city && region.zoneNote)) && (
        <p className="mt-3 text-xs rounded-lg bg-amber-50 border border-amber-100 text-amber-900 px-3 py-2">
          ⚠️ {city?.zoneNote ?? region.zoneNote}
        </p>
      )}

      <p className="mt-4 text-sm text-muted leading-relaxed">{region.description}</p>

      <dl className="mt-4 grid gap-2 text-sm">
        <div className="rounded-lg bg-accent/40 px-3 py-2">
          <dt className="text-xs font-semibold text-muted uppercase">Ostatnie przymrozki</dt>
          <dd className="font-medium">{region.avgLastFrost}</dd>
        </div>
        <div className="rounded-lg bg-accent/40 px-3 py-2">
          <dt className="text-xs font-semibold text-muted uppercase">Pierwsze przymrozki jesienią</dt>
          <dd className="font-medium">{region.avgFirstFrost}</dd>
        </div>
      </dl>

      {city?.irrigationSlug && (
        <div className="mt-4">
          <Link
            href={`/kalkulator-nawadniania/${city.irrigationSlug}`}
            className="text-sm text-primary font-medium hover:underline"
          >
            Nawadnianie — {city.name} →
          </Link>
        </div>
      )}

      <div className="mt-5">
        <p className="text-xs font-semibold text-muted uppercase mb-2">Powiązane narzędzia</p>
        <div className="flex flex-col gap-2">
          {region.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-primary font-medium hover:underline"
            >
              {link.label} →
            </Link>
          ))}
          <Link
            href="/alternatywy-dla-tui"
            className="text-sm text-primary font-medium hover:underline"
          >
            Dobierz rośliny do strefy {activeZone} →
          </Link>
        </div>
      </div>
    </aside>
  );
}
