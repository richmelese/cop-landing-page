import {
  Building2,
  Factory,
  FileCheck2,
  Flame,
  GraduationCap,
  Globe2,
  HeartHandshake,
  Hotel,
  Landmark,
  Megaphone,
  Plane,
  Radio,
  Recycle,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  Truck,
  Wind,
  Zap,
} from "lucide-react";
import type { Section, Stat, TimelineItem } from "@/components/DetailBody";

export type DetailPageContent = {
  title: string;
  eyebrow: string;
  sectionLabel: string;
  sectionHref?: string;
  summary: string;
  image?: "night" | "sunset" | "view";
  sections: Section[];
  timeline?: TimelineItem[];
  stats?: Stat[];
  tagline?: string;
  note?: string;
  visitor?: boolean;
  visitorLabel?: string;
  showWeather?: boolean;
};

// TODO: this content is illustrative placeholder copy for a concept build of the COP32 Ethiopia
// site, modelled on the structure of cop31.tr. Replace with authenticated, Presidency-approved
// text, names and dates before any public launch.
export const detailPages: Record<string, DetailPageContent> = {
  "presidency/what-is-cop": {
    title: "What is COP? What is COP32?",
    image: "night",
    eyebrow: "COP32 Presidency",
    sectionLabel: "COP32 Presidency",
    summary: "The world's highest-level annual climate negotiation, and why COP32 matters for Africa.",
    sections: [
      {
        heading: "What is COP?",
        body: [
          "The Conference of the Parties, or COP, is the supreme decision-making body of the United Nations Framework Convention on Climate Change (UNFCCC), adopted in 1992. Each year, nearly every nation on earth meets to review implementation of the Convention and decide on the collective response to climate change.",
          "COP is the leading multilateral forum for global climate governance — the venue where emission targets are negotiated, finance is mobilised, and collective action advances from one session to the next.",
        ],
      },
      {
        heading: "The Role of COP in Global Climate Governance",
        body: [
          "At the centre of each session is a review of Parties' national communications and greenhouse gas inventories, assessed against the overall goals of the Convention.",
        ],
        list: [
          { title: "Effect of national measures", body: "Reviewing what countries are actually doing against their commitments." },
          { title: "Progress toward the Convention's objective", body: "Tracking collective progress against the 1.5°C pathway." },
          { title: "Raising ambition and implementation", body: "Identifying where targets and delivery need to go further." },
        ],
      },
      {
        heading: "What is COP32?",
        body: [
          "COP32 is the 32nd session of the Conference of the Parties, hosted by Ethiopia in Addis Ababa in 2027. The session continues the process begun at COP30 in Belém and COP31 in Antalya, advancing dialogue, consensus, and — above all — implementation.",
          "As host, Ethiopia brings the perspective of a continent on the front line of climate impacts, and a seat of African diplomacy as home to both the African Union and the UN Economic Commission for Africa.",
        ],
        facts: [
          { label: "Full name", value: "UNFCCC 32nd Conference of the Parties (COP32)" },
          { label: "Dates", value: "November 2027 (to be confirmed)" },
          { label: "Location", value: "Addis Ababa, Ethiopia" },
          { label: "Host country", value: "Ethiopia" },
          { label: "COP32 President", value: "President-Designate (to be announced)" },
          { label: "Previous COP", value: "COP31, Antalya, Türkiye (2026)" },
        ],
      },
      {
        heading: "Priority Areas",
        list: [
          { title: "Emission Targets & Implementation", body: "Strengthened Nationally Determined Contributions (NDCs) under the Paris Agreement." },
          { title: "Climate Finance", body: "Delivering against the new collective quantified finance goal set at COP29." },
          { title: "Adaptation & Resilience", body: "Protecting the most vulnerable countries and communities from climate impacts." },
        ],
      },
      {
        heading: "Why Ethiopia, Why Addis Ababa?",
        body: [
          "Ethiopia sits at the heart of the Horn of Africa, a region acutely exposed to drought and climate variability, and has invested heavily in renewable energy and reforestation through its Green Legacy Initiative. Addis Ababa's standing as Africa's diplomatic capital makes it a natural home for a COP focused on turning global commitments into action for the continent.",
        ],
      },
      {
        heading: "COP: From Negotiation to Implementation",
        body: [
          "COP is increasingly a platform for governments, finance institutions, business, and civil society to work together — not negotiations alone.",
        ],
        list: [
          { title: "Climate finance mobilisation", body: "Connecting public and private capital to climate priorities." },
          { title: "Technology transfer & capacity building", body: "Helping countries access and deploy climate solutions." },
          { title: "Adaptation & resilience strategies", body: "Turning national adaptation plans into funded projects." },
          { title: "Public–private partnerships", body: "Bringing business into delivery of the Action Agenda." },
          { title: "Innovation & implementation", body: "Scaling what already works, faster." },
        ],
      },
      {
        heading: "COP32 — Addis Ababa, Ethiopia (2027)",
        body: [
          "COP32 aims to carry the momentum of Belém and Antalya forward, with Ethiopia playing a constructive, bridge-building role between developed and developing nations on finance, technology, and resilience.",
        ],
      },
    ],
    timeline: [
      { year: "1992", title: "UNFCCC Adopted", body: "Adopted at the Rio Earth Summit, establishing the global framework for climate action.", icon: Globe2 },
      { year: "1995", title: "COP1, Berlin", body: "The first Conference of the Parties launches formal climate negotiations.", icon: Megaphone },
      { year: "1997", title: "Kyoto Protocol", body: "COP3 adopts the Kyoto Protocol, setting binding targets for developed countries.", icon: FileCheck2 },
      { year: "2009", title: "COP15, Copenhagen", body: "Climate change is raised to the top of the global political agenda.", icon: Landmark },
      { year: "2015", title: "Paris Agreement", body: "COP21 adopts the Paris Agreement, targeting well below 2°C, pursuing 1.5°C.", icon: HeartHandshake },
      { year: "2021", title: "COP26, Glasgow", body: "Strengthens mitigation, adaptation, and finance commitments.", icon: Wind },
      { year: "2022", title: "COP27, Sharm el-Sheikh", body: "Agreement to establish a Loss and Damage fund.", icon: HeartHandshake },
      { year: "2023", title: "COP28, UAE", body: "Parties agree to transition away from fossil fuels in energy systems.", icon: Flame },
      { year: "2024", title: "COP29, Baku", body: "A new climate finance goal is set, beyond the $100 billion commitment.", icon: Landmark },
      { year: "2025", title: "COP30, Belém", body: "Focuses on stronger NDCs and accelerating implementation.", icon: Target },
      { year: "2026", title: "COP31, Antalya, Türkiye", body: "Advances dialogue and implementation across finance, technology, and resilience.", icon: Factory },
      { year: "2027", title: "COP32, Addis Ababa, Ethiopia", body: "The first COP in the Horn of Africa, centred on delivery and implementation finance.", icon: Sprout, current: true },
    ],
    stats: [
      { value: "197", label: "Parties" },
      { value: "1.5°C", label: "Target" },
      { value: "32nd", label: "Session in 2027" },
      { value: "~100,000", label: "Participants" },
    ],
    tagline: "From Dialogue to Consensus, From Consensus to Action",
  },

  "presidency/leadership": {
    title: "Leadership",
    eyebrow: "COP32 Presidency",
    sectionLabel: "COP32 Presidency",
    summary: "The team and structure guiding Ethiopia's COP32 Presidency.",
    image: "sunset",
    sections: [
      {
        heading: "Leadership",
        body: [
          "Ethiopia's COP32 Presidency is led by a President-Designate, supported by a National Organising Committee that brings together government ministries, the City Administration of Addis Ababa, and technical experts seconded from the UNFCCC Secretariat.",
          "The Presidency works in close coordination with the African Union and the UN Economic Commission for Africa, both headquartered in Addis Ababa, to ensure the continent's priorities are reflected throughout the negotiations.",
        ],
        subsections: [
          { title: "Head of State Patronage", body: "Political leadership and backing from the Government of Ethiopia." },
          { title: "Honorary Patron", body: "A public figure championing civic and social engagement around COP32." },
          { title: "President-Designate", body: "Leads the Presidency's strategy and represents it internationally." },
          { title: "President of Negotiations", body: "Chairs the Blue Zone negotiation process on behalf of the Presidency." },
        ],
      },
    ],
    note: "Full leadership profiles and names will be published once the Presidency team is formally announced.",
  },
  "presidency/advisory-boards": {
    title: "Advisory Boards",
    image: "view",
    eyebrow: "COP32 Presidency",
    sectionLabel: "COP32 Presidency",
    summary: "Independent thematic boards guiding the Presidency's priorities.",
    sections: [
      {
        heading: "Advisory Boards",
        body: [
          "To ground COP32's agenda in expertise and lived experience, the Presidency is convening a set of advisory boards spanning science, finance, youth, and gender — mirroring the structure used by recent COP Presidencies. Each board brings outside voices directly into the Presidency's planning.",
          "Seats on each board will be filled, and members announced, as the Presidency's organising committee is formally constituted.",
        ],
        boardGroups: [
          {
            title: "Science & Technical Advisory Board",
            description: "Grounds the agenda in the latest climate science and data.",
            seats: [
              { role: "Chair" },
              { role: "Climate science lead" },
              { role: "Data & monitoring lead" },
            ],
          },
          {
            title: "Climate Finance Board",
            description: "Advises on mobilising and tracking implementation finance.",
            seats: [
              { role: "Chair" },
              { role: "Multilateral finance liaison" },
              { role: "Private sector liaison" },
            ],
          },
          {
            title: "Youth Advisory Board",
            description: "Ensures young people shape the negotiations, not just attend them.",
            seats: [
              { role: "Chair" },
              { role: "Youth delegate, East Africa" },
              { role: "Youth delegate, at large" },
            ],
          },
          {
            title: "Gender & Inclusion Board",
            description: "Centres gender-responsive climate action across the agenda.",
            seats: [
              { role: "Chair" },
              { role: "Gender policy lead" },
              { role: "Disability & inclusion lead" },
            ],
          },
        ],
      },
    ],
  },
  "presidency/priorities": {
    title: "Presidency Priorities",
    image: "night",
    eyebrow: "COP32 Presidency",
    sectionLabel: "COP32 Presidency",
    summary: "What Ethiopia's Presidency intends to drive forward at COP32.",
    sections: [
      {
        heading: "Presidency Priorities",
        body: [
          "Building on the outcomes of COP29 and COP30, the COP32 Presidency is focused on turning years of pledges into delivery — particularly for the countries and communities most exposed to climate change.",
        ],
        list: [
          { title: "Africa's climate resilience", body: "Elevating adaptation finance and resilience for the continent." },
          { title: "Implementation finance", body: "Closing the gap between pledged and delivered climate finance." },
          { title: "Just transition", body: "Supporting green industrialisation without leaving workers behind." },
          { title: "Loss and damage", body: "Operationalising support for countries facing irreversible climate harm." },
        ],
      },
    ],
  },
  "presidency/keynote-speeches": {
    title: "Keynote Speeches",
    image: "sunset",
    eyebrow: "COP32 Presidency",
    sectionLabel: "COP32 Presidency",
    summary: "Addresses from world leaders and the COP32 Presidency.",
    sections: [
      {
        heading: "Keynote Speeches",
        body: [
          "Keynote addresses from Heads of State, the COP32 President, and the UN Secretary-General will be published here as video and transcript as the conference programme is finalised.",
        ],
      },
    ],
    note: "No keynote speeches have been scheduled yet. Check back closer to the conference.",
  },

  "vision/success": {
    title: "Vision for Success",
    image: "view",
    eyebrow: "COP32 Vision",
    sectionLabel: "COP32 Vision",
    summary: "COP32: a turning point for climate action, built on dialogue, consensus, and delivery.",
    showWeather: true,
    sections: [
      {
        heading: "A Turning Point for Climate Action",
        body: [
          "COP32 aims to be remembered not for the pledges it produced, but for what was actually delivered. Addis Ababa becomes a working table where governments, cities, business, and civil society convert years of negotiation into financed, measurable projects.",
          "That shift starts with trust. Rebuilding confidence between developed and developing nations — and between negotiators and the communities they represent — is the foundation every other outcome at COP32 depends on.",
        ],
      },
      {
        heading: "Three Core Pillars",
        pillars: [
          {
            title: "Rebuilding Trust Through Dialogue",
            body: "Giving a real seat at the table to vulnerable nations, local governments, civil society, and youth — not just national delegations.",
          },
          {
            title: "Shared Responsibility Through Consensus",
            body: "Treating energy security and emissions goals as complementary, and building consensus around a transition that is fair to workers and economies alike.",
          },
          {
            title: "Turning Commitments Into Action",
            body: "Linking global targets to funded, on-the-ground projects through an expanded Climate Implementation Bridge.",
          },
        ],
      },
      {
        heading: "Global Implementation Targets",
        body: [
          "Alongside the negotiations, the COP32 Presidency is proposing a set of measurable targets to track real progress through 2035.",
        ],
        targets: [
          { icon: Zap, value: "35%", title: "Electrification", body: "Raising the global electrification rate by 2035." },
          { icon: Recycle, value: "50%", title: "Zero Waste & Methane Reduction", body: "Slowing the growth of waste generation by 2035." },
          { icon: Building2, value: "25%", title: "Resilient Cities & Buildings", body: "Cutting building-sector energy intensity by 2035." },
          { icon: Factory, value: "15%", title: "Green Industrialisation", body: "Increasing circular materials use in production by 2035." },
          { icon: GraduationCap, title: "Awareness Across All Areas", body: "Climate-resilient farming and climate education, society-wide, by 2035." },
          { icon: Scale, title: "Climate Implementation Bridge", body: "Scaling the mechanism that funds and accelerates national climate plans." },
        ],
      },
    ],
    stats: [
      { value: "197", label: "Parties" },
      { value: "1.5°C", label: "Target" },
      { value: "32nd", label: "Session in 2027" },
      { value: "~100,000", label: "Participants" },
    ],
    tagline: "From Dialogue to Consensus, From Consensus to Action",
  },
  "vision/action-agenda": {
    title: "COP32 Action Agenda",
    image: "night",
    eyebrow: "COP32 Vision",
    sectionLabel: "COP32 Vision",
    summary: "Ten implementation themes bridging negotiations and real-world delivery.",
    sections: [
      {
        heading: "COP32 Action Agenda",
        body: [
          "Alongside the formal negotiations, the COP32 Action Agenda convenes governments, cities, business, and civil society around ten themes where non-state actors can accelerate delivery.",
        ],
        subsections: [
          { title: "Clean Energy Transition", body: "Affordable, reliable renewable energy for all." },
          { title: "Zero Waste & Circular Economy", body: "Scalable, city-level circular economy solutions." },
          { title: "Climate-Resilient Cities", body: "Liveable, resilient urban places for everyone." },
          { title: "Green Industrialisation", body: "Low-carbon industry and a just transition." },
          { title: "Food Security", body: "Sustainable, resilient food systems for Africa and beyond." },
          { title: "Forests & Green Legacy", body: "Reforestation and land restoration at national scale." },
          { title: "Youth & Education", body: "Young people as builders of climate solutions." },
          { title: "Climate Implementation Bridge", body: "Moving from commitments to delivery and finance." },
          { title: "Rio Conventions Synergy", body: "Aligning climate, biodiversity, and desertification goals." },
          { title: "Resilient Health Systems", body: "Climate-resilient, low-carbon health care." },
        ],
      },
    ],
  },
  "vision/climate-story": {
    title: "Ethiopia's Climate Story",
    eyebrow: "COP32 Vision",
    sectionLabel: "COP32 Vision",
    summary: "A nation that has planted its way into the global climate conversation.",
    image: "view",
    sections: [
      {
        heading: "Ethiopia's Climate Story",
        body: [
          "Ethiopia adopted its Climate-Resilient Green Economy (CRGE) Strategy in 2011, one of the earliest national plans to pursue economic growth without increasing emissions — a framework that still guides the country's climate policy today.",
          "Since 2019, the Green Legacy Initiative has mobilised millions of citizens each rainy season in nationwide tree-planting campaigns, restoring degraded land and raising public awareness of climate action at a scale few countries have matched.",
          "Hosting COP32 builds on this record, and on Ethiopia's long-standing role as a seat of African diplomacy, as home to both the African Union and the UN Economic Commission for Africa.",
        ],
        facts: [
          { label: "National strategy", value: "Climate-Resilient Green Economy (2011)" },
          { label: "Flagship programme", value: "Green Legacy Initiative (since 2019)" },
          { label: "Regional role", value: "Host of the African Union & UNECA" },
          { label: "Elevation", value: "Addis Ababa, ~2,355m above sea level" },
        ],
      },
    ],
  },
  "vision/climate-cooperation": {
    title: "Climate Cooperation",
    image: "sunset",
    eyebrow: "COP32 Vision",
    sectionLabel: "COP32 Vision",
    summary: "Ethiopia's climate partnerships across Africa and beyond.",
    sections: [
      {
        heading: "Climate Cooperation",
        body: [
          "As host to the African Union and the UN Economic Commission for Africa, Addis Ababa is already a hub for continental climate diplomacy, from the Africa Climate Summit process to regional adaptation initiatives.",
          "COP32 strengthens this role, deepening South-South cooperation and linking African priorities — adaptation finance, debt, and just transition — directly into the global negotiations.",
        ],
      },
    ],
  },
  "vision/sustainability": {
    title: "Sustainability",
    image: "view",
    eyebrow: "COP32 Vision",
    sectionLabel: "COP32 Vision",
    summary: "How COP32 itself is being planned as a lower-impact conference.",
    sections: [
      {
        heading: "Sustainability",
        body: [
          "A UN climate summit should model the behaviour it asks of the world. The COP32 Presidency is targeting a low-waste, low-emissions conference: measuring and reporting its own footprint, sourcing locally where possible, and minimising single-use materials across both zones.",
        ],
        list: [
          { title: "Zero Waste operations", body: "Minimising and sorting conference waste on-site." },
          { title: "Carbon footprint reporting", body: "Measuring and publishing the event's emissions." },
          { title: "Local sourcing", body: "Prioritising Ethiopian suppliers for catering and materials." },
          { title: "Digital-first materials", body: "Reducing printed documentation across both zones." },
        ],
      },
    ],
  },

  "conference/overview": {
    title: "Conference Overview",
    image: "sunset",
    eyebrow: "Conference & Programme",
    sectionLabel: "Conference & Programme",
    summary: "What to expect from the two-week COP32 conference in Addis Ababa.",
    sections: [
      {
        heading: "Conference Overview",
        body: [
          "COP32 runs for two weeks in Addis Ababa, combining formal UNFCCC negotiations with a public-facing programme of events, exhibitions, and side events across the Blue and Green Zones.",
          "The first week focuses on technical negotiations between national delegations; the second week brings in Ministers and Heads of State for the high-level segment where final political decisions are made.",
        ],
        facts: [
          { label: "Format", value: "Blue Zone negotiations + Green Zone public programme" },
          { label: "Duration", value: "Two weeks" },
          { label: "Week one", value: "Technical negotiations" },
          { label: "Week two", value: "High-level segment (Ministers & Heads of State)" },
        ],
      },
    ],
    note: "Exact conference dates will be confirmed by the UNFCCC Secretariat closer to 2027.",
  },
  "conference/venue": {
    title: "COP32 Venue",
    eyebrow: "Conference & Programme",
    sectionLabel: "Conference & Programme",
    summary: "The UN Conference Centre Addis Ababa (UNCC-AA) will host COP32.",
    image: "view",
    sections: [
      {
        heading: "COP32 Venue",
        body: [
          "The UN Conference Centre Addis Ababa (UNCC-AA) is a purpose-built United Nations facility, home to the UN Economic Commission for Africa and a regular venue for African Union summits and major international gatherings.",
          "Its scale and existing UN security and logistics infrastructure make it a natural home for the Blue Zone negotiations, with surrounding grounds adapted to host the Green Zone's public programme.",
        ],
        facts: [
          { label: "Venue", value: "UN Conference Centre Addis Ababa (UNCC-AA)" },
          { label: "Operator", value: "UN Economic Commission for Africa" },
          { label: "Location", value: "Addis Ababa, Ethiopia" },
          { label: "Track record", value: "Regular host of African Union summits" },
        ],
      },
    ],
  },
  "conference/programme": {
    title: "Programme",
    image: "sunset",
    eyebrow: "Conference & Programme",
    sectionLabel: "Conference & Programme",
    summary: "The Green Zone and Blue Zone programmes, published closer to the conference.",
    sections: [
      {
        heading: "Programme",
        body: [
          "The COP32 programme will list every session, side event, and exhibition across both zones, searchable by day, theme, and venue.",
        ],
        list: [
          { title: "Blue Zone Programme", body: "Negotiation sessions, official side events. Coming soon." },
          { title: "Green Zone Programme", body: "Public exhibitions, talks, and cultural events. Coming soon." },
        ],
      },
    ],
  },

  visitor: {
    title: "Visitor Information",
    image: "night",
    eyebrow: "Conference & Programme",
    sectionLabel: "Conference & Programme",
    summary: "Everything you need to plan your trip to COP32 in Addis Ababa.",
    visitor: true,
    sections: [
      {
        heading: "Visitor Information",
        body: [
          "From accreditation to accommodation, transport, and visas, this section brings together everything delegates, observers, and visitors need to plan their trip to COP32 in Addis Ababa.",
          "Use the links above to jump to a specific topic — more detail will be added as the conference approaches.",
        ],
      },
    ],
  },
  "visitor/accreditation": {
    title: "Accreditation",
    image: "view",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "How delegates and observers register for Blue Zone and Green Zone access.",
    visitor: true,
    sections: [
      {
        heading: "Accreditation",
        body: [
          "Blue Zone accreditation is managed directly through the UNFCCC Secretariat and is open to registered Party delegations, UN agencies, and accredited observer organisations.",
          "Green Zone registration, coordinated by the COP32 Presidency, is open to the private sector, academia, civil society, and members of the public, with capacity-limited free and ticketed sessions.",
        ],
        list: [
          { title: "1. Register", body: "Submit your accreditation request through the official platform." },
          { title: "2. Verify", body: "Supporting documents are reviewed by the Secretariat or Presidency." },
          { title: "3. Confirm", body: "Receive confirmation and your digital badge." },
          { title: "4. Collect", body: "Pick up your physical pass on-site at the venue." },
        ],
      },
    ],
  },
  "visitor/flight-ticket": {
    title: "Flight Ticket",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Flying into Addis Ababa Bole International Airport for COP32.",
    image: "sunset",
    sections: [
      {
        heading: "Flight Ticket",
        body: [
          "Addis Ababa Bole International Airport is Ethiopian Airlines' home hub and one of Africa's busiest gateways, with direct connections to major cities across Africa, Europe, Asia, and the Americas.",
          "Delegates and attendees are encouraged to book flights early, as hosting a UN conference of this scale typically drives strong demand on routes into Addis Ababa during the conference period.",
        ],
        facts: [
          { label: "Airport", value: "Addis Ababa Bole International Airport (ADD)" },
          { label: "Hub carrier", value: "Ethiopian Airlines" },
          { label: "Distance to venue", value: "Shuttle service provided" },
          { label: "Advice", value: "Book early — high demand expected" },
        ],
      },
    ],
  },
  "visitor/transport": {
    title: "Transport & Digital Maps",
    image: "night",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Getting around Addis Ababa during COP32.",
    sections: [
      {
        heading: "Transport & Digital Maps",
        body: [
          "Addis Ababa is home to Sub-Saharan Africa's first light rail system, connecting much of the city, alongside an extensive bus network and widely available ride-hailing apps.",
          "Dedicated COP32 shuttle services will run between official hotels, the airport, and the UNCC-AA venue. Interactive digital maps covering routes, accessibility, and drop-off points will be published ahead of the conference.",
        ],
        list: [
          { title: "Addis Ababa Light Rail", body: "Sub-Saharan Africa's first light rail network." },
          { title: "COP32 shuttles", body: "Dedicated routes between hotels, airport, and venue." },
          { title: "Ride-hailing", body: "Widely available across the city." },
          { title: "Digital maps", body: "Interactive venue and city maps — coming soon." },
        ],
      },
    ],
  },
  "visitor/visa": {
    title: "Visa and Entry",
    image: "view",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Entry requirements for visitors travelling to Ethiopia for COP32.",
    sections: [
      {
        heading: "Visa and Entry",
        body: [
          "Most visitors can apply for an Ethiopian e-Visa online ahead of travel, while UNFCCC-accredited delegates typically receive streamlined entry arrangements coordinated with the host government.",
          "Applications are submitted directly through Ethiopia's official e-Visa portal. Apply as early as possible, since processing and any supporting checks take time.",
        ],
        facts: [
          { label: "Standard route", value: "Ethiopian e-Visa (apply online)" },
          { label: "Delegates", value: "Streamlined entry via host-country coordination" },
          { label: "Passport validity", value: "Recommended 6+ months beyond entry" },
          { label: "Processing", value: "Apply well ahead of travel dates" },
        ],
        cta: { label: "Apply for the Ethiopian e-Visa", href: "https://evisa.cop32ethiopia.et/" },
        qr: true,
      },
      {
        heading: "How to Apply",
        steps: [
          { title: "Create an account", body: "Register on the official Ethiopian e-Visa portal." },
          { title: "Complete the application", body: "Enter your passport and travel details online." },
          { title: "Upload your documents", body: "Submit a passport photo and your passport bio page." },
          { title: "Pay the visa fee", body: "Complete payment securely through the portal." },
          { title: "Download your e-Visa", body: "Print your approved e-Visa to present on arrival." },
        ],
      },
      {
        heading: "Entry Requirements",
        subsections: [
          { title: "Passport Validity", body: "Your passport should remain valid well beyond your planned stay." },
          { title: "Processing Time", body: "Apply ahead of travel — don't wait until the last few days." },
          { title: "Travel Insurance", body: "Travel insurance covering your trip is strongly recommended." },
          { title: "Accredited Delegates", body: "UNFCCC-accredited delegates should follow host-country coordination for entry." },
        ],
      },
      {
        heading: "Common Questions",
        faq: [
          { q: "Do I need a visa to attend COP32?", a: "Most nationalities will need an e-Visa or visa on arrival — requirements vary by passport, so check before you travel." },
          { q: "How long does processing take?", a: "E-Visa applications are typically processed within a few working days when submitted online." },
          { q: "Is there a fee?", a: "Standard e-Visa fees apply. Any conference-specific arrangements will be announced by the Presidency closer to the date." },
          { q: "What if my passport details change after I apply?", a: "Contact e-Visa support through the official portal to update your application." },
        ],
      },
    ],
    note: "Entry requirements vary by nationality — always confirm current rules with an official Ethiopian government or embassy source before travelling.",
  },
  "visitor/plan-your-travel": {
    title: "Plan Your Travel",
    image: "sunset",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Practical notes for visiting Addis Ababa.",
    sections: [
      {
        heading: "Plan Your Travel",
        body: [
          "Addis Ababa sits at roughly 2,355 metres above sea level, with a mild, spring-like climate year-round — pack layers, as evenings are noticeably cooler than the daytime.",
          "The local currency is the Ethiopian Birr (ETB). Credit card acceptance is improving but remains limited outside major hotels, so carrying some local currency is recommended.",
        ],
        facts: [
          { label: "Elevation", value: "~2,355m above sea level" },
          { label: "Climate", value: "Mild, spring-like year-round" },
          { label: "Currency", value: "Ethiopian Birr (ETB)" },
          { label: "Time zone", value: "East Africa Time (UTC+3)" },
        ],
      },
    ],
  },
  "visitor/shipping-logistics": {
    title: "Shipping & Logistics",
    image: "night",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Freight, customs, and logistics support for delegations and exhibitors.",
    sections: [
      {
        heading: "Shipping & Logistics",
        body: [
          "Delegations and Green Zone exhibitors shipping equipment, booth materials, or display items into Addis Ababa can access dedicated customs and freight support coordinated by the COP32 logistics team.",
        ],
      },
    ],
  },
  "visitor/interpretation": {
    title: "Interpretation",
    image: "view",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Language support across the Blue Zone and Green Zone.",
    sections: [
      {
        heading: "Interpretation",
        body: [
          "Simultaneous interpretation into the six official UN languages is provided throughout Blue Zone negotiations, with selected Green Zone sessions also interpreted.",
        ],
        list: [
          { title: "Arabic & Chinese", body: "Full simultaneous interpretation in Blue Zone sessions." },
          { title: "English & French", body: "Full simultaneous interpretation in Blue Zone sessions." },
          { title: "Russian & Spanish", body: "Full simultaneous interpretation in Blue Zone sessions." },
          { title: "Green Zone", body: "Selected public sessions interpreted on request." },
        ],
      },
    ],
  },
  "visitor/faq": {
    title: "Frequently Asked Questions",
    image: "sunset",
    eyebrow: "Visitor Information",
    sectionLabel: "Visitor Information",
    sectionHref: "/visitor",
    summary: "Common questions about attending COP32.",
    visitor: true,
    visitorLabel: "FAQ",
    sections: [
      {
        heading: "Frequently Asked Questions",
        body: [
          "Find quick answers to the most common questions about COP32 below. For anything not covered here, reach out through the Contact page.",
        ],
        list: [
          { title: "What is COP and why does it matter?", body: "It's the UN's annual climate summit, where nearly 200 countries negotiate the global climate response." },
          { title: "Who can attend COP32?", body: "Blue Zone access is for accredited delegations and observers; the Green Zone is open to the public." },
          { title: "What themes will be prioritized?", body: "The ten themes of the COP32 Action Agenda, from clean energy to resilient health systems." },
          { title: "Blue Zone vs Green Zone?", body: "Blue is UN-managed negotiation territory; Green is the host country's public engagement space." },
        ],
      },
    ],
  },

  "partners/sponsorship": {
    title: "Sponsorship",
    image: "night",
    eyebrow: "Partners",
    sectionLabel: "Partners",
    summary: "Sponsorship opportunities for COP32.",
    sections: [
      {
        heading: "Sponsorship",
        body: [
          "Organisations can support COP32 through a tiered sponsorship programme, with visibility across the Green Zone, digital platforms, and official conference materials.",
        ],
        sponsorCta: {
          title: "Sponsor COP32",
          subtitle: "Align your brand with climate action; apply to support COP32 Addis Ababa.",
          buttonLabel: "Become a Sponsor",
          href: "/contact",
        },
        subsections: [
          { title: "Platinum", body: "Top-tier visibility across the Green Zone and all official materials." },
          { title: "Gold", body: "Prominent Green Zone presence and digital platform visibility." },
          { title: "Silver", body: "Green Zone exhibition space and programme recognition." },
          { title: "Supporting Partner", body: "Recognition across COP32 communications." },
        ],
      },
      {
        heading: "Our Sponsors",
        body: [
          "No sponsors have been confirmed yet — the slots below show the categories open under each tier as the Presidency's sponsorship programme launches.",
        ],
        sponsorTiers: [
          {
            tier: "Platinum Partners",
            slots: [
              { category: "National Banking Partner", icon: Landmark },
              { category: "National Telecommunications Partner", icon: Radio },
            ],
          },
          {
            tier: "Gold Partners",
            slots: [
              { category: "National Airline Partner", icon: Plane },
              { category: "Energy Partner", icon: Zap },
              { category: "Insurance Partner", icon: ShieldCheck },
            ],
          },
          {
            tier: "Silver Partners",
            slots: [
              { category: "Hospitality Partner", icon: Hotel },
              { category: "Logistics Partner", icon: Truck },
            ],
          },
        ],
      },
    ],
    note: "Sponsorship packages and rate cards will be published once the Presidency opens applications.",
  },
  "partners/climate-supporters": {
    title: "Climate Supporters",
    image: "view",
    eyebrow: "Partners",
    sectionLabel: "Partners",
    summary: "Organisations backing COP32's climate goals.",
    sections: [
      {
        heading: "Climate Supporters",
        body: [
          "This page will recognise the governments, multilateral institutions, and private-sector partners supporting COP32's mission, from finance commitments to in-kind technical support.",
        ],
      },
    ],
  },
  "partners/partnerships": {
    title: "Partnerships",
    image: "sunset",
    eyebrow: "Partners",
    sectionLabel: "Partners",
    summary: "Strategic partnership opportunities with the COP32 Presidency.",
    sections: [
      {
        heading: "Partnerships",
        body: [
          "Beyond sponsorship, the Presidency is open to strategic partnerships with multilateral organisations, research institutions, and the private sector across the Action Agenda's ten themes.",
        ],
      },
    ],
  },
  "partners/startups": {
    title: "Startups",
    image: "night",
    eyebrow: "Partners",
    sectionLabel: "Partners",
    summary: "A Green Zone showcase for climate and clean-tech startups.",
    sections: [
      {
        heading: "Startups",
        body: [
          "COP32 will host a dedicated startup pavilion in the Green Zone, spotlighting African and global climate-tech ventures working across clean energy, agriculture, and the circular economy.",
        ],
      },
    ],
  },

  news: {
    title: "News",
    image: "view",
    eyebrow: "News",
    sectionLabel: "News",
    summary: "The latest announcements and updates from the COP32 Presidency.",
    sections: [
      {
        heading: "News",
        body: [
          "All official COP32 announcements, press releases, and updates will be published here as the conference approaches.",
        ],
        list: [
          { title: "Official COP32 Accommodation Platform Opens for Early Access", body: "Verified hotels across Addis Ababa are now browsable ahead of 2027." },
          { title: "COP32 Presidency Outlines Ten Implementation Themes", body: "The draft Action Agenda sets priorities for 2027." },
          { title: "Addis Ababa Begins Infrastructure Upgrades Ahead of COP32", body: "Transport, venue, and digital infrastructure projects are underway." },
        ],
      },
    ],
    note: "These are placeholder items for this concept build — real press releases will replace them once published.",
  },

  "media/accreditation": {
    title: "Media Accreditation",
    image: "sunset",
    eyebrow: "Media Hub",
    sectionLabel: "Media Hub",
    summary: "How journalists and media organisations register to cover COP32.",
    sections: [
      {
        heading: "Media Accreditation",
        body: [
          "Media accreditation for COP32 will follow the standard UNFCCC process, open to journalists from recognised media organisations, with applications typically opening a few months ahead of the conference.",
        ],
      },
    ],
  },
  "media/services": {
    title: "Media Services",
    image: "night",
    eyebrow: "Media Hub",
    sectionLabel: "Media Hub",
    summary: "Press centre facilities and broadcast support at COP32.",
    sections: [
      {
        heading: "Media Services",
        body: [
          "Accredited media will have access to a dedicated press centre in the Blue Zone, with workspaces, broadcast feeds, and interview facilities for the duration of the conference.",
        ],
      },
    ],
  },
  "media/press-releases": {
    title: "Press Releases",
    image: "view",
    eyebrow: "Media Hub",
    sectionLabel: "Media Hub",
    summary: "Official statements from the COP32 Presidency.",
    sections: [
      {
        heading: "Press Releases",
        body: [
          "Official press releases from the COP32 Presidency will be archived here, from early announcements through to daily conference updates.",
        ],
      },
    ],
  },
  "media/library": {
    title: "Media Library",
    image: "sunset",
    eyebrow: "Media Hub",
    sectionLabel: "Media Hub",
    summary: "Photos and video from COP32.",
    sections: [
      {
        heading: "Media Library",
        body: [
          "A searchable library of official COP32 photography and video will be made available here for media use, alongside footage from the host country programme.",
        ],
      },
    ],
  },
  "media/brand-assets": {
    title: "Brand Assets",
    eyebrow: "Media Hub",
    sectionLabel: "Media Hub",
    summary: "Official COP32 logos and style guidelines.",
    sections: [
      {
        heading: "Brand Assets",
        body: [
          "Official COP32 logos, colour palettes, and usage guidelines will be downloadable here for media, partners, and sponsors.",
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    eyebrow: "Contact",
    sectionLabel: "Contact",
    summary: "Get in touch with the COP32 Presidency and Secretariat.",
    sections: [
      {
        heading: "Contact",
        body: [
          "For general enquiries about COP32, reach the Presidency Secretariat using the details below. Accommodation-specific questions are handled separately by the official booking platform.",
        ],
        facts: [
          { label: "General enquiries", value: "info@cop32ethiopia.et" },
          { label: "Accommodation support", value: "booking@cop32ethiopia.et" },
          { label: "Media enquiries", value: "media@cop32ethiopia.et" },
          { label: "Address", value: "UNCC-AA, Addis Ababa, Ethiopia" },
        ],
      },
    ],
  },
};

export type DetailPageSlug = keyof typeof detailPages;
