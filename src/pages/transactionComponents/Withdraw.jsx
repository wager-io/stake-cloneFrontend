import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import api from '../../utils/api';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

const Withdraw = () => {
  const { user } = useContext(AuthContext);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDepositHistory();
  }, [filterStatus]);

  const fetchDepositHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/ccpayment/withdraw/history');

      if (response.data.success) {
        setDeposits(response.data.data || []);
      } else {
        toast.error(response.data.message || 'Failed to load withdraw history');
      }
    } catch (error) {
      console.error('Error fetching withdraw history:', error);
      toast.error('Failed to load withdraw history');
    } finally {
      setLoading(false);
    }
  };

  // Filter deposits based on search term and status
  const filteredDeposits = deposits.filter(deposit =>
    (deposit.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     deposit.currency?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || deposit.status === filterStatus)
  );

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-l font-bold mb-6 text-gray-200">Deposit History</h1>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by ID or currency..."
            className="w-full p-2 border rounded bg-[#0d2636] border-[#1e3a4a] text-gray-200 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            className="w-full p-2 border rounded bg-[#0d2636] border-[#1e3a4a] text-gray-200"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Deposits Table */}
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading deposit history...</p>
        </div>
      ) : filteredDeposits.length === 0 ? (
        <div className="text-center py-10 bg-[#071824] rounded-lg border border-[#1e3a4a]">
          <p className="text-gray-400">No deposit records found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#071824] border border-[#1e3a4a] rounded-lg">
            <thead className="bg-[#0d2636]">
              <tr>
                <th className="py-3 px-4 text-left text-gray-300">Transaction / Date</th>
                <th className="py-3 px-4 text-left text-gray-300">Amount</th>
                <th className="py-3 px-4 text-left text-gray-300">Fee</th>
                <th className="py-3 px-4 text-left text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a4a]">
              {filteredDeposits.map((deposit, index) => (
                <tr key={deposit._id || index} className="hover:bg-[#0d2636]">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-blue-400 truncate max-w-xs">
                        {deposit.metadata?.depositData?.txId || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatDate(deposit.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-200">
                    <span className="font-medium">
                      {deposit.amount} {deposit.currency}
                    </span>
                    {deposit.amountUSD > 0 && (
                      <span className="block text-sm text-gray-400">
                        (${deposit.amountUSD.toFixed(2)} USD)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-200">
                    {deposit.metadata?.depositData?.serviceFee || '0'} {deposit.currency}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      deposit.status === 'completed' 
                        ? 'bg-green-900 text-green-300' 
                        : deposit.status === 'pending' || deposit.metadata?.depositData?.status === 'Processing'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {deposit.status === 'completed' 
                        ? 'Complete' 
                        : deposit.metadata?.depositData?.status === 'Processing'
                        ? 'Pending'
                        : deposit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
