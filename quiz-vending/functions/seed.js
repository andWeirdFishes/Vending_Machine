const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

async function seed() {
  // Topics
  const topics = [
    { id: 'math',    name: 'Mathematics', servoPin: 1 },
    { id: 'science', name: 'Science',     servoPin: 2 },
    { id: 'history', name: 'History',     servoPin: 3 },
  ];

  for (const topic of topics) {
    await db.collection('topics').doc(topic.id).set(topic);
  }

  // Questions
  const questions = [
    {
      topicId: 'math',
      questionText: 'What is 12 × 12?',
      answers: [
        { id: 'a', text: '132', isCorrect: false },
        { id: 'b', text: '144', isCorrect: true },
        { id: 'c', text: '124', isCorrect: false },
        { id: 'd', text: '148', isCorrect: false },
      ],
    },
    {
      topicId: 'science',
      questionText: 'What is the chemical symbol for water?',
      answers: [
        { id: 'a', text: 'O2',  isCorrect: false },
        { id: 'b', text: 'H2O', isCorrect: true },
        { id: 'c', text: 'CO2', isCorrect: false },
        { id: 'd', text: 'HO',  isCorrect: false },
      ],
    },
    {
      topicId: 'history',
      questionText: 'In what year did World War II end?',
      answers: [
        { id: 'a', text: '1943', isCorrect: false },
        { id: 'b', text: '1944', isCorrect: false },
        { id: 'c', text: '1945', isCorrect: true },
        { id: 'd', text: '1946', isCorrect: false },
      ],
    },
  ];

  for (const q of questions) {
    await db.collection('questions').add(q);
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(console.error);