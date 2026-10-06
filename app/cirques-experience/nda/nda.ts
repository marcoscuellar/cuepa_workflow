/* ─────────────────────────────────────────────────────────────
   The Mutual NDA being signed.

   Generated from the final PDF (public/cirques-experience/
   CUEPA-Cirques-Mutual-NDA.pdf). This is the text that ends up inside
   the signed record, so it has to match the PDF word for word. If the
   NDA changes, change both and bump VERSION.
   ───────────────────────────────────────────────────────────── */

export const VERSION = "Mutual NDA — v1 (October 5, 2026)";

export const TITLE = "Mutual Non-Disclosure and Intellectual Property Agreement";

export const PDF_URL = "/cirques-experience/CUEPA-Cirques-Mutual-NDA.pdf";

export const PARTIES: [string, string, string][] = [
  ["Legal name", "Marcos Cuellar, an individual, doing business as CUEPA", "Cirques Experience LLC"],
  ["Address", "925 W Cornelia St, Chicago, IL 60657", "5944 N Magnolia Ave, Chicago, IL 60660"],
  ["Represented by", "Marcos Cuellar, Founder", "Wolfgang Bientzle, Owner; Christian Ochsner, Chief Operating Officer"]
];

export const PREAMBLE = [
  'This Mutual Non-Disclosure and Intellectual Property Agreement (the "Agreement") is entered into as of October 5, 2026 (the "Effective Date") by and between the parties identified below.',
  'CUEPA and Cirques Experience LLC ("CirquesExperience") are each a "Party" and together the "Parties." A Party disclosing information is the "Disclosing Party"; a Party receiving it is the "Receiving Party."'
];

export type Para = {label?: string; item?: number; text: string};
export type Section = {num: string; name: string; paras: Para[]};

export const SECTIONS: Section[] = [
  {
    "num": "",
    "name": "Recitals",
    "paras": [
      {
        "text": "A. CUEPA provides workflow intelligence and operations consulting services, using proprietary methods, systems and tools it has developed."
      },
      {
        "text": "B. CirquesExperience operates a circus arts school serving students of all ages, including minors, and holds sensitive information about its students, families, staff and business."
      },
      {
        "text": "C. The Parties wish to carry out a working relationship in which each may share confidential information, and agree to protect that information and each Party's intellectual property on the terms below."
      }
    ]
  },
  {
    "num": "1",
    "name": "Purpose",
    "paras": [
      {
        "text": "The \"Purpose\" is the evaluation, design and delivery of services by CUEPA supporting CirquesExperience's internal operations, including enrollment and wait-lists, scholarships and partnerships, parent and instructor communications, scheduling, payroll, events, vendors, marketing, and website design and development. Confidential Information may be used only for the Purpose."
      }
    ]
  },
  {
    "num": "2",
    "name": "Definitions",
    "paras": [
      {
        "label": "2.1 Confidential Information.",
        "text": "All non-public information disclosed by a Party, in any form (written, oral, electronic or visual), that is marked confidential or that a reasonable person would understand to be confidential, including the terms of any proposal or agreement between the Parties."
      },
      {
        "label": "2.2 CirquesExperience Data.",
        "text": "All information about CirquesExperience's students, parents, guardians, families, instructors, staff, volunteers and partners, whether current, former or prospective (including wait-listed), and including enrollment, wait-list, scholarship, attendance, health, injury and incident, emergency contact, pickup and custody, payment, payroll and contact records, and all photos, video and voice recordings, whether provided by CirquesExperience or accessed or collected by CUEPA in performing the Purpose."
      },
      {
        "label": "2.3 CUEPA Intellectual Property.",
        "text": "All methods, frameworks, processes, workflows, systems, software, code, automations, prompts, templates, dashboards, designs, documentation, know-how, pricing and business plans owned or developed by CUEPA, including the CUEPA method (Find, Flow, Prove, Grow), the Room Map, the Room Report, the CUEPA dashboard and the CHIMAL trust framework, together with all improvements, modifications and derivatives of any of them, whether created before or during the Purpose. CUEPA Intellectual Property does not include (a) CirquesExperience Data, (b) CirquesExperience Systems, or (c) third-party tools and services that CUEPA uses but does not own."
      },
      {
        "label": "2.4 Representatives.",
        "text": "A Party's employees, contractors and professional advisors who need to know Confidential Information for the Purpose."
      },
      {
        "label": "2.5 CirquesExperience Systems.",
        "text": "Every database, spreadsheet, form, file store and software account that stores CirquesExperience Data, including any that CUEPA designs, builds or configures for CirquesExperience, together with the CirquesExperience Data inside it. The CUEPA portal software is CUEPA Intellectual Property and is not a CirquesExperience System."
      },
      {
        "label": "2.6 Minor Data.",
        "text": "All CirquesExperience Data that identifies or relates to any person under eighteen (18) years of age, including student data, in any form. Minor Data receives the highest level of protection under this Agreement."
      }
    ]
  },
  {
    "num": "3",
    "name": "Confidentiality Obligations",
    "paras": [
      {
        "text": "The Receiving Party shall:"
      },
      {
        "item": 1,
        "text": "Use Confidential Information solely for the Purpose."
      },
      {
        "item": 2,
        "text": "Disclose it only to its Representatives who are bound by written confidentiality obligations at least as protective as this Agreement. The Receiving Party is responsible for any breach by its Representatives."
      },
      {
        "item": 3,
        "text": "Protect it using at least the degree of care it uses for its own confidential information, and never less than reasonable care."
      },
      {
        "item": 4,
        "text": "Notify the Disclosing Party in writing promptly, and in any event within 72 hours, after learning of any unauthorized access, use or disclosure, and cooperate to limit the harm."
      }
    ]
  },
  {
    "num": "4",
    "name": "Protection of CirquesExperience Data",
    "paras": [
      {
        "label": "4.1 Ownership.",
        "text": "CirquesExperience Data is and remains the sole property of CirquesExperience."
      },
      {
        "label": "4.2 Limited use.",
        "text": "CUEPA shall access only the CirquesExperience Data needed for the Purpose and shall not sell, rent, publish or use it for marketing, profiling or any purpose other than the Purpose."
      },
      {
        "label": "4.3 Minors.",
        "text": "CUEPA acknowledges that CirquesExperience Data includes information about minors and shall apply heightened care to it. CUEPA shall request and use only the minimum CirquesExperience Data needed for each task and, where practical, de-identified data (such as student ID numbers, or first name and last initial). CUEPA shall not access health or medical records unless CirquesExperience approves that access in writing for a specific task. CUEPA shall not contact any student or family directly except as authorized in writing by CirquesExperience."
      },
      {
        "label": "4.4 Third-party tools.",
        "text": "CUEPA shall not enter CirquesExperience Data into any artificial intelligence system, software platform or third-party service unless CUEPA uses accounts or settings under which the provider does not train its models on CirquesExperience Data and retains it only as needed to provide the service. On request, CUEPA shall tell CirquesExperience which tools it uses for CirquesExperience Data. CirquesExperience may object to any tool by written notice (email is sufficient), after which CUEPA shall stop using that tool for CirquesExperience Data and delete that data from it."
      },
      {
        "label": "4.5 Security and law.",
        "text": "CUEPA shall maintain reasonable administrative, technical and physical safeguards for CirquesExperience Data and shall comply with all applicable privacy and data-protection laws."
      },
      {
        "label": "4.6 Ownership of databases and systems.",
        "text": "All CirquesExperience Systems belong to CirquesExperience. In particular:"
      },
      {
        "item": 1,
        "text": "Each CirquesExperience System shall be set up in CirquesExperience's name, on accounts that CirquesExperience owns and controls."
      },
      {
        "item": 2,
        "text": "CirquesExperience holds owner and administrator rights. CUEPA receives user-level or delegated access only, which CirquesExperience may change or revoke at any time."
      },
      {
        "item": 3,
        "text": "CirquesExperience may export all of its data at any time in a common, usable format (such as CSV). CUEPA shall not build any system in a way that prevents or restricts that export."
      },
      {
        "item": 4,
        "text": "CUEPA shall not store CirquesExperience Data in CUEPA's own accounts, except temporary working copies within tools that meet Section 4.4, which CUEPA shall delete when the task is complete."
      },
      {
        "item": 5,
        "text": "CirquesExperience may continue to use, operate and modify each CirquesExperience System, including its structure and configuration, for its own operations without restriction, during and after this Agreement. CUEPA keeps its general methods, templates and know-how, but no CirquesExperience Data."
      },
      {
        "item": 6,
        "text": "Upon termination, or upon CirquesExperience's written request, CUEPA shall within ten (10) business days deliver a written handover list of every CirquesExperience System, where it is located and how it is accessed; transfer any remaining access credentials; remove its own access; and delete its copies under Section 9."
      },
      {
        "label": "4.7 Student names and images.",
        "text": "CUEPA shall not use any student's name, image, likeness, voice or story in CUEPA's own marketing, portfolio, case studies, social media, or any Room Report shared outside CirquesExperience, unless CirquesExperience gives separate written approval. CUEPA may use student names and images in CirquesExperience's own materials, including its website, only after CirquesExperience confirms in writing that a valid parent or guardian release covers that use. CUEPA shall remove location data from images before publishing, shall not pair a student's image with the student's full name, and shall promptly remove any such content on CirquesExperience's request."
      },
      {
        "label": "4.8 Secure portal.",
        "text": "CUEPA may provide CirquesExperience with access to its data through a secure, access-controlled portal. All CirquesExperience Data accessed through the portal remains the property of CirquesExperience under Sections 4.1 and 4.6."
      },
      {
        "label": "4.9 Student and child privacy laws.",
        "text": "CUEPA shall handle Minor Data in compliance with, to the extent applicable, the Illinois Student Online Personal Protection Act (105 ILCS 85), the Illinois Personal Information Protection Act (815 ILCS 530), the Illinois Biometric Information Privacy Act (740 ILCS 14), the federal Children's Online Privacy Protection Act (15 U.S.C. 6501 et seq.), and any other present or future Illinois or federal law protecting the data of minors or students. In addition, whether or not any such law applies:"
      },
      {
        "item": 1,
        "text": "CUEPA shall use Minor Data only for the Purpose and never to sell, rent, advertise, profile or build any profile of a child, or for targeted advertising of any kind."
      },
      {
        "item": 2,
        "text": "CUEPA shall not collect, capture or use biometric information or identifiers of any person, including through facial recognition or face-matching tools applied to photos or video."
      },
      {
        "item": 3,
        "text": "CUEPA shall promptly delete or correct any Minor Data when CirquesExperience requests it, including at a parent's or guardian's request, and confirm in writing when done."
      },
      {
        "item": 4,
        "text": "If any breach involves Minor Data, CUEPA shall notify CirquesExperience within the period in Section 3.4 and give CirquesExperience all information it needs to notify families and authorities as required by law. CUEPA shall not contact affected families directly unless CirquesExperience directs it in writing."
      },
      {
        "item": 5,
        "text": "CUEPA shall require any Representative or approved tool that handles Minor Data to meet these same requirements."
      }
    ]
  },
  {
    "num": "5",
    "name": "Protection of CUEPA Intellectual Property",
    "paras": [
      {
        "label": "5.1 Ownership.",
        "text": "Subject to Section 4.6, CUEPA Intellectual Property is and remains the sole and exclusive property of CUEPA. Nothing in this Agreement, and no disclosure, demonstration or delivery of any CUEPA system, assigns, transfers or licenses any right in CUEPA Intellectual Property to CirquesExperience."
      },
      {
        "label": "5.2 Restrictions.",
        "text": "CirquesExperience shall not, and shall not permit any person to:"
      },
      {
        "item": 1,
        "text": "Copy, reproduce, adapt or create derivative works of CUEPA Intellectual Property;"
      },
      {
        "item": 2,
        "text": "Reverse engineer, decompile or attempt to derive the structure, logic or methods of any CUEPA system;"
      },
      {
        "item": 3,
        "text": "Disclose CUEPA Intellectual Property to any consultant, vendor, software provider or competitor of CUEPA;"
      },
      {
        "item": 4,
        "text": "Use or reference CUEPA Intellectual Property to build, or to have a third party build, any product, service or system that replicates or competes with CUEPA's services; or"
      },
      {
        "item": 5,
        "text": "Remove or alter any CUEPA ownership notice, branding or attribution."
      },
      {
        "text": "These restrictions do not limit CirquesExperience's rights in CirquesExperience Data or CirquesExperience Systems under Section 4.6."
      },
      {
        "label": "5.3 Feedback.",
        "text": "Suggestions or feedback CirquesExperience provides about CUEPA's services may be used by CUEPA freely and without obligation. Feedback does not include CirquesExperience Data."
      },
      {
        "label": "5.4 Deliverables.",
        "text": "Any rights to use specific deliverables, including ownership of any website, will be set out in a separate written services agreement. Absent such an agreement, no rights are granted, except the rights in CirquesExperience Data and CirquesExperience Systems under Section 4."
      }
    ]
  },
  {
    "num": "6",
    "name": "Exclusions",
    "paras": [
      {
        "text": "Confidential Information does not include information that the Receiving Party can demonstrate with written records:"
      },
      {
        "item": 1,
        "text": "Is or becomes publicly available through no fault of the Receiving Party;"
      },
      {
        "item": 2,
        "text": "Was lawfully known to it before disclosure, without a duty of confidentiality;"
      },
      {
        "item": 3,
        "text": "Was lawfully received from a third party free to disclose it; or"
      },
      {
        "item": 4,
        "text": "Was independently developed without use of or reference to the Confidential Information."
      },
      {
        "text": "These exclusions do not apply to CirquesExperience Data that is personal information."
      }
    ]
  },
  {
    "num": "7",
    "name": "Compelled Disclosure",
    "paras": [
      {
        "text": "If disclosure is required by law, court order or governmental authority, the Receiving Party may disclose only the portion legally required and, where legally permitted, shall give the Disclosing Party prompt prior written notice so it may seek a protective order."
      }
    ]
  },
  {
    "num": "8",
    "name": "Term and Survival",
    "paras": [
      {
        "text": "This Agreement applies to information disclosed during two (2) years from the Effective Date. Either Party may terminate it on thirty (30) days' written notice. Confidentiality obligations survive for three (3) years after termination. Obligations regarding trade secrets, personal information, CirquesExperience Data and CUEPA Intellectual Property survive for as long as that information remains protected by law."
      }
    ]
  },
  {
    "num": "9",
    "name": "Return or Destruction",
    "paras": [
      {
        "text": "Upon termination, or upon the Disclosing Party's written request, the Receiving Party shall within ten (10) business days return or securely destroy all Confidential Information, including copies, notes and extracts, and certify so in writing if requested. CUEPA shall also complete the handover described in Section 4.6. Copies held in automatic backups remain subject to this Agreement until deleted in the ordinary course."
      }
    ]
  },
  {
    "num": "10",
    "name": "No Warranty; No Obligation",
    "paras": [
      {
        "text": "All Confidential Information is provided \"as is.\" Neither Party is obligated to disclose any particular information or to enter into any further agreement."
      }
    ]
  },
  {
    "num": "11",
    "name": "Remedies",
    "paras": [
      {
        "text": "Unauthorized use or disclosure of Confidential Information, CirquesExperience Data or CUEPA Intellectual Property may cause irreparable harm for which money damages are inadequate. The injured Party may seek injunctive relief, without posting bond, in addition to all other remedies. In any action to enforce this Agreement, the prevailing Party may recover its reasonable attorneys' fees and costs."
      }
    ]
  },
  {
    "num": "12",
    "name": "General Provisions",
    "paras": [
      {
        "label": "12.1 Governing law.",
        "text": "This Agreement is governed by the laws of the State of Illinois. The Parties consent to the exclusive jurisdiction of the state and federal courts located in Cook County, Illinois."
      },
      {
        "label": "12.2 Entire agreement.",
        "text": "This Agreement is the entire agreement of the Parties on its subject and supersedes all prior understandings on that subject."
      },
      {
        "label": "12.3 Amendment and waiver.",
        "text": "Any amendment or waiver must be in writing and signed by both Parties."
      },
      {
        "label": "12.4 Assignment.",
        "text": "Neither Party may assign this Agreement without the other's prior written consent, except that Marcos Cuellar may assign this Agreement, without consent, to ELINAN Group LLC (or another entity he owns and controls) once that entity is formed, by written notice to CirquesExperience. Upon such assignment, all references to CUEPA mean that entity, which shall be bound by every obligation of CUEPA under this Agreement."
      },
      {
        "label": "12.5 Severability.",
        "text": "If any provision is held unenforceable, the remainder stays in full force."
      },
      {
        "label": "12.6 Notices.",
        "text": "Notices must be in writing and delivered to the addresses above, or by email to an address each Party designates."
      },
      {
        "label": "12.7 Counterparts.",
        "text": "This Agreement may be signed in counterparts and by electronic signature, each of which is deemed an original."
      }
    ]
  }
];

/* Plain-text version of the full agreement, for the emailed record. */
export const termsText = () => [
  TITLE,
  "",
  ...PREAMBLE,
  "",
  ...PARTIES.map(([k, a, b]) => `${k}: CUEPA — ${a} | CirquesExperience — ${b}`),
  "",
  ...SECTIONS.flatMap(s => [
    `${s.num ? s.num + " " : ""}${s.name.toUpperCase()}`,
    ...s.paras.map(p => (p.label ? `${p.label} ` : p.item ? `  ${p.item}. ` : "") + p.text),
    ""
  ])
].join("\n");
