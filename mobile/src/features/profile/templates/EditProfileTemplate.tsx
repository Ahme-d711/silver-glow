import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../auth/store/authStore';
import { useUpdateProfileMutation } from '../../auth/hooks/useAuth';
import { updateProfileSchema, UpdateProfileFormData } from '../../auth/schemas/updateProfileSchema';
import { getImageUrl } from '../../../utils/image.utils';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EditProfileImagePicker } from '../components/EditProfileImagePicker';

export const EditProfileTemplate = () => {
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  
  const [imageUri, setImageUri] = useState<string | null>(user?.picture ? (getImageUrl(user.picture) as string) : null);
  const [newImagePick, setNewImagePick] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      gender: user?.gender || undefined,
      address: user?.address || '',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setNewImagePick(asset);
    }
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    if (newImagePick) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const filename = newImagePick.uri.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('picture', {
        uri: newImagePick.uri,
        name: filename,
        type,
      } as any);
      
      updateProfile(formData);
    } else {
      updateProfile(data);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <PageHeader title="Edit Profile" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <EditProfileImagePicker imageUri={imageUri} onPickImage={pickImage} />

        {/* Form Section */}
        <View className="px-6">
          <View className="bg-white rounded-[32px] p-6 shadow-2xl shadow-slate-200 border border-slate-50">
            <Text className="text-slate-400 text-sm font-bold mb-6 ml-1 uppercase tracking-tighter">Profile Details</Text>
            
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input 
                  placeholder="Full Name"
                  leftIcon="person-outline"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input 
                  placeholder="Phone Number"
                  leftIcon="call-outline"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input 
                  placeholder="Address"
                  leftIcon="map-outline"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.message}
                />
              )}
            />

            <View className="mb-6">
              <Text className="text-slate-500 text-sm font-medium mb-3 ml-1">Gender</Text>
              <View className="flex-row gap-4">
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => onChange('male')}
                        activeOpacity={0.7}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 56,
                          borderRadius: 20,
                          borderWidth: 1.5,
                          backgroundColor: value === 'male' ? '#F8FAFC' : '#FFFFFF',
                          borderColor: value === 'male' ? '#192C56' : '#F1F5F9',
                        }}
                      >
                        <Ionicons 
                          name="person-outline" 
                          size={20} 
                          color={value === 'male' ? '#192C56' : '#94a3b8'} 
                          style={{ marginRight: 8 }}
                        />
                        <Text className={`font-bold ${value === 'male' ? 'text-primary' : 'text-slate-400'}`}>
                          Male
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => onChange('female')}
                        activeOpacity={0.7}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 56,
                          borderRadius: 20,
                          borderWidth: 1.5,
                          backgroundColor: value === 'female' ? '#F8FAFC' : '#FFFFFF',
                          borderColor: value === 'female' ? '#192C56' : '#F1F5F9',
                        }}
                      >
                        <Ionicons 
                          name="woman-outline" 
                          size={20} 
                          color={value === 'female' ? '#192C56' : '#94a3b8'} 
                          style={{ marginRight: 8 }}
                        />
                        <Text className={`font-bold ${value === 'female' ? 'text-primary' : 'text-slate-400'}`}>
                          Female
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                />
              </View>
              {errors.gender && (
                <Text className="text-red-500 text-xs mt-2 ml-1">{errors.gender.message}</Text>
              )}
            </View>

            <Button 
              title="Save Changes"
              onPress={handleSubmit(onSubmit)}
              className="mt-4 bg-primary rounded-2xl h-14"
              textClassName="text-white font-bold text-lg"
              loading={isPending}
              disabled={isPending}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
