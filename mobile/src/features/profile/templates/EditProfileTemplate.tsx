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
import { GenderPicker } from '../../auth/components/GenderPicker';

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
          <View className="">
            <Text className="text-content-secondary text-base font-medium mb-6 ml-1 uppercase tracking-tighter">Profile Details</Text>
            
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

            <GenderPicker control={control} errors={errors} />

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
