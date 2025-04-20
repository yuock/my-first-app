// my-first-app/Data/users.ts

// Park Guide Users Dataset
export const users = [
  {
    id: 'u001',
    fullName: 'John Doe',
    username: 'guide_john',
    password: 'pass123',
    email: 'john.doe@parkguide.com',
    role: 'guide',
    assignedPark: 'Bako National Park',
    certifications: [
      {
        name: 'Basic First Aid',
        issueDate: '2023-01-15',
        expiryDate: '2024-01-15',
        status: 'valid'
      },
      {
        name: 'Wildlife Safety',
        issueDate: '2023-03-20',
        expiryDate: '2024-03-20',
        status: 'valid'
      },
      {
        name: 'Eco-Tourism Basics',
        issueDate: '2023-06-10',
        expiryDate: '2024-06-10',
        status: 'valid'
      }
    ],
    trainingCompleted: [
      {
        name: 'Basic Navigation',
        completedDate: '2023-02-01',
        score: 85
      },
      {
        name: 'Emergency Response',
        completedDate: '2023-04-15',
        score: 90
      }
    ],
    pendingTrainings: [
      {
        name: 'Advanced Wildlife Handling',
        startDate: '2024-05-01',
        endDate: '2024-05-15'
      }
    ],
    experience: '5 years',
    languages: ['English', 'Malay', 'Iban'],
    performance: {
      rating: 4.5,
      totalTours: 120,
      visitorFeedback: [
        {
          rating: 5,
          comment: 'Excellent knowledge of local flora and fauna',
          date: '2024-03-15'
        }
      ]
    },
    notifications: [
      'New certification requirement: Advanced Wildlife Handling',
      'Training update available: Emergency Response Procedures'
    ],
    lastLogin: '2024-04-10',
    status: 'active',
    checkInHistory: [
      {
        date: '2024-04-10',
        location: 'Bako National Park',
        status: 'present'
      }
    ]
  },
  {
    id: 'u002',
    fullName: 'Amy Smith',
    username: 'guide_amy',
    password: 'secure456',
    email: 'amy.smith@parkguide.com',
    role: 'guide',
    assignedPark: 'Gunung Mulu National Park',
    certifications: [
      {
        name: 'Basic Navigation',
        issueDate: '2023-02-01',
        expiryDate: '2024-02-01',
        status: 'expiring_soon'
      },
      {
        name: 'Wildlife Safety',
        issueDate: '2023-04-15',
        expiryDate: '2024-04-15',
        status: 'valid'
      }
    ],
    trainingCompleted: [
      {
        name: 'First Aid',
        completedDate: '2023-03-01',
        score: 75
      }
    ],
    pendingTrainings: [
      {
        name: 'Emergency Procedures',
        startDate: '2024-05-20',
        endDate: '2024-06-05'
      }
    ],
    experience: '2 years',
    languages: ['English', 'Malay', 'Chinese'],
    performance: {
      rating: 4.0,
      totalTours: 45,
      visitorFeedback: [
        {
          rating: 4,
          comment: 'Very knowledgeable about the caves',
          date: '2024-03-20'
        }
      ]
    },
    notifications: [
      'Reminder: Navigation Certification expires in 5 days',
      'Complete required training: Emergency Procedures'
    ],
    lastLogin: '2024-04-11',
    status: 'active',
    checkInHistory: [
      {
        date: '2024-04-11',
        location: 'Gunung Mulu National Park',
        status: 'present'
      }
    ]
  },
  {
    id: 'u003',
    fullName: 'Mike Johnson',
    username: 'guide_mike',
    password: 'guide789',
    email: 'mike.johnson@parkguide.com',
    role: 'guide',
    assignedPark: 'Niah National Park',
    certifications: [
      {
        name: 'Advanced First Aid',
        issueDate: '2023-01-10',
        expiryDate: '2024-01-10',
        status: 'valid'
      },
      {
        name: 'Wildlife Conservation',
        issueDate: '2023-05-20',
        expiryDate: '2024-05-20',
        status: 'valid'
      },
      {
        name: 'Tour Guide Certification',
        issueDate: '2023-08-15',
        expiryDate: '2024-08-15',
        status: 'valid'
      }
    ],
    trainingCompleted: [
      {
        name: 'Advanced Navigation',
        completedDate: '2023-07-01',
        score: 95
      },
      {
        name: 'Cultural Heritage',
        completedDate: '2023-09-15',
        score: 88
      }
    ],
    pendingTrainings: [],
    experience: '8 years',
    languages: ['English', 'Malay', 'Iban', 'Bidayuh'],
    performance: {
      rating: 4.8,
      totalTours: 200,
      visitorFeedback: [
        {
          rating: 5,
          comment: 'Exceptional knowledge of local history and culture',
          date: '2024-03-25'
        }
      ]
    },
    notifications: [],
    lastLogin: '2024-04-12',
    status: 'active',
    checkInHistory: [
      {
        date: '2024-04-12',
        location: 'Niah National Park',
        status: 'present'
      }
    ]
  }
];
