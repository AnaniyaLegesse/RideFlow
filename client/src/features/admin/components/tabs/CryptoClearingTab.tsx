import { AdminDataTable } from '@/features/admin/components/AdminDataTable';
import { AdminSectionHeader } from '@/features/admin/components/AdminSectionHeader';
import type { PendingTx } from '@/features/admin/types';

const HEADERS = [
  'Tx Hash Signature',
  'Client ID',
  'Network Layer',
  'Crypto Balance',
  'Action Override',
] as const;

interface CryptoClearingTabProps {
  pendingTransactions: PendingTx[];
}

export const CryptoClearingTab = ({ pendingTransactions }: CryptoClearingTabProps) => (
  <div className="animate-in fade-in duration-150 space-y-6">
    <AdminSectionHeader title="ON-CHAIN AUDIT CLEARING" />

    <AdminDataTable headers={[...HEADERS]} headClassName="text-admin-table-head">
      {pendingTransactions.map((tx) => (
        <tr key={tx.txHash} className="border-b border-admin-border last:border-none">
          <td className="p-4 font-mono text-brand-primary font-bold select-all">
            {tx.txHash}
          </td>
          <td className="p-4">
            <div className="font-bold text-brand-ink">{tx.clientName}</div>
            <div className="text-admin-body-sm text-brand-muted">{tx.clientEmail}</div>
          </td>
          <td className="p-4 font-mono text-admin-body-sm text-brand-secondary">
            {tx.chain}
          </td>
          <td className="p-4 font-mono font-medium">
            {tx.amount} {tx.asset}
          </td>
          <td className="p-4">
            <span className="text-brand-success font-bold uppercase text-admin-body-sm tracking-wider">
              Awaiting Verification Matrix
            </span>
          </td>
        </tr>
      ))}
    </AdminDataTable>
  </div>
);
