import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { users } from '../../Data/users';

export default function UserDashboard() {
  const { params } = useRoute();
  const user = users.find((u) => u.id === params?.userId);

  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Text>Certifications:</Text>
      {user?.certifications?.map((c, idx) => (
        <Text key={idx}>• {c}</Text>
      ))}
    </View>
  );
}
