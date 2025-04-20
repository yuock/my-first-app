// my-first-app/Data/admins.ts

// Park Administration Dataset
export const admins = [
  {
    id: 'a001',
    fullName: 'Admin One',
    username: 'admin1',
    password: 'admin123',
    email: 'admin1@sfc.gov.my',
    role: 'admin',
    permissions: [
      'manage_users',
      'manage_certifications',
      'manage_trainings',
      'view_reports',
      'manage_parks'
    ],
    assignedParks: ['Bako National Park', 'Gunung Mulu National Park'],
    lastLogin: '2024-04-10',
    status: 'active',
    notifications: [
      'New guide registration pending approval',
      'Certification renewal requests: 3'
    ],
    activityLog: [
      {
        action: 'approved_certification',
        details: 'Approved Advanced Wildlife Handling certification for John Doe',
        timestamp: '2024-04-10T09:30:00'
      },
      {
        action: 'created_training',
        details: 'Created new training module: Emergency Response Procedures',
        timestamp: '2024-04-09T14:15:00'
      }
    ]
  },
  {
    id: 'a002',
    fullName: 'Admin Two',
    username: 'admin2',
    password: 'admin456',
    email: 'admin2@sfc.gov.my',
    role: 'admin',
    permissions: [
      'manage_users',
      'manage_certifications',
      'view_reports',
      'manage_parks'
    ],
    assignedParks: ['Niah National Park', 'Lambir Hills National Park'],
    lastLogin: '2024-04-11',
    status: 'active',
    notifications: [
      'Training completion reports ready for review',
      'New visitor feedback received'
    ],
    activityLog: [
      {
        action: 'updated_park_info',
        details: 'Updated trail information for Niah National Park',
        timestamp: '2024-04-11T11:20:00'
      },
      {
        action: 'assigned_training',
        details: 'Assigned Emergency Procedures training to Amy Smith',
        timestamp: '2024-04-10T16:45:00'
      }
    ]
  },
  {
    id: 'a003',
    fullName: 'System Manager',
    username: 'sysadmin',
    password: 'sysadmin789',
    email: 'sysadmin@sfc.gov.my',
    role: 'system_manager',
    permissions: [
      'manage_users',
      'manage_certifications',
      'manage_trainings',
      'view_reports',
      'manage_parks',
      'system_configuration',
      'manage_permissions'
    ],
    assignedParks: ['All Parks'],
    lastLogin: '2024-04-12',
    status: 'active',
    notifications: [
      'System maintenance scheduled for next week',
      'New security patch available'
    ],
    activityLog: [
      {
        action: 'system_update',
        details: 'Applied security patch v2.1.0',
        timestamp: '2024-04-12T10:00:00'
      },
      {
        action: 'permission_update',
        details: 'Updated admin permissions for Admin Two',
        timestamp: '2024-04-11T15:30:00'
      }
    ]
  }
];
  