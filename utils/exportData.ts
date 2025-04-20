import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getUserData, getReviewData, mockUserData, mockReviewData } from './database';
import * as XLSX from 'xlsx';
import { Platform } from 'react-native';
import { users, reviews } from './database';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatPerformance = (metrics: any) => {
  if (!metrics) return 'N/A';
  return Object.entries(metrics)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
};

interface ExportOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  park?: string;
  status?: string;
  minRating?: number;
  tourType?: string;
  difficulty?: string;
  equipmentRequired?: boolean;
}

const EXPORTS_DIR = 'exports';

// Function to ensure exports directory exists
const ensureExportsDir = async () => {
  const dirUri = `${FileSystem.documentDirectory}${EXPORTS_DIR}`;
  const dirInfo = await FileSystem.getInfoAsync(dirUri);
  
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
    console.log('Created exports directory');
  }
  
  return dirUri;
};

// Function to save file to exports directory
const saveToExportsDir = async (filename: string, excelBuffer: string) => {
  const targetDir = await ensureExportsDir();
  const targetUri = `${targetDir}/${filename}`;
  
  // Save the file
  await FileSystem.writeAsStringAsync(targetUri, excelBuffer, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  console.log(`Saved ${filename} to exports directory`);
  return targetUri;
};

// Function to list files in exports directory
export const listExportedFiles = async () => {
  const dirUri = await ensureExportsDir();
  const files = await FileSystem.readDirectoryAsync(dirUri);
  return files.filter(file => file.endsWith('.xlsx'));
};

export const exportToExcel = async (type: 'users' | 'reviews'): Promise<void> => {
  try {
    // Create workbook
    const wb = XLSX.utils.book_new();

    if (type === 'users') {
      // Create users sheet
      const usersData = users.map(user => ({
        'ID': user.id,
        'Full Name': user.fullName,
        'Email': user.email,
        'Role': user.role,
        'Assigned Park': user.assignedPark,
        'Certifications': user.certifications.join(', '),
        'Training Completed': user.trainingCompleted ? 'Yes' : 'No',
        'Certification Status': user.certificationStatus,
        'Status': user.status,
        'Last Login': user.lastLogin,
        'Performance Rating': user.performance.rating,
        'Performance Comments': user.performance.comments.join(', '),
        'Notifications': user.notifications.join(', ')
      }));

      const ws = XLSX.utils.json_to_sheet(usersData);
      XLSX.utils.book_append_sheet(wb, ws, 'Users');

      // Create summary sheet
      const summaryData = [
        ['Total Users', users.length],
        ['Active Users', users.filter(u => u.status === 'active').length],
        ['Certified Guides', users.filter(u => u.certificationStatus === 'certified').length],
        ['Training Completed', users.filter(u => u.trainingCompleted).length]
      ];

      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    } else {
      // Create reviews sheet
      const reviewsData = reviews.map(review => ({
        'ID': review.id,
        'Guide ID': review.guideId,
        'Tour Type': review.tourType,
        'Rating': review.rating,
        'Comment': review.comment,
        'Date': review.date,
        'Difficulty': review.difficulty,
        'Equipment Provided': review.equipmentProvided ? 'Yes' : 'No',
        'Safety Rating': review.safetyRating,
        'Educational Value': review.educationalValue,
        'Group Size': review.groupSize
      }));

      const ws = XLSX.utils.json_to_sheet(reviewsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Reviews');

      // Create summary sheet
      const summaryData = [
        ['Total Reviews', reviews.length],
        ['Average Rating', (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2)],
        ['Average Safety Rating', (reviews.reduce((acc, r) => acc + r.safetyRating, 0) / reviews.length).toFixed(2)],
        ['Average Educational Value', (reviews.reduce((acc, r) => acc + r.educationalValue, 0) / reviews.length).toFixed(2)]
      ];

      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    }

    // Generate file name with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${type}_export_${timestamp}.xlsx`;

    // Convert workbook to binary string
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create blob and download link
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Failed to create export file');
  }
}; 