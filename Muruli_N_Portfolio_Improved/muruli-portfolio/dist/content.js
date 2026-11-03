export const profile = {
  name: 'Muruli N',
  role: 'Full-stack developer · Software engineering student',
  degree: 'B.E. in Information Science & Engineering',
  university: 'GM University, Davanagere',
  graduation: '2027',
  email: 'murulimagics@gmail.com',
  phone: '+91 9113837782',
  linkedin: 'https://www.linkedin.com/in/murulin2127/',
  github: 'https://github.com/Muruli27',
  resume: 'assets/Muruli_N_Resume.pdf'
};

export const projects = [
  {
    id: 'deployment', number: '01', category: 'DEVOPS · CI/CD',
    name: 'Blue-Green Deployment System',
    summary: 'A container-based release workflow designed to move application traffic between two environments with minimal disruption.',
    problem: 'Releasing a new application version can introduce downtime or make rollback difficult when the deployment process is not controlled.',
    approach: [
      'Prepare Blue and Green application environments using Docker and Docker Compose.',
      'Configure Nginx to route incoming traffic to the active environment.',
      'Use GitHub Actions to automate build, test, and deployment steps.',
      'Switch the active environment as part of the release workflow.'
    ],
    stack: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions'],
    outcome: 'The project demonstrates a Blue-Green deployment pattern. The supplied resume does not include production deployment evidence or measured uptime, so no performance claim is made.',
    visual: 'deploy'
  },
  {
    id: 'sentiment', number: '02', category: 'PYTHON · MACHINE LEARNING',
    name: 'Sentiment Analysis using Machine Learning',
    summary: 'A text-classification workflow that converts unstructured language into features for sentiment prediction.',
    problem: 'Text data is unstructured. Before a machine-learning model can classify sentiment, the text must be prepared and represented as useful numerical features.',
    approach: [
      'Preprocess text before model training.',
      'Extract text features using TF-IDF.',
      'Train a sentiment-classification model with Scikit-learn.',
      'Evaluate the model as part of the classification workflow.'
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'TF-IDF', 'NLP'],
    outcome: 'A practical project covering text preprocessing, feature extraction, model training, and evaluation. No benchmark score was supplied.',
    visual: 'sentiment'
  },
  {
    id: 'students', number: '03', category: 'JAVA · DATABASES',
    name: 'Student Management System',
    summary: 'A Java and MySQL application for organizing student records, attendance, and academic information.',
    problem: 'Student records need a consistent way to be created, updated, retrieved, and maintained without relying on scattered manual records.',
    approach: [
      'Build an interface for student record management.',
      'Implement create, read, update, and delete operations.',
      'Connect the application to MySQL for persistent storage.',
      'Organize student, attendance, and academic details.'
    ],
    stack: ['Java', 'MySQL', 'CRUD'],
    outcome: 'An academic application project demonstrating database-backed record management. No deployment or usage metrics were supplied.',
    visual: 'students'
  }
];

export const skillGroups = [
  { title: 'Programming', subtitle: 'Languages used to solve problems and build applications.', skills: ['Python', 'Java', 'C', 'JavaScript'] },
  { title: 'Frontend & backend', subtitle: 'Web fundamentals and application development.', skills: ['HTML', 'CSS', 'JavaScript', 'MERN stack', 'RESTful APIs'] },
  { title: 'Databases & data', subtitle: 'Working with structured data and analysis workflows.', skills: ['MySQL', 'MongoDB', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TF-IDF', 'NLP'] },
  { title: 'Tools & CS fundamentals', subtitle: 'The engineering practices behind reliable software.', skills: ['Git', 'Docker', 'Linux', 'Nginx', 'GitHub Actions', 'Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'DBMS'] }
];

export const credentials = [
  { title: 'Full Stack Web Development (MERN) Internship', issuer: 'WSA', kind: 'Internship credential', url: 'https://drive.google.com/file/d/1jcHgIoEWXGKx5E82OGf6egJNx9wyYC4B/view?usp=drivesdk' },
  { title: 'Full Stack Development — Frontend Essentials', issuer: 'GM University', kind: 'Stage 2' },
  { title: 'Introduction to Full Stack Development', issuer: 'GM University', kind: 'Stage 1' },
  { title: 'Embracing Data Structures and Algorithms for Project Development', issuer: 'GM University', kind: 'Course credential' },
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte', kind: 'Virtual job simulation', url: 'https://drive.google.com/file/d/1F5Jo0BNfhX0yG2GBLqHxYKo8fTGqpsOq/view?usp=drive_link' }
];
