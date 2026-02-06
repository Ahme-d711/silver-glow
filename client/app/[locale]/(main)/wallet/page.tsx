import { WalletTemplate } from "@/features/main/wallet/templates/WalletTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wallet | Silver Glow",
  description: "View your wallet balance and transaction history.",
};

export default function WalletPage() {
  return <WalletTemplate />;
}
