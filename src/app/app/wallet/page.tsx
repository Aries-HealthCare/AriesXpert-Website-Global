'use client';

import React, { useState } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import { WalletLedgerEntry } from '@/services/provider-api';
import {
  Wallet,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Filter,
  ShieldCheck,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const INITIAL_TRANSACTIONS: WalletLedgerEntry[] = [
  {
    id: 'tx_01',
    transactionId: 'TXN-2026-94821',
    type: 'CREDIT',
    category: 'VISIT_PAYOUT',
    amount: 720,
    balanceAfter: 14850,
    description: 'Home Visit Payout (60%) - Dr. Arvind Kulkarni (Session 4)',
    date: 'Today, 05:45 PM',
    status: 'SUCCESS',
  },
  {
    id: 'tx_02',
    transactionId: 'TXN-2026-94719',
    type: 'CREDIT',
    category: 'VISIT_PAYOUT',
    amount: 900,
    balanceAfter: 14130,
    description: 'Home Visit Payout (60%) - Mr. Anil Kapoor (Session 6)',
    date: 'Today, 12:30 PM',
    status: 'SUCCESS',
  },
  {
    id: 'tx_03',
    transactionId: 'TXN-2026-94602',
    type: 'CREDIT',
    category: 'VISIT_PAYOUT',
    amount: 720,
    balanceAfter: 13230,
    description: 'Home Visit Payout (60%) - Mrs. Meenakshi Rao (Session 3)',
    date: 'Today, 10:25 AM',
    status: 'SUCCESS',
  },
  {
    id: 'tx_04',
    transactionId: 'TXN-2026-93810',
    type: 'CREDIT',
    category: 'REFERRAL_BONUS',
    amount: 1000,
    balanceAfter: 12510,
    description: 'Physiotherapist Referral Bonus - Dr. Pooja Nair joined',
    date: 'Yesterday, 04:15 PM',
    status: 'SUCCESS',
  },
  {
    id: 'tx_05',
    transactionId: 'TXN-2026-92140',
    type: 'DEBIT',
    category: 'WITHDRAWAL',
    amount: 10000,
    balanceAfter: 11510,
    description: 'Instant Bank Payout to HDFC Bank A/c **7291 (IMPS)',
    date: '20 Aug 2026, 09:30 AM',
    status: 'SUCCESS',
  },
];

export default function ProviderWalletPage() {
  const { user, updateUserData } = useProviderAuth();
  const [transactions, setTransactions] = useState<WalletLedgerEntry[]>(INITIAL_TRANSACTIONS);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('5000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  const balance = user?.walletBalance || 14850;
  const totalEarned = user?.totalEarnings || 86400;

  const handleWithdrawal = () => {
    const num = Number(withdrawAmount);
    if (!num || num <= 0 || num > balance) {
      alert('Please enter a valid amount within your available balance.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const newBal = balance - num;
      const newTx: WalletLedgerEntry = {
        id: 'tx_' + Date.now(),
        transactionId: 'TXN-2026-' + Math.floor(10000 + Math.random() * 90000),
        type: 'DEBIT',
        category: 'WITHDRAWAL',
        amount: num,
        balanceAfter: newBal,
        description: `Instant Payout to HDFC Bank A/c **7291 (IMPS Ref: ${Math.floor(100000 + Math.random() * 900000)})`,
        date: 'Just Now',
        status: 'SUCCESS',
      };
      setTransactions([newTx, ...transactions]);
      updateUserData({ walletBalance: newBal });
      setIsProcessing(false);
      setWithdrawSuccess(`₹${num.toLocaleString('en-IN')} successfully transferred to your registered bank account!`);
      setTimeout(() => {
        setIsWithdrawModalOpen(false);
        setWithdrawSuccess('');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Clinical Wallet & Payouts</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time balance, instant IMPS withdrawals, and double-entry transaction ledger.
          </p>
        </div>

        <Button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>Withdraw to Bank Account</span>
        </Button>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border-2 border-primary/30 p-6 rounded-3xl shadow-sm relative overflow-hidden bg-gradient-to-br from-card to-primary/5">
          <span className="text-xs font-bold text-muted-foreground">Available for Withdrawal</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground mt-2">
            ₹{balance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Instant IMPS Settlement Enabled</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 p-6 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-muted-foreground">Total Lifetime Earnings</span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground mt-2">
            ₹{totalEarned.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-muted-foreground mt-2">
            Across 94 completed clinical visits
          </div>
        </div>

        <div className="bg-card border border-border/80 p-6 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-muted-foreground">Registered Payout Account</span>
          <div className="text-sm font-extrabold text-foreground mt-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span>HDFC Bank • A/c **7291</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-2 font-mono">
            IFSC: HDFC0000240 • UPI: rohan@okhdfc
          </div>
        </div>
      </div>

      {/* Transactions Passbook Ledger */}
      <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <h3 className="text-base font-extrabold text-foreground">Passbook Transaction Ledger</h3>
          <span className="text-xs text-muted-foreground font-mono">{transactions.length} Transactions</span>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => {
            const isCredit = tx.type === 'CREDIT';
            return (
              <div
                key={tx.id}
                className="p-4 rounded-2xl border border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCredit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {isCredit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{tx.description}</div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono mt-1">
                      <span>{tx.transactionId}</span>
                      <span>•</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div
                    className={`text-base font-mono font-extrabold ${
                      isCredit ? 'text-emerald-500' : 'text-foreground'
                    }`}
                  >
                    {isCredit ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Bal: ₹{tx.balanceAfter.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="text-base font-extrabold text-foreground">Instant Bank Withdrawal</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-muted-foreground hover:text-foreground font-bold"
              >
                ✕
              </button>
            </div>

            {withdrawSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{withdrawSuccess}</span>
              </div>
            )}

            <div className="p-4 bg-muted/40 rounded-2xl space-y-1 text-xs">
              <div className="text-muted-foreground">Available Balance: <strong className="text-foreground font-mono">₹{balance.toLocaleString('en-IN')}</strong></div>
              <div className="text-muted-foreground">Disbursing To: <strong className="text-foreground">HDFC Bank (A/c **7291)</strong></div>
            </div>

            <div>
              <label className="text-xs font-bold">Withdrawal Amount (₹)</label>
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="text-xl font-mono font-bold h-12 mt-1 rounded-xl"
              />
            </div>

            <Button
              onClick={handleWithdrawal}
              disabled={isProcessing}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm & Disburse Instant IMPS'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
