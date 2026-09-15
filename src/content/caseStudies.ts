export type CaseStudy = {
  id: string;
  name: string;
  headline: string;
  oneLiner: string;
  stat: string;
  before: string;
  after: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "croctrack",
    name: "CrocTrack",
    headline: "From paper logs to live intelligence",
    oneLiner:
      "A KZN crocodile farm was tracking welfare data for 2,000+ animals by hand — now it's a live dashboard with heat maps and AI-flagged discrepancies.",
    stat: "2,000+ animals · 11 welfare checks/month, fully digital",
    before: "Paper capture → retyped twice → Excel",
    after: "Tablet capture → instant sync → live dashboard",
  },
  {
    id: "kzn-auction",
    name: "KZN Auction Platform",
    headline: "A custom platform that paid for itself in month one",
    oneLiner:
      "We replaced a rented auction service with a custom-built platform — cutting monthly costs by over 95% and opening the door to national auctions.",
    stat: "R5,000/month → ~R200/year",
    before: "Rented, limited, local-only service",
    after: "Owned platform, national reach",
  },
  {
    id: "hospital-workflow",
    name: "Hospital Digital Workflow",
    headline: "One QR code, an entire patient journey",
    oneLiner:
      "We took a hospital fully off paper — from check-in to pharmacy to payment — with a single QR code driving every step and costs calculated automatically.",
    stat: "4-stage patient journey, zero paper",
    before: "Manual forms, manual billing, manual errors",
    after: "QR-driven, automatic, correctable in real time",
  },
  {
    id: "easy-shelf-point",
    name: "Easy Shelf Point",
    headline: "Stock loading, off the desktop and into your pocket",
    oneLiner:
      "A retail workflow that took close to 70 minutes to load 18 items is now something staff can do from their phones, on the floor, during a busy day.",
    stat: "Mobile-first stock entry, no PC required",
    before: "PC-bound, slow, deskbound stock loading",
    after: "Phone-based, on-the-floor entry",
  },
];
