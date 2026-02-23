import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterTemplate = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
};
