export type ToxicityLevel = "bezpieczna" | "lagodna" | "umiarkowana" | "wysoka";

export interface PetPlant {
  id: string;
  name: string;
  category: string;
  dog: ToxicityLevel;
  cat: ToxicityLevel;
  child: ToxicityLevel;
  symptoms?: string;
  note?: string;
}

export const PET_PLANTS: PetPlant[] = [
  { id: "tuja", name: "Tuja", category: "krzew", dog: "lagodna", cat: "lagodna", child: "lagodna", symptoms: "Wymioty po zjedzeniu gałązek", note: "Olejki eteryczne — unikaj żucia" },
  { id: "hortensja", name: "Hortensja", category: "krzew", dog: "umiarkowana", cat: "umiarkowana", child: "umiarkowana", symptoms: "Wymioty, biegunka, letarg" },
  { id: "lilia", name: "Lilia", category: "bylina", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "U kotów: niewydolność nerek — pilnie do weterynarza!" },
  { id: "konwalia", name: "Konwalia", category: "bylina", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "Zaburzenia rytmu serca" },
  { id: "bluszcz", name: "Bluszcz", category: "pnacze", dog: "umiarkowana", cat: "umiarkowana", child: "umiarkowana", symptoms: "Podrażnienie jamy ustnej, wymioty" },
  { id: "oleander", name: "Oleander", category: "krzew", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "Silne zatrucie sercowo-naczyniowe" },
  { id: "rododendron", name: "Rododendron / azalia", category: "krzew", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "Wymioty, ślinienie, zaburzenia serca" },
  { id: "cebula", name: "Cebula / czosnek", category: "cebula", dog: "umiarkowana", cat: "wysoka", child: "lagodna", symptoms: "Uszkodzenie czerwonych krwinek u kotów i psów" },
  { id: "winogrono", name: "Winogrono / rodzynki", category: "krzew", dog: "wysoka", cat: "wysoka", child: "umiarkowana", symptoms: "U psów: niewydolność nerek" },
  { id: "jagoda", name: "Żurawina / borówka (owoc)", category: "krzew", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna", note: "Owoce jadalne; liście w dużych ilościach mogą podrażniać" },
  { id: "kasztan", name: "Kasztanowiec", category: "drzewo", dog: "umiarkowana", cat: "umiarkowana", child: "umiarkowana", symptoms: "Orzechy — wymioty, ból brzucha" },
  { id: "bukszpan", name: "Bukszpan", category: "krzew", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "Silne zatrucie — wszystkie części" },
  { id: "lawenda", name: "Lawenda", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna", note: "W małych ilościach; olejek koncentrowany może podrażniać" },
  { id: "rozmaryn", name: "Rozmaryn", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "mieta", name: "Mięta", category: "bylina", dog: "lagodna", cat: "lagodna", child: "bezpieczna", note: "Duże ilości mogą podrażniać żołądek" },
  { id: "grab", name: "Grab", category: "krzew", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "berberys", name: "Berberys", category: "krzew", dog: "lagodna", cat: "lagodna", child: "lagodna", symptoms: "Jagody — łagodne podrażnienie" },
  { id: "funkia", name: "Funkia", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "hosta", name: "Hosta", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "brzoza", name: "Brzoza (kora)", category: "drzewo", dog: "lagodna", cat: "lagodna", child: "lagodna", note: "Żucie kory — podrażnienie jamy ustnej" },
  { id: "cis", name: "Cis", category: "krzew", dog: "wysoka", cat: "wysoka", child: "wysoka", symptoms: "Nasiona i gałązki — bardzo trujące" },
  { id: "wierzba", name: "Wierzba", category: "drzewo", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna", note: "Kora zawiera salicynę — u psów duże ilości mogą szkodzić" },
  { id: "narcyz", name: "Narcyz / żonkilia", category: "cebula", dog: "umiarkowana", cat: "umiarkowana", child: "umiarkowana", symptoms: "Bulwy najbardziej toksyczne" },
  { id: "tulipan", name: "Tulipan", category: "cebula", dog: "lagodna", cat: "lagodna", child: "lagodna", symptoms: "Bulwy — wymioty" },
  { id: "pierwiosnek", name: "Pierwiosnek", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "ostrokrzew", name: "Ostrokrzew", category: "krzew", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna", note: "Jagody jadalne dla ludzi; psy rzadko się nimi interesują" },
  { id: "ligustr", name: "Ligustr", category: "krzew", dog: "umiarkowana", cat: "umiarkowana", child: "umiarkowana", symptoms: "Jagody i liście" },
  { id: "kalmia", name: "Kalmia", category: "krzew", dog: "wysoka", cat: "wysoka", child: "wysoka" },
  { id: "paproć", name: "Paproć ogrodowa", category: "bylina", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna" },
  { id: "trawy", name: "Trawa (murawa)", category: "trawnik", dog: "bezpieczna", cat: "bezpieczna", child: "bezpieczna", note: "Żucie trawy zwykle nieszkodliwe; sprawdź czy nie była opryskana" },
];

export const PET_PLANTS_FAQ = [
  {
    question: "Czy tuja jest trująca dla psa?",
    answer:
      "Tuja zawiera olejki eteryczne (tujon). Zjedzenie większej ilości gałązek może powodować wymioty u psa i kota. Nie jest to tak groźne jak lilie czy cis, ale warto ograniczyć dostęp szczenięcia do żucia żywopłotu.",
  },
  {
    question: "Które rośliny ogrodowe są najbardziej niebezpieczne dla kota?",
    answer:
      "Szczególnie niebezpieczne dla kotów są lilie (niewydolność nerek), konwalia, oleander, cis, bukszpan oraz cebula i czosnek. Nawet mała ilość liści lilii może być śmiertelna — natychmiast do weterynarza.",
  },
  {
    question: "Jakie rośliny są bezpieczne w ogrodzie z psem?",
    answer:
      "Bezpieczne i popularne: lawenda, rozmaryn, grab, funkie, hosty, ostrokrzew, trawnik. Zawsze monitoruj nowego szczeniaka i unikaj roślin z kategorii „wysoka” toksyczność z naszej listy.",
  },
];
