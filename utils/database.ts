import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// Mock data for development
const mockUserData = [
  {
    id: 1,
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john@example.com',
    assignedPark: 'Bako National Park',
    certifications: ['Basic Guide', 'Wildlife Expert', 'First Aid Certified'],
    trainingCompleted: ['First Aid', 'Wildlife Safety', 'Navigation Basics'],
    pendingTrainings: ['Advanced Navigation', 'Emergency Response'],
    performance: 4.5,
    status: 'Active',
    lastLogin: '2024-03-15T10:30:00Z',
    checkInCount: 25,
    averageRating: 4.7,
    languages: ['English', 'Malay'],
    experienceYears: 3,
    specializations: ['Wildlife', 'Bird Watching']
  },
  {
    id: 2,
    username: 'amysmith',
    fullName: 'Amy Smith',
    email: 'amy@example.com',
    assignedPark: 'Gunung Mulu National Park',
    certifications: ['Senior Guide', 'Botany Specialist', 'Advanced First Aid'],
    trainingCompleted: ['First Aid', 'Botany Basics', 'Advanced Navigation', 'Emergency Response'],
    pendingTrainings: [],
    performance: 4.8,
    status: 'Active',
    lastLogin: '2024-03-14T15:45:00Z',
    checkInCount: 42,
    averageRating: 4.9,
    languages: ['English', 'Malay', 'Chinese'],
    experienceYears: 5,
    specializations: ['Botany', 'Cave Systems']
  },
  {
    id: 3,
    username: 'mikecheng',
    fullName: 'Mike Cheng',
    email: 'mike@example.com',
    assignedPark: 'Niah National Park',
    certifications: ['Basic Guide', 'Cultural Heritage'],
    trainingCompleted: ['First Aid', 'Cultural Heritage Basics'],
    pendingTrainings: ['Advanced Cultural Interpretation'],
    performance: 4.2,
    status: 'On Leave',
    lastLogin: '2024-03-10T08:15:00Z',
    checkInCount: 18,
    averageRating: 4.3,
    languages: ['English', 'Malay', 'Iban'],
    experienceYears: 2,
    specializations: ['Cultural Heritage', 'History']
  },
  {
    id: 4,
    username: 'sarahlee',
    fullName: 'Sarah Lee',
    email: 'sarah@example.com',
    assignedPark: 'Lambir Hills National Park',
    certifications: ['Senior Guide', 'Wildlife Photography'],
    trainingCompleted: ['First Aid', 'Wildlife Photography', 'Advanced Navigation'],
    pendingTrainings: ['Drone Operation'],
    performance: 4.6,
    status: 'Active',
    lastLogin: '2024-03-15T09:20:00Z',
    checkInCount: 35,
    averageRating: 4.8,
    languages: ['English', 'Malay', 'Korean'],
    experienceYears: 4,
    specializations: ['Wildlife Photography', 'Bird Watching']
  },
  {
    id: 5,
    username: 'rajkumar',
    fullName: 'Raj Kumar',
    email: 'raj@example.com',
    assignedPark: 'Batang Ai National Park',
    certifications: ['Senior Guide', 'Orangutan Specialist', 'Advanced First Aid'],
    trainingCompleted: ['First Aid', 'Orangutan Behavior', 'Advanced Navigation', 'Emergency Response'],
    pendingTrainings: [],
    performance: 4.9,
    status: 'Active',
    lastLogin: '2024-03-15T11:30:00Z',
    checkInCount: 58,
    averageRating: 4.9,
    languages: ['English', 'Malay', 'Iban', 'Chinese'],
    experienceYears: 8,
    specializations: ['Orangutan Tracking', 'Rainforest Ecology']
  },
  {
    id: 6,
    username: 'mariafernandez',
    fullName: 'Maria Fernandez',
    email: 'maria@example.com',
    assignedPark: 'Similajau National Park',
    certifications: ['Basic Guide', 'Marine Biology'],
    trainingCompleted: ['First Aid', 'Marine Life Basics', 'Beach Safety'],
    pendingTrainings: ['Advanced Marine Biology', 'Scuba Diving'],
    performance: 4.3,
    status: 'Seasonal',
    lastLogin: '2024-03-14T16:20:00Z',
    checkInCount: 15,
    averageRating: 4.4,
    languages: ['English', 'Malay', 'Spanish'],
    experienceYears: 2,
    specializations: ['Marine Life', 'Turtle Conservation']
  },
  {
    id: 7,
    username: 'ahmadibrahim',
    fullName: 'Ahmad Ibrahim',
    email: 'ahmad@example.com',
    assignedPark: 'Kubah National Park',
    certifications: ['Senior Guide', 'Herpetology Expert'],
    trainingCompleted: ['First Aid', 'Reptile Handling', 'Advanced Navigation', 'Emergency Response'],
    pendingTrainings: [],
    performance: 4.7,
    status: 'Active',
    lastLogin: '2024-03-15T08:45:00Z',
    checkInCount: 47,
    averageRating: 4.8,
    languages: ['English', 'Malay', 'Arabic'],
    experienceYears: 6,
    specializations: ['Reptile Spotting', 'Night Walks']
  },
  {
    id: 8,
    username: 'liwei',
    fullName: 'Li Wei',
    email: 'li@example.com',
    assignedPark: 'Gunung Mulu National Park',
    certifications: ['Senior Guide', 'Cave Systems Expert', 'Advanced First Aid', 'Rope Access'],
    trainingCompleted: ['First Aid', 'Cave Safety', 'Advanced Navigation', 'Emergency Response', 'Rope Techniques'],
    pendingTrainings: [],
    performance: 4.8,
    status: 'Active',
    lastLogin: '2024-03-15T07:30:00Z',
    checkInCount: 52,
    averageRating: 4.9,
    languages: ['English', 'Malay', 'Chinese', 'Iban'],
    experienceYears: 7,
    specializations: ['Cave Systems', 'Adventure Tours'],
    performanceMetrics: {
      safety: 4.9,
      knowledge: 4.8,
      communication: 4.7,
      punctuality: 4.9,
      groupManagement: 4.8
    },
    tourTypes: ['Cave Exploration', 'Adventure Tours', 'Night Cave Tours']
  },
  {
    id: 9,
    username: 'sophia',
    fullName: 'Sophia Chen',
    email: 'sophia@example.com',
    assignedPark: 'Bako National Park',
    certifications: ['Senior Guide', 'Wildlife Conservation', 'Research Methods'],
    trainingCompleted: ['First Aid', 'Wildlife Monitoring', 'Research Techniques', 'Data Collection'],
    pendingTrainings: ['Advanced Research Methods'],
    performance: 4.7,
    status: 'Active',
    lastLogin: '2024-03-15T09:15:00Z',
    checkInCount: 45,
    averageRating: 4.8,
    languages: ['English', 'Malay', 'Chinese', 'French'],
    experienceYears: 6,
    specializations: ['Wildlife Research', 'Conservation Education'],
    performanceMetrics: {
      safety: 4.8,
      knowledge: 4.9,
      communication: 4.8,
      punctuality: 4.7,
      groupManagement: 4.8
    },
    tourTypes: ['Research Tours', 'Conservation Education', 'Wildlife Monitoring']
  }
];

const mockReviewData = [
  {
    id: 1,
    rating: 5,
    comment: 'Excellent guide! Very knowledgeable about the local wildlife. Made the tour both educational and enjoyable.',
    date: '2024-03-14T09:30:00Z',
    guideName: 'John Doe',
    visitorName: 'Sarah Johnson',
    parkName: 'Bako National Park',
    tourType: 'Wildlife Watching',
    duration: '4 hours',
    groupSize: 8
  },
  {
    id: 2,
    rating: 4,
    comment: 'Great experience, but could improve on timing management. Knowledge of local flora was impressive.',
    date: '2024-03-13T14:20:00Z',
    guideName: 'Amy Smith',
    visitorName: 'Michael Brown',
    parkName: 'Gunung Mulu National Park',
    tourType: 'Cave Exploration',
    duration: '6 hours',
    groupSize: 12
  },
  {
    id: 3,
    rating: 5,
    comment: 'Outstanding cultural interpretation! Made the history come alive. Highly recommended for cultural tours.',
    date: '2024-03-12T11:15:00Z',
    guideName: 'Mike Cheng',
    visitorName: 'Lisa Wong',
    parkName: 'Niah National Park',
    tourType: 'Cultural Heritage',
    duration: '3 hours',
    groupSize: 6
  },
  {
    id: 4,
    rating: 4,
    comment: 'Excellent photography tips and wildlife spotting skills. Great for photography enthusiasts.',
    date: '2024-03-11T16:45:00Z',
    guideName: 'Sarah Lee',
    visitorName: 'David Kim',
    parkName: 'Lambir Hills National Park',
    tourType: 'Photography Tour',
    duration: '5 hours',
    groupSize: 4
  },
  {
    id: 5,
    rating: 5,
    comment: 'Perfect combination of knowledge and enthusiasm. Made the rainforest exploration unforgettable.',
    date: '2024-03-10T10:30:00Z',
    guideName: 'Amy Smith',
    visitorName: 'Emma Wilson',
    parkName: 'Gunung Mulu National Park',
    tourType: 'Rainforest Exploration',
    duration: '8 hours',
    groupSize: 10
  },
  {
    id: 6,
    rating: 5,
    comment: 'Incredible orangutan tracking experience! Raj\'s knowledge of their behavior is unmatched.',
    date: '2024-03-13T07:30:00Z',
    guideName: 'Raj Kumar',
    visitorName: 'Thomas Wilson',
    parkName: 'Batang Ai National Park',
    tourType: 'Orangutan Tracking',
    duration: '6 hours',
    groupSize: 6
  },
  {
    id: 7,
    rating: 4,
    comment: 'Great marine life tour, especially the turtle conservation part. Maria is very passionate about her work.',
    date: '2024-03-12T14:15:00Z',
    guideName: 'Maria Fernandez',
    visitorName: 'Sophie Martin',
    parkName: 'Similajau National Park',
    tourType: 'Marine Life Tour',
    duration: '4 hours',
    groupSize: 8
  },
  {
    id: 8,
    rating: 5,
    comment: 'Amazing night walk! Ahmad spotted so many reptiles and explained their behaviors in detail.',
    date: '2024-03-11T20:30:00Z',
    guideName: 'Ahmad Ibrahim',
    visitorName: 'James Lee',
    parkName: 'Kubah National Park',
    tourType: 'Night Walk',
    duration: '3 hours',
    groupSize: 4
  },
  {
    id: 9,
    rating: 5,
    comment: 'Special event tour was fantastic! The guide made the cultural experience very authentic.',
    date: '2024-03-10T18:00:00Z',
    guideName: 'Mike Cheng',
    visitorName: 'Emma Davis',
    parkName: 'Niah National Park',
    tourType: 'Cultural Event',
    duration: '5 hours',
    groupSize: 15
  },
  {
    id: 10,
    rating: 4,
    comment: 'Photography workshop was very informative. Learned a lot about wildlife photography techniques.',
    date: '2024-03-09T09:00:00Z',
    guideName: 'Sarah Lee',
    visitorName: 'David Chen',
    parkName: 'Lambir Hills National Park',
    tourType: 'Photography Workshop',
    duration: '6 hours',
    groupSize: 6
  },
  {
    id: 11,
    rating: 5,
    comment: 'Incredible cave exploration experience! Li\'s expertise in cave systems and safety was impressive.',
    date: '2024-03-14T08:00:00Z',
    guideName: 'Li Wei',
    visitorName: 'Alex Thompson',
    parkName: 'Gunung Mulu National Park',
    tourType: 'Cave Exploration',
    duration: '8 hours',
    groupSize: 8,
    difficulty: 'Advanced',
    equipmentProvided: true,
    safetyRating: 5,
    educationalValue: 5
  },
  {
    id: 12,
    rating: 5,
    comment: 'Fascinating research tour! Learned so much about wildlife conservation and research methods.',
    date: '2024-03-13T10:30:00Z',
    guideName: 'Sophia Chen',
    visitorName: 'Emma Wilson',
    parkName: 'Bako National Park',
    tourType: 'Research Tour',
    duration: '6 hours',
    groupSize: 6,
    difficulty: 'Moderate',
    equipmentProvided: true,
    safetyRating: 5,
    educationalValue: 5
  },
  {
    id: 13,
    rating: 4,
    comment: 'Great adventure tour with excellent safety measures. The rope techniques demonstration was impressive.',
    date: '2024-03-12T09:00:00Z',
    guideName: 'Li Wei',
    visitorName: 'David Lee',
    parkName: 'Gunung Mulu National Park',
    tourType: 'Adventure Tour',
    duration: '7 hours',
    groupSize: 6,
    difficulty: 'Advanced',
    equipmentProvided: true,
    safetyRating: 5,
    educationalValue: 4
  },
  {
    id: 14,
    rating: 5,
    comment: 'Excellent conservation education program. Sophia made complex concepts easy to understand.',
    date: '2024-03-11T14:00:00Z',
    guideName: 'Sophia Chen',
    visitorName: 'Sarah Brown',
    parkName: 'Bako National Park',
    tourType: 'Conservation Education',
    duration: '4 hours',
    groupSize: 10,
    difficulty: 'Easy',
    equipmentProvided: false,
    safetyRating: 5,
    educationalValue: 5
  },
  {
    id: 15,
    rating: 5,
    comment: 'Night cave tour was unforgettable! The bioluminescent displays were amazing.',
    date: '2024-03-10T20:00:00Z',
    guideName: 'Li Wei',
    visitorName: 'Michael Chen',
    parkName: 'Gunung Mulu National Park',
    tourType: 'Night Cave Tour',
    duration: '3 hours',
    groupSize: 6,
    difficulty: 'Moderate',
    equipmentProvided: true,
    safetyRating: 5,
    educationalValue: 5
  }
];

// API configuration
const API_BASE_URL = 'http://your-api-url.com/api';

// Function to get user data
export const getUserData = async () => {
  try {
    // In production, use the actual API
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    }
    
    // In development, use mock data
    console.log('Using mock user data for development');
    return mockUserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Function to get review data
export const getReviewData = async () => {
  try {
    // In production, use the actual API
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.get(`${API_BASE_URL}/reviews`);
      return response.data;
    }
    
    // In development, use mock data
    console.log('Using mock review data for development');
    return mockReviewData;
  } catch (error) {
    console.error('Error fetching review data:', error);
    throw error;
  }
}; 