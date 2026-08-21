// Predefined skill dictionaries for different job roles
const jobRoleSkills = {
  'Frontend Developer': [
    'JavaScript', 'React', 'Vue.js', 'Angular', 'HTML', 'CSS',
    'TypeScript', 'jQuery', 'SASS', 'LESS', 'Webpack', 'Babel',
    'RESTful APIs', 'Git', 'Responsive Design', 'CSS Frameworks',
    'Testing', 'Jest', 'Cypress', 'Enzyme', 'Next.js', 'Redux',
    'GraphQL', 'Material UI', 'Tailwind CSS', 'Bootstrap', 'AJAX'
  ],
  'Backend Developer': [
    'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
    'RESTful APIs', 'GraphQL', 'Git', 'Testing', 'Jest', 'Mocha',
    'AWS', 'Azure', 'GCP', 'Microservices', 'CI/CD', 'Kubernetes',
    'RabbitMQ', 'Apache Kafka', 'OAuth', 'JWT', 'Elasticsearch'
  ],
  'Full Stack Developer': [
    'JavaScript', 'React', 'Vue.js', 'Angular', 'HTML', 'CSS',
    'Node.js', 'Python', 'Express.js', 'Django', 'SQL', 'MongoDB',
    'TypeScript', 'RESTful APIs', 'Git', 'Docker', 'AWS', 'Testing',
    'Next.js', 'Redux', 'PostgreSQL', 'Redis', 'GraphQL', 'JWT'
  ],
  'Data Scientist': [
    'Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
    'Scikit-learn', 'TensorFlow', 'PyTorch', 'Jupyter', 'Statistics',
    'Machine Learning', 'Deep Learning', 'Data Visualization',
    'Big Data', 'Hadoop', 'Spark', 'Tableau', 'Power BI', 'Excel',
    'Data Mining', 'Statistical Analysis', 'NLP', 'Computer Vision', 'Pyspark'
  ],
  'DevOps Engineer': [
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
    'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible', 'Chef', 'Puppet',
    'Linux', 'Bash', 'Monitoring', 'Logging', 'Prometheus', 'Grafana',
    'Git', 'Infrastructure as Code', 'Security', 'Networking', 'Vault',
    'Helm', 'Istio', 'ELK Stack', 'Vagrant'
  ],
  'Mobile Developer': [
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'iOS',
    'Android', 'Xamarin', 'Ionic', 'Cordova', 'Firebase', 'REST APIs',
    'UI/UX', 'Testing', 'Git', 'Agile', 'Material Design', 'SwiftUI',
    'Xcode', 'Android Studio', 'Realm', 'Redux', 'Jest'
  ],
  'UI/UX Designer': [
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
    'UI Design', 'UX Design', 'Prototyping', 'Wireframing',
    'User Research', 'Usability Testing', 'Interaction Design',
    'Visual Design', 'Typography', 'Color Theory', 'HTML/CSS',
    'Responsive Design', 'Accessibility', 'Design Systems', 'InVision',
    'Principle', 'Framer', 'User Journey', 'Information Architecture'
  ],
  'Project Manager': [
    'Agile', 'Scrum', 'Kanban', 'Jira', 'Trello', 'Asana',
    'Project Planning', 'Risk Management', 'Stakeholder Management',
    'Budget Management', 'Team Leadership', 'Communication',
    'MS Project', 'Resource Management', 'Timeline Management',
    'Quality Assurance', 'Documentation', 'Process Improvement',
    'Lean', 'Six Sigma', 'PMP', 'Stakeholder Engagement'
  ],
  'Machine Learning Engineer': [
    'Python', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn',
    'Pandas', 'NumPy', 'Jupyter', 'Data Science', 'Statistics',
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
    'Data Mining', 'Feature Engineering', 'Model Deployment',
    'Cloud Platforms', 'Big Data', 'Spark', 'Docker', 'Kubernetes'
  ],
  'Cybersecurity Specialist': [
    'Security Analysis', 'Vulnerability Assessment', 'Penetration Testing',
    'Network Security', 'Firewalls', 'SIEM', 'Incident Response',
    'Risk Management', 'Compliance', 'Cryptography', 'SOC',
    'IDS/IPS', 'Security Tools', 'Threat Hunting', 'Forensics',
    'CISSP', 'CEH', 'CompTIA Security+', 'OSCP'
  ],
  'Cloud Engineer': [
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'Cloud Architecture', 'Serverless', 'Lambda', 'EC2', 'S3',
    'IAM', 'VPC', 'Load Balancers', 'Auto Scaling', 'Monitoring',
    'CI/CD', 'Infrastructure as Code', 'Cloud Security', 'Migration'
  ]
};

// Get required skills for a job role
export const getJobRoleSkills = (jobRole) => {
  const role = Object.keys(jobRoleSkills).find(
    key => key.toLowerCase() === jobRole.toLowerCase()
  );
  return role ? jobRoleSkills[role] : jobRoleSkills['Full Stack Developer'];
};

// Escape special regex characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Get variations of a skill name for better matching
const getSkillVariations = (skill) => {
  const variations = [skill];
  const skillLower = skill.toLowerCase();

  if (skillLower.includes('javascript')) {
    variations.push('js', 'javascript');
  } else if (skillLower.includes('node.js')) {
    variations.push('node', 'nodejs');
  } else if (skillLower.includes('c#')) {
    variations.push('csharp', 'c sharp');
  } else if (skillLower.includes('react')) {
    variations.push('reactjs', 'react.js');
  } else if (skillLower.includes('vue.js')) {
    variations.push('vue', 'vuejs');
  } else if (skillLower.includes('angular')) {
    variations.push('angularjs', 'angular.js');
  } else if (skillLower.includes('typescript')) {
    variations.push('ts', 'typescript');
  } else if (skillLower.includes('html')) {
    variations.push('html5', 'html 5');
  } else if (skillLower.includes('css')) {
    variations.push('css3', 'css 3');
  } else if (skillLower.includes('python')) {
    variations.push('python3', 'python 3');
  } else if (skillLower.includes('java')) {
    variations.push('java8', 'java 8', 'java11', 'java 11');
  } else if (skillLower.includes('sql')) {
    variations.push('mysql', 'postgresql', 'mssql');
  }

  return variations;
};

// Helper function to check if a skill exists in the text
const checkSkillInText = (text, skill) => {
  const variations = getSkillVariations(skill);

  for (const variation of variations) {
    const regex = new RegExp(`\\b${escapeRegExp(variation)}\\b`, 'i');
    if (regex.test(text)) {
      return true;
    }
  }

  return false;
};

// Extract skills from resume text
export const extractSkills = (resumeText, requiredSkills) => {
  const foundSkills = [];
  const missingSkills = [];

  const normalizedText = resumeText
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  requiredSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    const skillFound = checkSkillInText(normalizedText, skillLower);

    if (skillFound) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  return { foundSkills, missingSkills };
};

// Calculate keyword density score
const calculateKeywordDensityScore = (text, keywords) => {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  let keywordCount = 0;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${escapeRegExp(keyword.toLowerCase())}\\b`, 'g');
    const matches = text.match(regex);
    if (matches) {
      keywordCount += matches.length;
    }
  });

  const density = (keywordCount / totalWords) * 100;

  if (density > 3) {
    return Math.max(0, 100 - ((density - 3) * 20));
  } else if (density < 0.5) {
    return Math.max(0, density * 50);
  } else {
    return Math.min(100, density * 33.33);
  }
};

// Calculate sections score
const calculateSectionsScore = (text) => {
  const sections = [
    'summary', 'objective', 'profile',
    'experience', 'work', 'employment', 'professional',
    'education', 'degree', 'school', 'university',
    'skills', 'technologies', 'technical', 'competencies',
    'contact', 'email', 'phone', 'address'
  ];

  let foundSections = 0;
  sections.forEach(section => {
    const regex = new RegExp(`\\b${section}\\b`, 'i');
    if (regex.test(text)) {
      foundSections++;
    }
  });

  return Math.round((foundSections / 5) * 100);
};

// Calculate formatting score
const calculateFormattingScore = (text) => {
  let score = 100;

  if (text.includes('  ')) score -= 10;
  if (text.includes('\t')) score -= 10;
  if (text.includes('\n')) score += 5;
  if (text.includes(':')) score += 5;

  return Math.max(0, Math.min(100, score));
};

// Calculate length score
const calculateLengthScore = (text) => {
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

  if (wordCount < 100) return 30;
  if (wordCount > 1000) return 40;
  if (wordCount >= 200 && wordCount <= 600) return 100;
  if (wordCount >= 100 && wordCount < 200) return 70;
  if (wordCount > 600 && wordCount <= 1000) return 80;

  return 50;
};

// Apply ATS-specific adjustments
const applyATSSpecificAdjustments = (score, resumeText, foundSkills, missingSkills) => {
  let adjustedScore = score;

  const specialCharCount = (resumeText.match(/[!@#$%^&*()_+=[\]{}|;':",.<>?~`]/g) || []).length;
  if (specialCharCount > 50) {
    adjustedScore -= 10;
  }

  if (resumeText.toLowerCase().includes('email') && resumeText.toLowerCase().includes('@') &&
    resumeText.toLowerCase().includes('phone') && resumeText.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) {
    adjustedScore += 5;
  }

  if (!resumeText.toLowerCase().includes('experience') && !resumeText.toLowerCase().includes('work')) {
    adjustedScore -= 10;
  }

  const skillSectionMatch = resumeText.toLowerCase().match(/skills[\s\S]*?(?=\n\n|education|experience|$)/i);
  if (skillSectionMatch && skillSectionMatch[0].length < 50) {
    adjustedScore -= 5;
  }

  const numberCount = (resumeText.match(/\b\d+\b/g) || []).length;
  if (numberCount > 10) {
    adjustedScore += 5;
  }

  const wordCount = resumeText.split(/\s+/).filter(word => word.length > 0).length;
  if (wordCount > 800 && foundSkills.length < 10) {
    adjustedScore -= 5;
  }

  return Math.max(0, Math.min(100, adjustedScore));
};

// Calculate ATS score based on multiple factors
export const calculateATSScore = (resumeText, foundSkills, missingSkills, jobRole) => {
  const weights = {
    skillMatch: 0.40,
    keywordDensity: 0.25,
    sections: 0.15,
    formatting: 0.10,
    length: 0.10
  };

  const totalRequiredSkills = foundSkills.length + missingSkills.length;
  const skillMatchScore = totalRequiredSkills > 0
    ? Math.round((foundSkills.length / totalRequiredSkills) * 100)
    : 0;

  const keywordDensityScore = calculateKeywordDensityScore(resumeText, [...foundSkills, ...missingSkills]);
  const sectionsScore = calculateSectionsScore(resumeText);
  const formattingScore = calculateFormattingScore(resumeText);
  const lengthScore = calculateLengthScore(resumeText);

  let atsScore =
    (skillMatchScore * weights.skillMatch) +
    (keywordDensityScore * weights.keywordDensity) +
    (sectionsScore * weights.sections) +
    (formattingScore * weights.formatting) +
    (lengthScore * weights.length);

  atsScore = applyATSSpecificAdjustments(atsScore, resumeText, foundSkills, missingSkills);

  return Math.round(Math.max(0, Math.min(100, atsScore)));
};
