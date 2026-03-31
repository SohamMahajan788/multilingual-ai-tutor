export type Subject = {
    id: string;
    name: string;
    emoji: string;
    color: string;
    classes: number[];
    topics: Topic[];
  };
  
  export type Topic = {
    id: string;
    name: string;
    description: string;
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    quizzes: Quiz[];
  };
  
  export type Quiz = {
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
  
  export const CURRICULUM: Subject[] = [
    // ─── MATHEMATICS ───────────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics',
      emoji: '🔢',
      color: '#4C6EF5',
      classes: [6, 7, 8, 9, 10],
      topics: [
        {
          id: 'math_fractions',
          name: 'Fractions & Decimals',
          description: 'Understanding parts of a whole using fractions and decimals',
          duration: '20 min',
          difficulty: 'Easy',
          quizzes: [
            {
              id: 'q1',
              question: 'What is 1/2 + 1/4?',
              options: ['1/6', '2/6', '3/4', '1/3'],
              correct: 2,
              explanation: '1/2 = 2/4, so 2/4 + 1/4 = 3/4',
            },
            {
              id: 'q2',
              question: 'Which is greater: 0.5 or 3/5?',
              options: ['0.5', '3/5', 'They are equal', 'Cannot compare'],
              correct: 1,
              explanation: '3/5 = 0.6, which is greater than 0.5',
            },
            {
              id: 'q3',
              question: 'What is 3/4 of 20?',
              options: ['10', '12', '15', '18'],
              correct: 2,
              explanation: '3/4 × 20 = 60/4 = 15',
            },
          ],
        },
        {
          id: 'math_algebra',
          name: 'Basic Algebra',
          description: 'Introduction to variables, expressions and equations',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'If 2x + 3 = 11, what is x?',
              options: ['3', '4', '5', '6'],
              correct: 1,
              explanation: '2x = 11 - 3 = 8, so x = 4',
            },
            {
              id: 'q2',
              question: 'What is the value of 3x - 2 when x = 5?',
              options: ['11', '12', '13', '14'],
              correct: 2,
              explanation: '3(5) - 2 = 15 - 2 = 13',
            },
            {
              id: 'q3',
              question: 'Which expression equals 2(x + 3)?',
              options: ['2x + 3', '2x + 6', 'x + 6', '2x + 5'],
              correct: 1,
              explanation: '2(x + 3) = 2x + 6 by distributive property',
            },
          ],
        },
        {
          id: 'math_geometry',
          name: 'Geometry — Shapes & Areas',
          description: 'Properties of shapes and calculating areas and perimeters',
          duration: '30 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'What is the area of a rectangle with length 8cm and width 5cm?',
              options: ['26 cm²', '40 cm²', '13 cm²', '80 cm²'],
              correct: 1,
              explanation: 'Area = length × width = 8 × 5 = 40 cm²',
            },
            {
              id: 'q2',
              question: 'How many sides does a hexagon have?',
              options: ['4', '5', '6', '8'],
              correct: 2,
              explanation: 'A hexagon has 6 sides (hex = 6 in Greek)',
            },
            {
              id: 'q3',
              question: 'What is the area of a circle with radius 7? (π = 22/7)',
              options: ['44', '154', '22', '77'],
              correct: 1,
              explanation: 'Area = πr² = (22/7) × 7 × 7 = 154',
            },
          ],
        },
        {
          id: 'math_percentage',
          name: 'Percentages & Profit/Loss',
          description: 'Calculating percentages, profit, loss and simple interest',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'What is 25% of 200?',
              options: ['25', '50', '75', '100'],
              correct: 1,
              explanation: '25/100 × 200 = 50',
            },
            {
              id: 'q2',
              question: 'If cost price is ₹100 and selling price is ₹120, profit % is?',
              options: ['10%', '15%', '20%', '25%'],
              correct: 2,
              explanation: 'Profit = 20, Profit% = 20/100 × 100 = 20%',
            },
          ],
        },
        {
          id: 'math_triangles',
          name: 'Triangles & Pythagoras',
          description: 'Triangle properties and the Pythagorean theorem',
          duration: '30 min',
          difficulty: 'Hard',
          quizzes: [
            {
              id: 'q1',
              question: 'In a right triangle with legs 3 and 4, what is the hypotenuse?',
              options: ['5', '6', '7', '8'],
              correct: 0,
              explanation: '3² + 4² = 9 + 16 = 25, √25 = 5',
            },
            {
              id: 'q2',
              question: 'Sum of angles in a triangle is?',
              options: ['90°', '180°', '270°', '360°'],
              correct: 1,
              explanation: 'Sum of interior angles of any triangle = 180°',
            },
          ],
        },
        {
          id: 'math_statistics',
          name: 'Statistics & Probability',
          description: 'Mean, median, mode and basic probability',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'What is the mean of 2, 4, 6, 8, 10?',
              options: ['4', '5', '6', '7'],
              correct: 2,
              explanation: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6',
            },
            {
              id: 'q2',
              question: 'Probability of getting heads when flipping a coin?',
              options: ['1/4', '1/3', '1/2', '1'],
              correct: 2,
              explanation: 'There are 2 equally likely outcomes, heads is 1, so P = 1/2',
            },
          ],
        },
      ],
    },
  
    // ─── SCIENCE — PHYSICS ─────────────────────────────────
    {
      id: 'physics',
      name: 'Physics',
      emoji: '⚡',
      color: '#F59E0B',
      classes: [6, 7, 8, 9, 10],
      topics: [
        {
          id: 'phy_force',
          name: 'Force & Motion',
          description: 'Understanding forces, types of motion and Newton\'s laws',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'What is the SI unit of force?',
              options: ['Joule', 'Newton', 'Watt', 'Pascal'],
              correct: 1,
              explanation: 'Force is measured in Newtons (N), named after Isaac Newton',
            },
            {
              id: 'q2',
              question: 'Newton\'s first law is also called the law of?',
              options: ['Acceleration', 'Inertia', 'Gravity', 'Momentum'],
              correct: 1,
              explanation: 'Newton\'s first law states objects stay at rest or in motion unless acted upon — this is inertia',
            },
            {
              id: 'q3',
              question: 'If a ball is rolling and no force acts on it, it will?',
              options: ['Speed up', 'Slow down', 'Keep rolling forever', 'Stop immediately'],
              correct: 2,
              explanation: 'By Newton\'s first law, without any external force it continues moving',
            },
          ],
        },
        {
          id: 'phy_light',
          name: 'Light — Reflection & Refraction',
          description: 'How light behaves when it hits surfaces and passes through materials',
          duration: '30 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'Speed of light in vacuum is approximately?',
              options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
              correct: 1,
              explanation: 'Speed of light = 3 × 10⁸ m/s ≈ 300,000 km/s',
            },
            {
              id: 'q2',
              question: 'A rainbow is formed due to?',
              options: ['Reflection only', 'Refraction only', 'Dispersion of light', 'Absorption'],
              correct: 2,
              explanation: 'Rainbows form when sunlight is dispersed by water droplets into VIBGYOR colors',
            },
          ],
        },
        {
          id: 'phy_electricity',
          name: 'Electricity & Circuits',
          description: 'Electric current, voltage, resistance and simple circuits',
          duration: '30 min',
          difficulty: 'Hard',
          quizzes: [
            {
              id: 'q1',
              question: 'Ohm\'s Law states V = ?',
              options: ['I/R', 'I × R', 'R/I', 'I + R'],
              correct: 1,
              explanation: 'Ohm\'s Law: Voltage = Current × Resistance (V = IR)',
            },
            {
              id: 'q2',
              question: 'Unit of electric current is?',
              options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
              correct: 2,
              explanation: 'Electric current is measured in Amperes (A)',
            },
          ],
        },
        {
          id: 'phy_gravitation',
          name: 'Gravitation',
          description: 'Universal law of gravitation and gravitational force',
          duration: '25 min',
          difficulty: 'Hard',
          quizzes: [
            {
              id: 'q1',
              question: 'Value of acceleration due to gravity on Earth is?',
              options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '11 m/s²'],
              correct: 1,
              explanation: 'g = 9.8 m/s² (approximately 10 m/s² for calculations)',
            },
            {
              id: 'q2',
              question: 'Who discovered the universal law of gravitation?',
              options: ['Einstein', 'Galileo', 'Newton', 'Kepler'],
              correct: 2,
              explanation: 'Isaac Newton formulated the universal law of gravitation in 1687',
            },
          ],
        },
      ],
    },
  
    // ─── SCIENCE — CHEMISTRY ───────────────────────────────
    {
      id: 'chemistry',
      name: 'Chemistry',
      emoji: '⚗️',
      color: '#10B981',
      classes: [6, 7, 8, 9, 10],
      topics: [
        {
          id: 'chem_atoms',
          name: 'Atoms & Molecules',
          description: 'Structure of atoms, elements and compounds',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'The smallest particle of an element is called?',
              options: ['Molecule', 'Atom', 'Electron', 'Nucleus'],
              correct: 1,
              explanation: 'An atom is the smallest particle of an element that retains its chemical properties',
            },
            {
              id: 'q2',
              question: 'Chemical formula of water is?',
              options: ['H₂O₂', 'HO', 'H₂O', 'H₃O'],
              correct: 2,
              explanation: 'Water is H₂O — 2 hydrogen atoms and 1 oxygen atom',
            },
            {
              id: 'q3',
              question: 'Atomic number of Carbon is?',
              options: ['4', '6', '8', '12'],
              correct: 1,
              explanation: 'Carbon has atomic number 6 (6 protons in its nucleus)',
            },
          ],
        },
        {
          id: 'chem_periodic',
          name: 'Periodic Table',
          description: 'Organization of elements and their properties',
          duration: '30 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'Who arranged the periodic table by atomic number?',
              options: ['Mendeleev', 'Moseley', 'Dalton', 'Bohr'],
              correct: 1,
              explanation: 'Henry Moseley arranged elements by atomic number in 1913',
            },
            {
              id: 'q2',
              question: 'Noble gases are in which group of periodic table?',
              options: ['Group 1', 'Group 7', 'Group 17', 'Group 18'],
              correct: 3,
              explanation: 'Noble gases (He, Ne, Ar etc.) are in Group 18',
            },
          ],
        },
        {
          id: 'chem_reactions',
          name: 'Chemical Reactions',
          description: 'Types of chemical reactions and balancing equations',
          duration: '30 min',
          difficulty: 'Hard',
          quizzes: [
            {
              id: 'q1',
              question: 'Rusting of iron is an example of?',
              options: ['Combination reaction', 'Decomposition', 'Oxidation reaction', 'Displacement'],
              correct: 2,
              explanation: 'Rusting is oxidation — iron reacts with oxygen and water to form iron oxide',
            },
            {
              id: 'q2',
              question: 'pH of pure water is?',
              options: ['0', '5', '7', '14'],
              correct: 2,
              explanation: 'Pure water is neutral with pH = 7',
            },
          ],
        },
      ],
    },
  
    // ─── SCIENCE — BIOLOGY ─────────────────────────────────
    {
      id: 'biology',
      name: 'Biology',
      emoji: '🌿',
      color: '#059669',
      classes: [6, 7, 8, 9, 10],
      topics: [
        {
          id: 'bio_cell',
          name: 'Cell — Basic Unit of Life',
          description: 'Structure and function of plant and animal cells',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'Powerhouse of the cell is?',
              options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Vacuole'],
              correct: 2,
              explanation: 'Mitochondria produces ATP energy — it is called the powerhouse of the cell',
            },
            {
              id: 'q2',
              question: 'Cell wall is present in?',
              options: ['Animal cells only', 'Plant cells only', 'Both', 'Neither'],
              correct: 1,
              explanation: 'Cell wall is a feature of plant cells, providing rigidity and structure',
            },
            {
              id: 'q3',
              question: 'DNA is found in which organelle?',
              options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Both A and B'],
              correct: 3,
              explanation: 'DNA is mainly in the nucleus, but mitochondria also have their own DNA',
            },
          ],
        },
        {
          id: 'bio_photosynthesis',
          name: 'Photosynthesis',
          description: 'How plants make food using sunlight, water and CO₂',
          duration: '20 min',
          difficulty: 'Easy',
          quizzes: [
            {
              id: 'q1',
              question: 'Which gas do plants release during photosynthesis?',
              options: ['CO₂', 'Nitrogen', 'Oxygen', 'Hydrogen'],
              correct: 2,
              explanation: 'Plants release oxygen as a byproduct of photosynthesis',
            },
            {
              id: 'q2',
              question: 'Photosynthesis occurs in which part of the plant?',
              options: ['Roots', 'Stem', 'Leaves', 'Flowers'],
              correct: 2,
              explanation: 'Leaves contain chlorophyll and are the main site of photosynthesis',
            },
            {
              id: 'q3',
              question: 'Chlorophyll absorbs which color of light most?',
              options: ['Red and Blue', 'Green', 'Yellow', 'White'],
              correct: 0,
              explanation: 'Chlorophyll absorbs red and blue light most, reflecting green (which is why leaves look green)',
            },
          ],
        },
        {
          id: 'bio_human_body',
          name: 'Human Body Systems',
          description: 'Digestive, respiratory, circulatory and nervous systems',
          duration: '35 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'Which organ pumps blood in the human body?',
              options: ['Liver', 'Lungs', 'Heart', 'Kidney'],
              correct: 2,
              explanation: 'The heart is a muscular pump that circulates blood throughout the body',
            },
            {
              id: 'q2',
              question: 'Digestion of starch begins in?',
              options: ['Stomach', 'Mouth', 'Small intestine', 'Large intestine'],
              correct: 1,
              explanation: 'Salivary amylase in the mouth starts breaking down starch',
            },
            {
              id: 'q3',
              question: 'Normal human body temperature is?',
              options: ['35°C', '36°C', '37°C', '38°C'],
              correct: 2,
              explanation: 'Normal body temperature is 37°C (98.6°F)',
            },
          ],
        },
        {
          id: 'bio_heredity',
          name: 'Heredity & Evolution',
          description: 'How traits are passed from parents to offspring',
          duration: '30 min',
          difficulty: 'Hard',
          quizzes: [
            {
              id: 'q1',
              question: 'Father of genetics is?',
              options: ['Darwin', 'Mendel', 'Watson', 'Crick'],
              correct: 1,
              explanation: 'Gregor Mendel discovered the laws of inheritance through pea plant experiments',
            },
            {
              id: 'q2',
              question: 'How many chromosomes does a normal human cell have?',
              options: ['23', '44', '46', '48'],
              correct: 2,
              explanation: 'Human cells have 46 chromosomes (23 pairs)',
            },
          ],
        },
      ],
    },
  
    // ─── COMPUTER SCIENCE ──────────────────────────────────
    {
      id: 'computers',
      name: 'Computer Science',
      emoji: '💻',
      color: '#6366F1',
      classes: [6, 7, 8, 9, 10],
      topics: [
        {
          id: 'cs_basics',
          name: 'Computer Basics',
          description: 'Hardware, software, input/output devices',
          duration: '20 min',
          difficulty: 'Easy',
          quizzes: [
            {
              id: 'q1',
              question: 'CPU stands for?',
              options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Core Processing Unit'],
              correct: 0,
              explanation: 'CPU = Central Processing Unit — the brain of the computer',
            },
            {
              id: 'q2',
              question: 'Which is an input device?',
              options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
              correct: 2,
              explanation: 'Keyboard sends data into the computer — it is an input device',
            },
          ],
        },
        {
          id: 'cs_internet',
          name: 'Internet & Networking',
          description: 'How the internet works, browsers and network types',
          duration: '25 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'WWW stands for?',
              options: ['World Wide Web', 'World Wide Window', 'Wide World Web', 'Web Wide World'],
              correct: 0,
              explanation: 'WWW = World Wide Web, invented by Tim Berners-Lee in 1989',
            },
            {
              id: 'q2',
              question: 'IP address is used to?',
              options: ['Store files', 'Identify devices on a network', 'Increase speed', 'Connect to WiFi'],
              correct: 1,
              explanation: 'IP (Internet Protocol) address uniquely identifies each device on a network',
            },
          ],
        },
        {
          id: 'cs_programming',
          name: 'Introduction to Programming',
          description: 'Basic concepts of coding, algorithms and flowcharts',
          duration: '30 min',
          difficulty: 'Medium',
          quizzes: [
            {
              id: 'q1',
              question: 'An algorithm is?',
              options: ['A type of computer', 'Step by step solution to a problem', 'A programming language', 'A data type'],
              correct: 1,
              explanation: 'An algorithm is a step-by-step procedure to solve a problem',
            },
            {
              id: 'q2',
              question: 'Which is NOT a programming language?',
              options: ['Python', 'Java', 'HTML', 'Microsoft Word'],
              correct: 3,
              explanation: 'Microsoft Word is an application, not a programming language',
            },
          ],
        },
      ],
    },
  
    // ─── ENVIRONMENTAL SCIENCE ─────────────────────────────
    {
      id: 'environmental',
      name: 'Environmental Science',
      emoji: '🌍',
      color: '#16A34A',
      classes: [6, 7, 8],
      topics: [
        {
          id: 'env_ecosystem',
          name: 'Ecosystems & Food Chains',
          description: 'How living things interact with each other and their environment',
          duration: '20 min',
          difficulty: 'Easy',
          quizzes: [
            {
              id: 'q1',
              question: 'Plants in a food chain are called?',
              options: ['Consumers', 'Decomposers', 'Producers', 'Predators'],
              correct: 2,
              explanation: 'Plants make their own food through photosynthesis — they are called producers',
            },
            {
              id: 'q2',
              question: 'What breaks down dead organisms?',
              options: ['Producers', 'Consumers', 'Decomposers', 'Herbivores'],
              correct: 2,
              explanation: 'Decomposers like bacteria and fungi break down dead matter',
            },
          ],
        },
        {
          id: 'env_pollution',
          name: 'Pollution & Conservation',
          description: 'Types of pollution and ways to protect our environment',
          duration: '20 min',
          difficulty: 'Easy',
          quizzes: [
            {
              id: 'q1',
              question: 'Which gas causes the greenhouse effect?',
              options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
              correct: 2,
              explanation: 'CO₂ and other greenhouse gases trap heat in the atmosphere',
            },
            {
              id: 'q2',
              question: 'The 3 R\'s of environment are?',
              options: ['Read, Run, Rest', 'Reduce, Reuse, Recycle', 'Remove, Replace, Repair', 'Rain, River, Rock'],
              correct: 1,
              explanation: 'Reduce, Reuse, Recycle — the three pillars of environmental conservation',
            },
          ],
        },
      ],
    },
  ];
  
  // Helper to get subjects for a specific class
  export function getSubjectsForClass(classNumber: number): Subject[] {
    return CURRICULUM.filter(s => s.classes.includes(classNumber));
  }
  
  // Helper to get a specific topic
  export function getTopicById(subjectId: string, topicId: string): Topic | undefined {
    const subject = CURRICULUM.find(s => s.id === subjectId);
    return subject?.topics.find(t => t.id === topicId);
  }
  
  // Helper to get all quizzes for a class
  export function getQuizzesForClass(classNumber: number): {subject: Subject, topic: Topic, quiz: Quiz}[] {
    const result: {subject: Subject, topic: Topic, quiz: Quiz}[] = [];
    getSubjectsForClass(classNumber).forEach(subject => {
      subject.topics.forEach(topic => {
        topic.quizzes.forEach(quiz => {
          result.push({ subject, topic, quiz });
        });
      });
    });
    return result;
  }