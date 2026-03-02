import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../auth/store/authStore';
import { PageHeader } from '@/components/ui/page-header';
import { LinearGradient } from 'expo-linear-gradient';
import { useMyTransactions, useTopup } from '../hooks/useWallet';
import { Transaction } from '../types/wallet.types';

const { width } = Dimensions.get('window');

export const WalletTemplate = () => {
  const { user } = useAuthStore();
  const balance = user?.totalBalance || 0;
  
  const { data, isLoading } = useMyTransactions();
  const topupMutation = useTopup();

  const handleTopup = () => {
    Alert.prompt(
      'Top Up Balance',
      'Enter the amount you want to add to your wallet (EGP):',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Top Up',
          onPress: (amount: string | undefined) => {
            if (amount && !isNaN(Number(amount))) {
              topupMutation.mutate({ amount: Number(amount) });
            } else {
              Alert.alert('Invalid Amount', 'Please enter a valid number.');
            }
          },
        },
      ],
      'plain-text',
      '',
      'number-pad'
    );
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'TOPUP': return 'plus-circle';
      case 'PURCHASE': return 'shopping-bag';
      case 'REFUND': return 'refresh-ccw';
      case 'BONUS': return 'gift';
      default: return 'file-text';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'TOPUP': return '#10B981';
      case 'PURCHASE': return '#EF4444';
      case 'REFUND': return '#3B82F6';
      case 'BONUS': return '#F59E0B';
      default: return '#64748B';
    }
  };

  return (
    <View className="flex-1 bg-white">
      <PageHeader title="My Wallet" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6 pt-6">
          {/* Main Wallet Card */}
          <LinearGradient
            colors={['#192C56', '#253C72']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ 
              borderRadius: 30, 
              padding: 24, 
              width: '100%',
              height: 200,
              justifyContent: 'space-between',
              elevation: 8,
              shadowColor: '#192C56',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 15
            }}
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-blue-100 text-sm font-medium mb-1">Total Balance</Text>
                <Text className="text-white text-3xl font-bold">
                  {balance.toLocaleString()} EGP
                </Text>
              </View>
              <View className="bg-white/20 p-3 rounded-full">
                <Feather name="credit-card" size={24} color="white" />
              </View>
            </View>

            <View className="flex-row justify-between items-end">
              <View>
                <Text className="text-blue-200 text-xs mb-1">Card Holder</Text>
                <Text className="text-white text-base font-semibold uppercase">{user?.name || 'User'}</Text>
              </View>
              <View className="items-end">
                <Text className="text-blue-200 text-xs mb-1">Status</Text>
                <View className="bg-green-400 px-2 py-0.5 rounded-md">
                   <Text className="text-white text-[10px] font-bold">ACTIVE</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions */}
          <View className="flex-row justify-between mt-8">
            <TouchableOpacity 
              className="items-center flex-1"
              onPress={handleTopup}
              disabled={topupMutation.isPending}
            >
              <View className="bg-slate-50 w-14 h-14 rounded-2xl items-center justify-center border border-slate-100 mb-2">
                {topupMutation.isPending ? (
                  <ActivityIndicator size="small" color="#192C56" />
                ) : (
                  <Feather name="plus" size={24} color="#192C56" />
                )}
              </View>
              <Text className="text-slate-600 font-medium text-xs">Top Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center flex-1">
              <View className="bg-slate-50 w-14 h-14 rounded-2xl items-center justify-center border border-slate-100 mb-2">
                <Feather name="arrow-up-right" size={24} color="#192C56" />
              </View>
              <Text className="text-slate-600 font-medium text-xs">Withdraw</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center flex-1">
              <View className="bg-slate-50 w-14 h-14 rounded-2xl items-center justify-center border border-slate-100 mb-2">
                <Feather name="refresh-cw" size={24} color="#192C56" />
              </View>
              <Text className="text-slate-600 font-medium text-xs">Exchange</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center flex-1">
              <View className="bg-slate-50 w-14 h-14 rounded-2xl items-center justify-center border border-slate-100 mb-2">
                <Feather name="more-horizontal" size={24} color="#192C56" />
              </View>
              <Text className="text-slate-600 font-medium text-xs">More</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          <View className="mt-10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-800 text-lg font-bold">Recent Transactions</Text>
              <TouchableOpacity>
                <Text className="text-blue-600 font-medium">See all</Text>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View className="items-center justify-center py-10">
                <ActivityIndicator size="large" color="#192C56" />
              </View>
            ) : data?.transactions && data.transactions.length > 0 ? (
              <View className="space-y-4">
                {data.transactions.map((transaction: Transaction) => (
                  <View key={transaction._id} className="flex-row items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-3">
                    <View className="flex-row items-center">
                      <View 
                        className="w-10 h-10 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${getTransactionColor(transaction.type)}15` }}
                      >
                        <Feather 
                          name={getTransactionIcon(transaction.type) as any} 
                          size={18} 
                          color={getTransactionColor(transaction.type)} 
                        />
                      </View>
                      <View className="ml-3">
                        <Text className="text-slate-800 font-bold">{transaction.description || transaction.type.replace('_', ' ')}</Text>
                        <Text className="text-slate-400 text-xs">{new Date(transaction.createdAt).toLocaleDateString()}</Text>
                      </View>
                    </View>
                    <Text 
                      className="font-bold text-base"
                      style={{ color: transaction.type === 'TOPUP' || transaction.type === 'REFUND' || transaction.type === 'BONUS' ? '#10B981' : '#EF4444' }}
                    >
                      {transaction.type === 'TOPUP' || transaction.type === 'REFUND' || transaction.type === 'BONUS' ? '+' : '-'} {transaction.amount}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="items-center justify-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <View className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Feather name="file-text" size={32} color="#CBD5E1" />
                </View>
                <Text className="text-slate-400 font-medium">No transactions yet</Text>
                <Text className="text-slate-300 text-xs mt-1">Start shopping to see history</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
