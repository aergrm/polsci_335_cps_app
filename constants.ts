import { Week, Assignment, DemocracyDimension, Flashcard, QuizLevel, LiveQuizSession } from './types';

export const INSTRUCTOR = "Ahmet Ergurum";
export const SEMESTER = "Spring 2026";

export const SCHEDULE: Week[] = [
  { id: 1, dates: "Jan 27 & 29", title: "Introduction", topics: ["Comparative Method", "Course Overview"], readings: ["Lijphart Ch 1", "Syllabus"] },
  { id: 2, dates: "Feb 3-5", title: "Models of Democracy I", topics: ["Westminster Model", "Majoritarian Democracy", "Group 1 Presentation"], readings: ["Lijphart Ch 2"] },
  { id: 3, dates: "Feb 10-12", title: "Models of Democracy II", topics: ["Consensus Model", "Group 2 Presentation"], readings: ["Lijphart Ch 3"], due: ["Quiz 1 (Feb 10)"] },
  { id: 4, dates: "Feb 17-19", title: "Party Systems", topics: ["Two-party vs Multiparty", "Effective # of parties"], readings: ["Lijphart Ch 4-5"], due: ["Project Part 1: Proposal (Feb 17)"] },
  { id: 5, dates: "Feb 24-26", title: "Electoral Systems I", topics: ["Majoritarian vs PR", "Electoral Formulas", "Group 3 Presentation"], readings: ["Lijphart Ch 8"] },
  { id: 6, dates: "Mar 3-5", title: "Electoral Systems II", topics: ["Disproportionality", "Thresholds", "Group 4 Presentation"], readings: ["Lijphart Ch 8 (cont)", "Lijphart Ch 9"], due: ["Quiz 2 (Mar 3)"] },
  { id: 7, dates: "Mar 10-12", title: "Exec-Leg Relations I", topics: ["Cabinets", "Group 5 Presentation"], readings: ["Lijphart Ch 6-7"], due: ["In-Class Essay 1 (Mar 10)"] },
  { id: 8, dates: "Mar 17-19", title: "Exec-Leg Relations II", topics: ["Cabinet Formation", "Executive Dominance"], readings: ["Lijphart Ch 6-7 (cont)"], due: ["MIDTERM EXAM (Mar 19)"] },
  { id: 9, dates: "Mar 22-29", title: "SPRING BREAK", topics: ["NO CLASS"], readings: [] },
  { id: 10, dates: "Mar 31-Apr 2", title: "Legislative Institutions", topics: ["Bicameralism", "Interest Groups"], readings: ["Lijphart Ch 11"], due: ["Project Part 2: Annotated Bibliography (Mar 31)"] },
  { id: 11, dates: "Apr 7-9", title: "Constitutions & Courts", topics: ["Judicial Review", "Constitutional Rigidity", "Group 6 Presentation"], readings: ["Lijphart Ch 12"], due: ["Quiz 3 (Apr 7)"] },
  { 
    id: 12, 
    dates: "Apr 14-16", 
    title: "Federalism & Economic Governance", 
    topics: [
      "Federal vs. Unitary",
      "Central Bank Independence",
      "Group 7 Presentation"
    ], 
    readings: [
      "Lijphart Ch 10",
      "Lijphart Ch 13",
      "Rodden (2004)"
    ] 
  },
  { 
    id: 13, 
    dates: "Apr 21-23", 
    title: "Institutions & Foreign Policy", 
    topics: [
      "Domestic Institutions & FP",
      "Two-level games",
      "Group 8 Presentation"
    ], 
    readings: [
      "Lijphart Ch 14",
      "Putnam (1988)",
      "Bueno de Mesquita & Smith (2012)"
    ], 
    due: ["In-Class Essay 2 (Apr 21)"] 
  },
  { id: 14, dates: "Apr 28-30", title: "Democratic Performance", topics: ["Measuring Democratic Quality", "Project Presentations Begin"], readings: ["Lijphart Ch 15-16"], due: ["Project Presentations (Apr 30)"] },
  { id: 15, dates: "May 5-7", title: "Challenges to Democracy", topics: ["Backsliding", "Populism", "Course Conclusion"], readings: ["Lijphart Ch 17"], due: ["Quiz 4 (May 5)", "Presentations Conclude (May 7)"] },
  { id: 16, dates: "May 15", title: "Finals Week", topics: ["NO FINAL EXAM", "Final Paper Due"], readings: [], due: ["Project Part 3: Final Paper Due (May 15)"] }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'att', name: 'Participation & Attendance', weight: 15, category: 'Participation' },
  { id: 'pres', name: 'Country Presentation', weight: 10, category: 'Presentation' },
  { id: 'quiz', name: '4 Quizzes (5% each)', weight: 20, category: 'Quiz' },
  { id: 'essay', name: '2 In-Class Essays (10% each)', weight: 20, category: 'Essay' },
  { id: 'mid', name: 'Midterm Exam', weight: 15, category: 'Exam' },
  { id: 'proj', name: 'Country Analysis Project', weight: 20, category: 'Project' },
];

export const DEMOCRACY_DIMENSIONS: DemocracyDimension[] = [
  // Dimension I: Executives-Parties
  {
    id: 'cabinets',
    name: 'Cabinets',
    category: 'executives-parties',
    chapter: 6,
    westminster: 'Concentration of executive power in single-party majority cabinets',
    consensus: 'Executive power-sharing in broad multiparty coalitions',
    description: 'Whether the government represents a bare majority (or plurality) or seeks broad consensus through coalitions.'
  },
  {
    id: 'exec_leg',
    name: 'Executive-Legislative Relations',
    category: 'executives-parties',
    chapter: 7,
    westminster: 'Executive is dominant',
    consensus: 'Balance of power',
    description: 'The relative power of the executive versus the legislature (dominance vs. balance).'
  },
  {
    id: 'party_system',
    name: 'Party System',
    category: 'executives-parties',
    chapter: 5,
    westminster: 'Two-party system',
    consensus: 'Multiparty system',
    description: 'The effective number of political parties competing for power.'
  },
  {
    id: 'electoral',
    name: 'Electoral System',
    category: 'executives-parties',
    chapter: 8,
    westminster: 'Majoritarian and disproportional',
    consensus: 'Proportional Representation (PR)',
    description: 'How votes are translated into seats (Winner-take-all vs. Proportional).'
  },
  {
    id: 'interest_groups',
    name: 'Interest Groups',
    category: 'executives-parties',
    chapter: 9,
    westminster: 'Pluralist interest groups',
    consensus: 'Corporatist interest groups',
    description: 'Free-for-all competition vs. organized concertation (social partnership) between government, labor, and business.'
  },
  
  // Dimension II: Federal-Unitary
  {
    id: 'govt_structure',
    name: 'Federalism',
    category: 'federal-unitary',
    chapter: 10,
    westminster: 'Unitary and centralized',
    consensus: 'Federal and decentralized',
    description: 'Territorial division of power between central and regional governments.'
  },
  {
    id: 'legislature',
    name: 'Legislature',
    category: 'federal-unitary',
    chapter: 11,
    westminster: 'Concentration of legislative power in unicameral legislature',
    consensus: 'Division of power in strong bicameral legislature',
    description: 'One chamber vs. two equally strong but differently constituted chambers.'
  },
  {
    id: 'constitution',
    name: 'Constitution',
    category: 'federal-unitary',
    chapter: 12,
    westminster: 'Flexible / Unwritten',
    consensus: 'Rigid / Written',
    description: 'Ease of amending the fundamental laws of the state.'
  },
  {
    id: 'judicial',
    name: 'Judicial Review',
    category: 'federal-unitary',
    chapter: 12,
    westminster: 'Legislature has final word (No judicial review)',
    consensus: 'Laws subject to judicial review',
    description: 'Authority of supreme/constitutional courts to invalidate legislation.'
  },
  {
    id: 'central_bank',
    name: 'Central Bank',
    category: 'federal-unitary',
    chapter: 13,
    westminster: 'Dependent on Executive',
    consensus: 'Independent Central Bank',
    description: 'Autonomy of the central bank to determine monetary policy.'
  }
];

export const CONCEPT_FLASHCARDS: Flashcard[] = [
  { id: 'c1', category: 'Concept', front: 'Manufactured Majority', back: 'A parliamentary majority created by the electoral system (usually plurality) even when the party won less than 50% of the vote.' },
  { id: 'c2', category: 'Concept', front: 'Constructive Vote of No Confidence', back: 'A rule where parliament can only dismiss a cabinet if it simultaneously elects a new one (e.g., Germany, Spain).' },
  { id: 'c3', category: 'Concept', front: 'Corporatism', back: 'Interest group system with tripartite concertation between government, labor, and business to shape policy.' },
  { id: 'c4', category: 'Concept', front: 'Symmetric Bicameralism', back: 'Two legislative chambers with equal constitutional powers and democratic legitimacy.' },
  { id: 'c5', category: 'Concept', front: 'Congruent Federalism', back: 'Federal units have similar social/cultural character to the whole nation (e.g., USA, Australia).' },
  { id: 'c6', category: 'Concept', front: 'Incongruent Federalism', back: 'Federal units differ in social/cultural character (e.g., language, religion) from the whole (e.g., Belgium, Switzerland).' },
  { id: 'c7', category: 'Concept', front: 'Effective Number of Parties', back: 'A mathematical index (Laakso/Taagepera) that counts parties weighted by their relative size (seats or votes).' },
  { id: 'c8', category: 'Concept', front: 'Consociationalism', back: 'A form of power-sharing democracy for deeply divided societies, emphasizing grand coalitions and mutual vetoes.' },
  { id: 'c9', category: 'Concept', front: 'District Magnitude', back: 'The number of representatives elected from a single district. Higher magnitude = Higher proportionality.' },
  { id: 'c10', category: 'Concept', front: 'Hung Parliament', back: 'A situation in a Westminster system where no single party has an absolute majority.' },
  { id: 'c11', category: 'Concept', front: 'Executive Dominance', back: 'When the cabinet is much stronger than the legislature, typical of Westminster systems (e.g., UK).' },
  { id: 'c12', category: 'Concept', front: 'Magic Formula', back: 'The 2:2:2:1 party distribution in the Swiss Federal Council used from 1959 to 2003.' },
  { id: 'c13', category: 'Concept', front: 'Plural Society', back: 'A society divided by segmental cleavages (religious, ideological, linguistic, cultural) with distinct subsocieties.' },
  { id: 'c14', category: 'Concept', front: 'Gallagher Index', back: 'A measure of the disproportionality between votes received and seats allocated in an election.' },
  { id: 'c15', category: 'Concept', front: 'Parliamentary Sovereignty', back: 'The doctrine that the legislature (Parliament) has absolute supremacy and is not subject to judicial review (UK).' },
  { id: 'c16', category: 'Concept', front: 'Grand Coalition', back: 'A governing coalition that includes the major parties, often used in times of crisis or in consociational democracies.' },
];

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    level: 1,
    title: "Novice: Model Identification",
    description: "Identify whether a trait belongs to the Westminster or Consensus model.",
    minScoreToUnlock: 70,
    questions: [
      {
        id: 'q1-1',
        question: "Which model features a 'Two-party system'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Westminster Model",
        explanation: "The Westminster model creates a competitive two-party system versus the multiparty system of Consensus democracy."
      },
      {
        id: 'q1-2',
        question: "Which model features 'Proportional Representation'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Consensus democracy uses PR to ensure fair representation of minorities."
      },
      {
        id: 'q1-3',
        question: "Which model features a 'Unicameral Legislature'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Westminster Model",
        explanation: "Concentration of power in a single chamber is a hallmark of the Majoritarian/Westminster model."
      },
      {
        id: 'q1-4',
        question: "Which model features 'Federalism and Decentralization'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Divided power through federalism is a key trait of the Consensus model."
      },
      {
        id: 'q1-5',
        question: "Which model features 'Constitutional Rigidity'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Consensus models protect minority rights through rigid constitutions that are hard to amend."
      },
      {
        id: 'q1-6',
        question: "Which model is associated with 'Interest Group Pluralism'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Westminster Model",
        explanation: "The Westminster model features 'Pluralism' (free-for-all competition) rather than the 'Corporatism' (organized social partnership) of the Consensus model."
      }
    ]
  },
  {
    level: 2,
    title: "Scholar: Concepts & Definitions",
    description: "Match specific political science terms to their definitions.",
    minScoreToUnlock: 70,
    questions: [
      {
        id: 'q2-1',
        question: "What is a 'Manufactured Majority'?",
        options: [
          "A coalition government formed by multiple parties.",
          "A parliamentary majority won with less than 50% of the popular vote.",
          "A majority created by banning opposition parties.",
          "A majority achieved through fraud."
        ],
        correctAnswer: "A parliamentary majority won with less than 50% of the popular vote.",
        explanation: "Common in Westminster systems (e.g., UK), where plurality rules award a seat majority to a party with only a plurality of votes."
      },
      {
        id: 'q2-2',
        question: "Which country is the best example of 'Incongruent Federalism'?",
        options: ["USA", "Australia", "Belgium", "Germany"],
        correctAnswer: "Belgium",
        explanation: "Incongruent federalism creates units with distinct social/cultural characters (e.g., language in Belgium) unlike the congruent units of the US/Australia."
      },
      {
        id: 'q2-3',
        question: "Corporatism involves cooperation between which groups?",
        options: [
          "Government, Military, and Church",
          "Government, Labor Unions, and Business Associations",
          "Executive, Legislature, and Judiciary",
          "Federal, State, and Local Governments"
        ],
        correctAnswer: "Government, Labor Unions, and Business Associations",
        explanation: "Democratic corporatism is the tripartite concertation of social partners to shape economic policy."
      },
      {
        id: 'q2-4',
        question: "What does 'District Magnitude' refer to?",
        options: [
          "The geographic size of a district in square miles.",
          "The number of voters in a district.",
          "The number of seats elected from a district.",
          "The amount of money spent in a district election."
        ],
        correctAnswer: "The number of seats elected from a district.",
        explanation: "District magnitude (M) is the crucial variable: higher M leads to higher proportionality."
      }
    ]
  },
  {
    level: 3,
    title: "Expert: Country Application",
    description: "Apply the framework to specific country cases and history.",
    minScoreToUnlock: 0, // Final level
    questions: [
      {
        id: 'q3-1',
        question: "New Zealand shifted from a pure Westminster model to a more Consensus model in the 1990s by changing which variable?",
        options: [
          "Adopting Federalism",
          "Switching to Proportional Representation (MMP)",
          "Abolishing the Monarchy",
          "Creating a Constitutional Court"
        ],
        correctAnswer: "Switching to Proportional Representation (MMP)",
        explanation: "The 1996 switch to MMP ended single-party dominance and ushered in multiparty coalitions."
      },
      {
        id: 'q3-2',
        question: "Switzerland is the prototype of Consensus democracy, but it has one Majoritarian trait. What is it?",
        options: [
          "Unwritten Constitution",
          "Lack of Judicial Review",
          "Two-Party System",
          "Unitary Government"
        ],
        correctAnswer: "Lack of Judicial Review",
        explanation: "While highly consensual, the Swiss Supreme Court traditionally cannot strike down federal laws."
      },
      {
        id: 'q3-3',
        question: "Which country represents the 'Consensus' model on the Executives-Parties dimension but 'Majoritarian' on Federal-Unitary?",
        options: ["USA", "Israel", "Canada", "Germany"],
        correctAnswer: "Israel",
        explanation: "Israel has extreme multipartyism (Consensus) but is a unitary state with no written constitution (Majoritarian)."
      },
      {
        id: 'q3-4',
        question: "In the UK, the House of Lords has only delaying power. This is an example of:",
        options: [
          "Symmetric Bicameralism",
          "Asymmetric Bicameralism",
          "Perfect Unicameralism",
          "Federalism"
        ],
        correctAnswer: "Asymmetric Bicameralism",
        explanation: "Power is concentrated in the House of Commons, making the bicameralism unequal (asymmetric)."
      }
    ]
  }
];

export const LIVE_QUIZZES: LiveQuizSession[] = [
  {
    weekId: 1,
    title: "Week 1: Introduction",
    isLocked: false,
    questions: [
      {
        id: 'lq1-1',
        text: "What is the 'Fundamental Problem' of Comparative Politics?",
        timeLimit: 20,
        explanation: "Comparative politics struggles with having a small number of countries (N) but a huge number of potential variables (culture, history, economy) that explain differences.",
        options: [
          { id: '1a', text: "Too many countries", color: 'red', isCorrect: false },
          { id: '1b', text: "Many variables, Small N", color: 'blue', isCorrect: true },
          { id: '1c', text: "Fake News", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Lack of Theory", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-2',
        text: "Who is the author of our main textbook?",
        timeLimit: 20,
        explanation: "Lijphart, duh?",
        options: [
          { id: '2a', text: "Karl Marx", color: 'red', isCorrect: false },
          { id: '2b', text: "Arend Lijphart", color: 'blue', isCorrect: true },
          { id: '2c', text: "Emmanuel Macron", color: 'yellow', isCorrect: false },
          { id: '2d', text: "Ahmet Ergurum", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-3',
        text: "Which two dimensions does Lijphart use to classify democracies?",
        timeLimit: 20,
        explanation: "Lijphart argues that democratic institutions cluster into two dimensions: Executives-Parties (Joint Power) and Federal-Unitary (Divided Power).",
        options: [
          { id: '3a', text: "Executives-Parties & Federal-Unitary", color: 'red', isCorrect: true },
          { id: '3b', text: "Good & Bad", color: 'blue', isCorrect: false },
          { id: '3c', text: "East & West", color: 'yellow', isCorrect: false },
          { id: '3d', text: "Rich & Poor", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-4',
        text: "Which statement is 'Normative'?",
        timeLimit: 20,
        explanation: "Normative statements make value judgments ('better', 'worse', 'should') about what ought to be. Empirical statements describe facts that can be tested.",
        options: [
          { id: '4a', text: "Democracies are better than dictatorships.", color: 'red', isCorrect: true },
          { id: '4b', text: "Democracies have higher GDP per capita.", color: 'blue', isCorrect: false },
          { id: '4c', text: "Dictatorships have fewer parties.", color: 'yellow', isCorrect: false },
          { id: '4d', text: "Voter turnout is 60%.", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-5',
        text: "MSSD (Most Similar Systems Design) is also known as...",
        timeLimit: 20,
        explanation: "MSSD compares countries that are very similar (controlling for variables) but differ in one key outcome, isolating the cause. This is Mill's Method of Difference.",
        options: [
          { id: '5a', text: "Method of Difference", color: 'red', isCorrect: true },
          { id: '5b', text: "Method of Agreement", color: 'blue', isCorrect: false },
          { id: '5c', text: "Statistical Method", color: 'yellow', isCorrect: false },
          { id: '5d', text: "Case Study", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-6',
        text: "Which reasoning moves from Specific Observations to General Theory?",
        timeLimit: 20,
        explanation: "Inductive reasoning starts with specific observations/data and builds toward a general theory. Deductive starts with theory/hypothesis and tests it with data.",
        options: [
          { id: '6a', text: "Deductive", color: 'red', isCorrect: false },
          { id: '6b', text: "Inductive", color: 'blue', isCorrect: true },
          { id: '6c', text: "Reductive", color: 'yellow', isCorrect: false },
          { id: '6d', text: "Productive", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-7',
        text: "In the hypothesis 'Economic Development leads to Democracy', what is 'Democracy'?",
        timeLimit: 20,
        explanation: "The Dependent Variable (Y) is the effect or outcome we are trying to explain. The Independent Variable (X) is the cause (Development).",
        options: [
          { id: '7a', text: "Independent Variable (X)", color: 'red', isCorrect: false },
          { id: '7b', text: "Dependent Variable (Y)", color: 'blue', isCorrect: true },
          { id: '7c', text: "Control Variable (Z)", color: 'yellow', isCorrect: false },
          { id: '7d', text: "Spurious Variable", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-8',
        text: "Case Studies (N=1) are strong in ____ but weak in ____.",
        timeLimit: 20,
        explanation: "Case studies provide deep contextual detail (internal validity) but cannot easily be generalized to the whole world (external validity).",
        options: [
          { id: '8a', text: "Breadth; Depth", color: 'red', isCorrect: false },
          { id: '8b', text: "Math; English", color: 'blue', isCorrect: false },
          { id: '8c', text: "Depth; Generalization", color: 'yellow', isCorrect: true },
          { id: '8d', text: "Theory; Data", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 2,
    title: "Week 2: Westminster Model",
    isLocked: false,
    questions: [
      {
        id: 'lq1',
        text: "Which of these is NOT a characteristic of the Westminster Model?",
        timeLimit: 20,
        explanation: "The Westminster model is characterized by single-party majority cabinets and executive dominance. Multiparty coalitions are a hallmark of the Consensus model.",
        options: [
          { id: '1a', text: "Executive Dominance", color: 'red', isCorrect: false },
          { id: '1b', text: "Multiparty Coalitions", color: 'blue', isCorrect: true },
          { id: '1c', text: "Unitary Government", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Plurality Elections", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2',
        text: "What does 'Fusion of Power' mean in the UK context?",
        timeLimit: 20,
        explanation: "In parliamentary systems like the UK, the Executive (PM and Cabinet) is drawn directly from and is responsible to the Legislature, 'fusing' the branches rather than separating them.",
        options: [
          { id: '2a', text: "PM is part of Legislature", color: 'red', isCorrect: true },
          { id: '2b', text: "Separation of Church & State", color: 'blue', isCorrect: false },
          { id: '2c', text: "Nuclear Energy", color: 'yellow', isCorrect: false },
          { id: '2d', text: "Local & Central Gov Work Together", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq3',
        text: "Which electoral system tends to manufacture majorities?",
        timeLimit: 20,
        explanation: "First-Past-The-Post (Plurality) rules often give a party with less than 50% of the vote a majority of the seats, 'manufacturing' a governing majority.",
        options: [
          { id: '3a', text: "PR-STV", color: 'red', isCorrect: false },
          { id: '3b', text: "MMP", color: 'blue', isCorrect: false },
          { id: '3c', text: "First-Past-The-Post", color: 'yellow', isCorrect: true },
          { id: '3d', text: "List PR", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-4',
        text: "The Westminster Model is based on the principle of...",
        timeLimit: 20,
        explanation: "The Westminster (Majoritarian) model concentrates power in the hands of the majority to ensure effective governance.",
        options: [
          { id: '9a', text: "Majority Rule", color: 'red', isCorrect: true },
          { id: '9b', text: "Proportionality", color: 'blue', isCorrect: false },
          { id: '9c', text: "Minority Veto", color: 'yellow', isCorrect: false },
          { id: '9d', text: "Divided Power", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-5',
        text: "Which dimension is characterized by 'Joint Power'?",
        timeLimit: 20,
        explanation: "The Executives-Parties dimension concentrates power within the central government (Joint Power), while the Federal-Unitary dimension divides power (Divided Power).",
        options: [
          { id: '10a', text: "Federal-Unitary", color: 'red', isCorrect: false },
          { id: '10b', text: "Executives-Parties", color: 'blue', isCorrect: true },
          { id: '10c', text: "Left-Right", color: 'yellow', isCorrect: false },
          { id: '10d', text: "Global-Local", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-6',
        text: "The Consensus Model is recommended for...",
        timeLimit: 20,
        explanation: "Lijphart argues Consensus democracy is superior for 'plural societies' with deep religious, cultural, or linguistic divisions.",
        options: [
          { id: '11a', text: "Homogeneous Societies", color: 'red', isCorrect: false },
          { id: '11b', text: "Plural / Divided Societies", color: 'blue', isCorrect: true },
          { id: '11c', text: "Small Islands", color: 'yellow', isCorrect: false },
          { id: '11d', text: "Military Dictatorships", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-8',
        text: "In Ch 2, Lijphart identifies this country as a 'purer' example of the Westminster Model than the UK (pre-1996).",
        timeLimit: 20,
        explanation: "Before its 1996 switch to MMP, New Zealand was an even clearer example of Westminster majoritarianism (unicameral, unitary, unwritten constitution) than the UK itself.",
        options: [
          { id: '8a', text: "New Zealand", color: 'red', isCorrect: true },
          { id: '8b', text: "Canada", color: 'blue', isCorrect: false },
          { id: '8c', text: "Barbados", color: 'yellow', isCorrect: false },
          { id: '8d', text: "Australia", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-9',
        text: "Because the House of Lords has very little power compared to the House of Commons, the UK's legislature is...",
        timeLimit: 20,
        explanation: "Asymmetric bicameralism means the two chambers have unequal power. The Commons is supreme; the Lords can only delay legislation.",
        options: [
          { id: '9a', text: "Symmetric Bicameral", color: 'red', isCorrect: false },
          { id: '9b', text: "Asymmetric Bicameral", color: 'blue', isCorrect: true },
          { id: '9c', text: "Perfectly Unicameral", color: 'yellow', isCorrect: false },
          { id: '9d', text: "Federal", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2-10',
        text: "Why is the British Constitution described as 'Flexible'?",
        timeLimit: 20,
        explanation: "Because it is unwritten/uncodified, Parliament can change fundamental laws (constitutional matters) with a simple majority vote, just like regular laws.",
        options: [
          { id: '10a', text: "It bends physically", color: 'red', isCorrect: false },
          { id: '10b', text: "It is hard to change", color: 'blue', isCorrect: false },
          { id: '10c', text: "Requires 2/3 majority to change", color: 'yellow', isCorrect: false },
          { id: '10d', text: "Changed by simple majority", color: 'green', isCorrect: true }
        ]
      }
    ]
  },
  {
    weekId: 3,
    title: "Week 3: Consensus Model",
    isLocked: false,
    questions: [
      {
        id: 'lq4',
        text: "The Consensus Model aims to...",
        timeLimit: 20,
        explanation: "The Consensus model is designed to include as many groups as possible in decision-making, rather than letting a bare majority rule.",
        options: [
          { id: '4a', text: "Maximize Efficiency", color: 'red', isCorrect: false },
          { id: '4b', text: "Concentrate Power", color: 'blue', isCorrect: false },
          { id: '4c', text: "Share Power / Include Minorities", color: 'yellow', isCorrect: true },
          { id: '4d', text: "Speed up decision making", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5',
        text: "Which country is Lijphart's primary example of Consensus Democracy?",
        timeLimit: 20,
        explanation: "Switzerland is the archetypal consensus democracy with its grand coalition executive (Federal Council), multiparty system, and strong federalism.",
        options: [
          { id: '5a', text: "United Kingdom", color: 'red', isCorrect: false },
          { id: '5b', text: "USA", color: 'blue', isCorrect: false },
          { id: '5c', text: "Switzerland", color: 'yellow', isCorrect: true },
          { id: '5d', text: "New Zealand", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 4,
    title: "Week 4: Party Systems",
    isLocked: false,
    questions: [
      {
        id: 'lq4-1',
        text: "What does the 'Effective Number of Parties' (N) measure?",
        timeLimit: 20,
        explanation: "Unlike the raw number of parties, the Effective Number (Laakso/Taagepera index) weights parties by their size (votes or seats) to show how many 'count'.",
        options: [
          { id: '1a', text: "Total number of registered parties", color: 'red', isCorrect: false },
          { id: '1b', text: "Parties weighted by their size", color: 'blue', isCorrect: true },
          { id: '1c', text: "Only parties in government", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Number of extremist parties", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq4-2',
        text: "Which of these is NOT one of Lipset & Rokkan's 4 classic social cleavages?",
        timeLimit: 20,
        explanation: "The four frozen cleavages are: Center-Periphery, State-Church, Land-Industry (Rural-Urban), and Owner-Worker (Class). 'Internet-Offline' is not one.",
        options: [
          { id: '2a', text: "Owner - Worker (Class)", color: 'red', isCorrect: false },
          { id: '2b', text: "State - Church", color: 'blue', isCorrect: false },
          { id: '2c', text: "Internet - Offline", color: 'yellow', isCorrect: true },
          { id: '2d', text: "Center - Periphery", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq4-3',
        text: "According to Duverger's Law, Plurality (First-Past-The-Post) elections tend to produce...",
        timeLimit: 20,
        explanation: "Duverger's Law states that plurality rule tends to produce a two-party system due to the mechanical and psychological effects of the electoral system.",
        options: [
          { id: '3a', text: "Multiparty Systems", color: 'red', isCorrect: false },
          { id: '3b', text: "Two-Party Systems", color: 'blue', isCorrect: true },
          { id: '3c', text: "Dictatorships", color: 'yellow', isCorrect: false },
          { id: '3d', text: "Unstable Governments", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq4-4',
        text: "Which new issue dimension arose in the late 20th century, often associated with Green parties?",
        timeLimit: 20,
        explanation: "This dimension (Inglehart) pits economic growth against environmental protection and lifestyle freedom.",
        options: [
          { id: '4a', text: "Church vs State", color: 'red', isCorrect: false },
          { id: '4b', text: "Materialist vs Post-Materialist", color: 'blue', isCorrect: true },
          { id: '4c', text: "Center vs Periphery", color: 'yellow', isCorrect: false },
          { id: '4d', text: "Owners vs Workers", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq4-5',
        text: "What is a 'Hung Parliament'?",
        timeLimit: 20,
        explanation: "A Hung Parliament occurs in a majoritarian system when no single party wins >50% of the seats, forcing a coalition or minority government.",
        options: [
          { id: '5a', text: "Parliament is suspended", color: 'red', isCorrect: false },
          { id: '5b', text: "No party has a majority of seats", color: 'blue', isCorrect: true },
          { id: '5c', text: "The King dissolves parliament", color: 'yellow', isCorrect: false },
          { id: '5d', text: "Voter turnout is too low", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 5,
    title: "Week 5: Electoral Systems I",
    isLocked: false,
    questions: [
      {
        id: 'lq5-1',
        text: "What is 'District Magnitude' (M)?",
        timeLimit: 20,
        explanation: "District Magnitude is the number of representatives elected from a single district. It is the most critical factor in determining proportionality.",
        options: [
          { id: '1a', text: "The physical size of a district", color: 'red', isCorrect: false },
          { id: '1b', text: "The number of voters in a district", color: 'blue', isCorrect: false },
          { id: '1c', text: "The number of seats per district", color: 'yellow', isCorrect: true },
          { id: '1d', text: "The campaign spending limit", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5-2',
        text: "Which electoral system is most associated with the Westminster Model?",
        timeLimit: 20,
        explanation: "The Westminster model typically uses Plurality (First-Past-The-Post) in single-member districts to manufacture single-party majorities.",
        options: [
          { id: '2a', text: "Proportional Representation (PR)", color: 'red', isCorrect: false },
          { id: '2b', text: "Plurality / First-Past-The-Post", color: 'blue', isCorrect: true },
          { id: '2c', text: "Single Transferable Vote", color: 'yellow', isCorrect: false },
          { id: '2d', text: "Mixed Member Proportional", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5-3',
        text: "What is the primary goal of Proportional Representation (PR)?",
        timeLimit: 20,
        explanation: "PR aims to translate votes into seats as accurately as possible, so that 20% of the votes equals roughly 20% of the seats.",
        options: [
          { id: '3a', text: "To create a strong one-party government", color: 'red', isCorrect: false },
          { id: '3b', text: "To mirror vote shares in seat shares", color: 'blue', isCorrect: true },
          { id: '3c', text: "To exclude extremist parties", color: 'yellow', isCorrect: false },
          { id: '3d', text: "To ensure local representation", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5-4',
        text: "In a Single-Member District (M=1), how many votes do you need to win?",
        timeLimit: 20,
        explanation: "In a plurality system (Winner-Take-All), you only need a plurality—one more vote than the second-place candidate—not necessarily a majority (>50%).",
        options: [
          { id: '4a', text: "A majority (>50%)", color: 'red', isCorrect: false },
          { id: '4b', text: "Two-thirds (66%)", color: 'blue', isCorrect: false },
          { id: '4c', text: "A plurality (more than anyone else)", color: 'yellow', isCorrect: true },
          { id: '4d', text: "Unanimous consent", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5-5',
        text: "Which of these is a formula used to calculate seat distribution in PR systems?",
        timeLimit: 20,
        explanation: "The D'Hondt method is a divisor formula used in many PR countries (e.g., Spain, Belgium) to allocate seats.",
        options: [
          { id: '5a', text: "Duverger's Law", color: 'red', isCorrect: false },
          { id: '5b', text: "D'Hondt Method", color: 'blue', isCorrect: true },
          { id: '5c', text: "Median Voter Theorem", color: 'yellow', isCorrect: false },
          { id: '5d', text: "Pareto Optimality", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 6,
    title: "Week 6: Electoral Systems II",
    isLocked: false,
    questions: [
      {
        id: 'lq6-1',
        text: "Which index is commonly used to measure the disproportionality of an electoral system?",
        timeLimit: 20,
        explanation: "The Gallagher Index (Least Squares Index) measures the difference between vote percentages and seat percentages. Lower scores mean higher proportionality.",
        options: [
          { id: '1a', text: "Gini Coefficient", color: 'red', isCorrect: false },
          { id: '1b', text: "Gallagher Index", color: 'blue', isCorrect: true },
          { id: '1c', text: "Human Development Index", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Corruption Perceptions Index", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-2',
        text: "What is an 'Electoral Threshold'?",
        timeLimit: 20,
        explanation: "An electoral threshold is the minimum share of the vote (e.g., 5% in Germany) a party must secure to be eligible for any seats in parliament.",
        options: [
          { id: '2a', text: "The minimum age to vote", color: 'red', isCorrect: false },
          { id: '2b', text: "The minimum percentage of votes to win seats", color: 'blue', isCorrect: true },
          { id: '2c', text: "The maximum number of terms a PM can serve", color: 'yellow', isCorrect: false },
          { id: '2d', text: "The number of signatures needed to run", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-3',
        text: "In a Mixed Member Proportional (MMP) system (like Germany), how many votes does a voter typically cast?",
        timeLimit: 20,
        explanation: "Voters cast two votes: one for a local district candidate (plurality) and one for a party list (PR). The party vote determines the overall seat distribution.",
        options: [
          { id: '3a', text: "One", color: 'red', isCorrect: false },
          { id: '3b', text: "Two (Candidate & Party)", color: 'blue', isCorrect: true },
          { id: '3c', text: "Three", color: 'yellow', isCorrect: false },
          { id: '3d', text: "Ranked preferences", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-4',
        text: "What is 'Malapportionment'?",
        timeLimit: 20,
        explanation: "Malapportionment occurs when districts vary greatly in population size, meaning votes in smaller districts count more (e.g., US Senate, rural bias).",
        options: [
          { id: '4a', text: "When districts have unequal numbers of voters", color: 'red', isCorrect: true },
          { id: '4b', text: "When votes are counted incorrectly", color: 'blue', isCorrect: false },
          { id: '4c', text: "When parties are banned", color: 'yellow', isCorrect: false },
          { id: '4d', text: "When the executive dissolves parliament", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-5',
        text: "Which system allows voters to rank candidates in order of preference in multi-member districts?",
        timeLimit: 20,
        explanation: "Single Transferable Vote (STV) allows voters to rank candidates (1, 2, 3...). Surplus votes from winners and votes from eliminated losers are transferred.",
        options: [
          { id: '5a', text: "First-Past-The-Post", color: 'red', isCorrect: false },
          { id: '5b', text: "Single Transferable Vote (STV)", color: 'blue', isCorrect: true },
          { id: '5c', text: "Closed List PR", color: 'yellow', isCorrect: false },
          { id: '5d', text: "Two-Round System", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-6',
        text: "What is the key difference between Pluralism and Corporatism?",
        timeLimit: 20,
        explanation: "Pluralism is characterized by free-for-all competition among many uncoordinated groups, while Corporatism involves organized, concerted cooperation between peak associations.",
        options: [
          { id: '6a', text: "Pluralism has fewer groups", color: 'red', isCorrect: false },
          { id: '6b', text: "Corporatism bans interest groups", color: 'blue', isCorrect: false },
          { id: '6c', text: "Pluralism is competitive; Corporatism is coordinated", color: 'yellow', isCorrect: true },
          { id: '6d', text: "Corporatism is only found in dictatorships", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-7',
        text: "Which three actors are typically involved in 'Tripartite Concertation'?",
        timeLimit: 20,
        explanation: "Democratic corporatism relies on the social partnership between the Government, Labor Unions, and Business/Employer Associations.",
        options: [
          { id: '7a', text: "Executive, Legislature, Judiciary", color: 'red', isCorrect: false },
          { id: '7b', text: "Government, Labor, Business", color: 'blue', isCorrect: true },
          { id: '7c', text: "Church, State, Military", color: 'yellow', isCorrect: false },
          { id: '7d', text: "Farmers, Students, Pensioners", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq6-8',
        text: "According to Lijphart, Interest Group Corporatism is associated with which model of democracy?",
        timeLimit: 20,
        explanation: "Corporatism is a trait of the Consensus model, as it seeks to include major economic interests in decision-making, unlike the competitive Pluralism of the Westminster model.",
        options: [
          { id: '8a', text: "Westminster Model", color: 'red', isCorrect: false },
          { id: '8b', text: "Consensus Model", color: 'blue', isCorrect: true },
          { id: '8c', text: "Presidential Model", color: 'yellow', isCorrect: false },
          { id: '8d', text: "Authoritarian Model", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 7,
    title: "Week 7: Exec-Leg Relations I",
    isLocked: false,
    questions: [
      {
        id: 'lq7-1',
        text: "What defines a 'Minimal Winning Coalition'?",
        timeLimit: 20,
        explanation: "A minimal winning coalition contains just enough parties to secure a parliamentary majority (>50%). If any one party leaves, the coalition loses its majority.",
        options: [
          { id: '1a', text: "A coalition of all major parties", color: 'red', isCorrect: false },
          { id: '1b', text: "A coalition with just enough seats to govern (>50%)", color: 'blue', isCorrect: true },
          { id: '1c', text: "A government formed by a single minority party", color: 'yellow', isCorrect: false },
          { id: '1d', text: "A coalition that lost the popular vote", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-2',
        text: "Why might parties form an 'Oversized' (Surplus Majority) Cabinet?",
        timeLimit: 20,
        explanation: "Oversized cabinets include more parties than strictly necessary. They are often formed to amend the constitution (which may require a 2/3 supermajority) or to ensure national unity during a crisis.",
        options: [
          { id: '2a', text: "To save money on elections", color: 'red', isCorrect: false },
          { id: '2b', text: "To pass constitutional amendments or handle crises", color: 'blue', isCorrect: true },
          { id: '2c', text: "Because the constitution requires it", color: 'yellow', isCorrect: false },
          { id: '2d', text: "To prevent the opposition from speaking", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-3',
        text: "Which of the following is a defining characteristic of a Parliamentary system?",
        timeLimit: 20,
        explanation: "In parliamentary systems, the executive (Prime Minister and Cabinet) is dependent on the confidence of the legislature and can be dismissed via a vote of no confidence.",
        options: [
          { id: '3a', text: "The head of government is directly elected", color: 'red', isCorrect: false },
          { id: '3b', text: "The executive is dependent on the legislature's confidence", color: 'blue', isCorrect: true },
          { id: '3c', text: "The president serves a fixed term", color: 'yellow', isCorrect: false },
          { id: '3d', text: "Strict separation of powers", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-4',
        text: "In a Presidential system, the relationship between the executive and legislature is based on:",
        timeLimit: 20,
        explanation: "Presidential systems are characterized by a separation of powers, where both the president and the legislature are independently elected for fixed terms and cannot easily dismiss each other.",
        options: [
          { id: '4a', text: "Fusion of power", color: 'red', isCorrect: false },
          { id: '4b', text: "Separation of powers", color: 'blue', isCorrect: true },
          { id: '4c', text: "Executive dominance", color: 'yellow', isCorrect: false },
          { id: '4d', text: "Legislative supremacy", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-5',
        text: "According to Lijphart, which system tends to produce the highest degree of executive dominance?",
        timeLimit: 20,
        explanation: "Single-party majority parliamentary systems (like the UK Westminster model) produce the highest executive dominance because the cabinet controls a disciplined majority in the legislature.",
        options: [
          { id: '5a', text: "Presidential systems", color: 'red', isCorrect: false },
          { id: '5b', text: "Single-party majority parliamentary systems", color: 'blue', isCorrect: true },
          { id: '5c', text: "Multiparty parliamentary systems", color: 'yellow', isCorrect: false },
          { id: '5d', text: "The Swiss directorial system", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-6',
        text: "What is a 'Constructive Vote of No Confidence'?",
        timeLimit: 20,
        explanation: "Used in countries like Germany, it requires the legislature to simultaneously agree on a replacement head of government when voting to dismiss the current one, ensuring stability.",
        options: [
          { id: '6a', text: "A vote that automatically triggers new elections", color: 'red', isCorrect: false },
          { id: '6b', text: "A vote requiring a 2/3 supermajority to dismiss the PM", color: 'blue', isCorrect: false },
          { id: '6c', text: "A vote where parliament must agree on a successor to dismiss the PM", color: 'yellow', isCorrect: true },
          { id: '6d', text: "A vote initiated by the President to dissolve parliament", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-7',
        text: "What characterizes a 'Minority Government'?",
        timeLimit: 20,
        explanation: "A minority government is formed by a party or coalition that does not control a majority of seats (>50%) in the legislature, relying on ad hoc support from other parties to pass laws.",
        options: [
          { id: '7a', text: "A government representing ethnic minorities", color: 'red', isCorrect: false },
          { id: '7b', text: "A cabinet that does not control a majority of legislative seats", color: 'blue', isCorrect: true },
          { id: '7c', text: "A government formed after losing an election", color: 'yellow', isCorrect: false },
          { id: '7d', text: "A cabinet with fewer ministers than usual", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-8',
        text: "What is a 'Minimal Connected Winning Coalition'?",
        timeLimit: 20,
        explanation: "This theory suggests that coalitions will form among parties that are adjacent to each other on the ideological spectrum, minimizing policy compromises.",
        options: [
          { id: '8a', text: "A coalition of parties that share a border region", color: 'red', isCorrect: false },
          { id: '8b', text: "A coalition of ideologically adjacent parties with no unnecessary members", color: 'blue', isCorrect: true },
          { id: '8c', text: "A coalition formed via social media connections", color: 'yellow', isCorrect: false },
          { id: '8d', text: "A coalition that includes the median voter", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-9',
        text: "In a Semi-Presidential system, what is 'Cohabitation'?",
        timeLimit: 20,
        explanation: "Cohabitation occurs when the directly elected President and the Prime Minister (who relies on legislative confidence) belong to opposing political parties.",
        options: [
          { id: '9a', text: "When the President and PM belong to opposing parties", color: 'red', isCorrect: true },
          { id: '9b', text: "When the executive and legislature share the same building", color: 'blue', isCorrect: false },
          { id: '9c', text: "When two parties merge into one", color: 'yellow', isCorrect: false },
          { id: '9d', text: "When the cabinet includes non-politician experts", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq7-10',
        text: "According to Lijphart's analysis, which type of cabinet tends to be the most durable (lasts the longest)?",
        timeLimit: 20,
        explanation: "Single-party majority cabinets are generally the most durable because they do not suffer from the internal disagreements that can break apart coalition governments.",
        options: [
          { id: '10a', text: "Minority coalitions", color: 'red', isCorrect: false },
          { id: '10b', text: "Oversized coalitions", color: 'blue', isCorrect: false },
          { id: '10c', text: "Single-party majority cabinets", color: 'yellow', isCorrect: true },
          { id: '10d', text: "Minimal winning coalitions", color: 'green', isCorrect: false }
        ]
      }
    ]
  }
];

export const APPROVED_COUNTRIES = [
  "United Kingdom",
  "New Zealand",
  "Australia",
  "Switzerland",
  "Belgium",
  "Netherlands",
  "Spain",
  "Sweden",
  "Germany",
  "Ireland",
  "Japan",
  "France",
  "Finland",
  "Austria",
  "Canada",
  "India",
  "Brazil"
];
