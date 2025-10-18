export interface Flashcard {
  id: number;
  chapter: string;
  topic: string;
  acronym: string;
  breakdown?: { [key: string]: string };
  color: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    chapter: "Chapter 3",
    topic: "Factors to consider in relation to the external environment",
    acronym: "CREATE GREAT LISTS",
    color: "#FF6B6B"
  },
  {
    id: 2,
    chapter: "Chapter 4",
    topic: "Main functions of a regulator",
    acronym: "SERVICE",
    color: "#4ECDC4"
  },
  {
    id: 3,
    chapter: "Chapter 10",
    topic: "Contract design factors",
    acronym: "AMPLE DIRECT FACTORS",
    color: "#45B7D1"
  },
  {
    id: 4,
    chapter: "Chapter 10",
    topic: "Expenses incurred by a product provider",
    acronym: "RAPID COST",
    color: "#FFA07A"
  },
  {
    id: 5,
    chapter: "Chapter 12",
    topic: "Risk identification tools",
    acronym: "DR RUB",
    color: "#98D8C8"
  },
  {
    id: 6,
    chapter: "Chapter 12",
    topic: "Possible categories of risks in any capital project",
    acronym: "Preston North End Football Club Plays Brilliantly",
    color: "#F7DC6F"
  },
  {
    id: 7,
    chapter: "Chapters 13-16",
    topic: "Investment and risk characteristics of either the money markets, bond markets",
    acronym: "SYSTEM T",
    color: "#BB8FCE"
  },
  {
    id: 8,
    chapter: "Chapter 13",
    topic: "Benefits of investing in MMI for liquidity reasons",
    acronym: "POURS",
    color: "#85C1E2"
  },
  {
    id: 9,
    chapter: "Chapter 13",
    topic: "Reasons why return on other asset classes may be poor",
    acronym: "GRID",
    color: "#F8B88B"
  },
  {
    id: 10,
    chapter: "Chapter 13",
    topic: "The theories of the yield curve",
    acronym: "LIME",
    color: "#90EE90"
  },
  {
    id: 11,
    chapter: "Chapter 16",
    topic: "Factors on which a prime property will score highly",
    acronym: "CALL STreet",
    color: "#DDA0DD"
  },
  {
    id: 12,
    chapter: "Chapter 19",
    topic: "Factors to consider (practical problems) when investing overseas",
    acronym: "CATERPILLAR",
    color: "#FFB6C1"
  },
  {
    id: 13,
    chapter: "Chapter 19",
    topic: "The 3 main difficulties of overseas investment",
    acronym: "MTV",
    color: "#20B2AA"
  },
  {
    id: 14,
    chapter: "Chapter 19",
    topic: "Factors to consider when investing in emerging markets",
    acronym: "PIERCES & CREAMeR",
    color: "#FF69B4"
  },
  {
    id: 15,
    chapter: "Chapter 23",
    topic: "Ways of valuing individual investments",
    acronym: "SHAM FADS",
    color: "#87CEEB"
  },
  {
    id: 16,
    chapter: "Chapter 25",
    topic: "Factors influencing the long-term investment strategy of an institutional investor",
    acronym: "SOUNDER TRACTORS",
    color: "#DEB887"
  },
  {
    id: 17,
    chapter: "Booklet 8 (Chapters 25-28)",
    topic: "Regulatory influences on assets held",
    acronym: "TECH SCAM",
    color: "#5F9EA0"
  },
  {
    id: 18,
    chapter: "Chapter 29",
    topic: "Requirements of a good model",
    acronym: "VARIABLE CRISPS CARD",
    color: "#FF7F50"
  },
  {
    id: 19,
    chapter: "Chapter 30",
    topic: "Possible sources of data",
    acronym: "TRAINERS",
    color: "#6495ED"
  },
  {
    id: 20,
    chapter: "Chapter 30",
    topic: "Different uses of data",
    acronym: "SIR MAPEMAP",
    color: "#DC143C"
  },
  {
    id: 21,
    chapter: "Chapter 30",
    topic: "Problems with industry data",
    acronym: "DR DONEQ",
    color: "#00CED1"
  },
  {
    id: 22,
    chapter: "Chapter 34",
    topic: "Factors to consider when comparing options for providing outstanding benefits for a discontinuing scheme",
    acronym: "CRISES E",
    color: "#9370DB"
  },
  {
    id: 23,
    chapter: "Chapter 37",
    topic: "Reasons why disclosure is important to beneficiaries and also to the provider or sponsor",
    acronym: "SIMMERS",
    color: "#8FBC8F"
  },
  {
    id: 24,
    chapter: "Chapter 37",
    topic: "Information to be disclosed from a benefit scheme",
    acronym: "DISCLOSURE",
    color: "#E9967A"
  },
  {
    id: 25,
    chapter: "Chapter 37",
    topic: "When information from a benefit scheme should be disclosed",
    acronym: "PRICE",
    color: "#48D1CC"
  },
  {
    id: 26,
    chapter: "Chapter 38",
    topic: "Reasons for analysing surplus",
    acronym: "DIVERGENCE",
    color: "#C71585"
  },
  {
    id: 27,
    chapter: "Booklet 11 (Chapters 39-43)",
    topic: "The principles (or canons) of lending",
    acronym: "CASPAR",
    color: "#FFD700"
  },
  {
    id: 28,
    chapter: "Chapter 40",
    topic: "Possible causes of inappropriate advice",
    acronym: "CRIMES",
    color: "#ADFF2F"
  },
  {
    id: 29,
    chapter: "Chapter 41",
    topic: "Additional criteria that should ideally be met for a risk to be insurable",
    acronym: "MUD PIeS",
    color: "#FF6347"
  },
  {
    id: 30,
    chapter: "Chapter 44",
    topic: "Reasons why financial providers need capital",
    acronym: "DESCARTES",
    color: "#40E0D0"
  },
  {
    id: 31,
    chapter: "Chapter 45",
    topic: "Reasons providers underwrite",
    acronym: "SAFER",
    color: "#EE82EE"
  },
  {
    id: 32,
    chapter: "Chapter 46",
    topic: "Reasons why financial providers need capital",
    acronym: "REGulatory CUSHION",
    color: "#F0E68C"
  },
  {
    id: 33,
    chapter: "Chapter 46",
    topic: "Importance of risk reporting",
    acronym: "FRAUD CRIME",
    color: "#FA8072"
  }
];

// Extract unique chapters for filtering
export const chapters = Array.from(new Set(flashcards.map(card => card.chapter))).sort();
