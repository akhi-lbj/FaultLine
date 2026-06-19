import React, { useState } from 'react';
import { Layers, Plus, Trash2, ArrowUpRight, Search, TrendingUp, AlertTriangle } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (name: string, budget: number, status: any) => void;
  onUpdateStatus: (id: string, status: any) => void;
  activeItemId: string | undefined;
}

export default function PortfolioGrid({ items, onSelectItem, onDeleteItem, onAddItem, onUpdateStatus, activeItemId }: PortfolioGridProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBudget, setNewBudget] = useState(150000);
  const [newStatus, setNewStatus] = useState<'InDiscovery' | 'Reviewing' | 'Committed'>('InDiscovery');
  const [search, setSearch] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddItem(newName, newBudget, newStatus);
    setNewName("");
    setNewBudget(150000);
    setShowAddModal(false);
  };

  // Compute portfolio statistics
  const totalBudget = items.reduce((acc, curr) => acc + (curr.budget || 0), 0);
  const totalExpectedLoss = items.reduce((acc, curr) => acc + (curr.expectedLoss || 0), 0);
  const committedCount = items.filter(x => x.status === 'Committed' || x.status === 'Launched_Success').length;
  const haltedCount = items.filter(x => x.status === 'Halted' || x.status === 'Launched_Failure').length;

  const filteredItems = items.filter(x => 
    x.featureName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Portfolio Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Portfolio Allotment</span>
          <div className="text-xl font-bold font-mono text-zinc-100">${totalBudget.toLocaleString()}</div>
          <p className="text-[10px] text-zinc-500">Tracked discovery capital</p>
        </div>

        {/* Aggregate Expected Loss */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Aggregate Risk Value</span>
          <div className="text-xl font-bold font-mono text-red-400">${totalExpectedLoss.toLocaleString()}</div>
          <p className="text-[10px] text-zinc-500">Capital actively at risk</p>
        </div>

        {/* Committed Bills */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Validated / Committed</span>
          <div className="text-xl font-bold font-mono text-emerald-400">{committedCount} Initiatives</div>
          <p className="text-[10px] text-zinc-500">Approved for core sprints</p>
        </div>

        {/* Halted Bills */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 block">Halted / Terminated</span>
          <div className="text-xl font-bold font-mono text-red-400">{haltedCount} Initiatives</div>
          <p className="text-[10px] text-zinc-500">Avoided engineering debt</p>
        </div>
      </div>

      {/* Primary Table Interface */}
      <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-zinc-200">Portfolio Discovery Explorer</h4>
            <p className="text-xs text-zinc-500 leading-none">Evaluate roadmaps, FFS indices, and risk liability.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input 
                type="text"
                placeholder="Find feature..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-1.5 w-48 text-xs bg-zinc-900 text-zinc-200 rounded-lg border border-zinc-800 focus:outline-none focus:border-zinc-700 font-mono"
              />
            </div>

            <button
              onClick={() => setShowAddModal(prev => !prev)}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Initiative
            </button>
          </div>
        </div>

        {showAddModal && (
          <form onSubmit={handleCreate} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-fade-in">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono text-zinc-500 block">Feature Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Enterprise Invoice PDF Generator"
                value={newName} 
                onChange={e => setNewName(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-sans focus:outline-none focus:border-zinc-700"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono text-zinc-500 block">Allocation Budget ($)</label>
              <input 
                type="number" 
                required
                min="5000"
                value={newBudget} 
                onChange={e => setNewBudget(parseInt(e.target.value))}
                className="w-full bg-zinc-950 text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono text-zinc-500 block">Discovery Status</label>
              <select 
                value={newStatus} 
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full bg-zinc-950 text-zinc-200 border border-zinc-800 rounded px-2.5 py-1.5 text-xs font-sans focus:outline-none focus:border-zinc-700"
              >
                <option value="InDiscovery">In Discovery</option>
                <option value="Reviewing">Under Review</option>
                <option value="Committed">Committed Build</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded cursor-pointer transition-colors"
              >
                Record Item
              </button>
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 bg-zinc-800 text-zinc-400 hover:text-zinc-300 text-xs rounded cursor-pointer transition-colors border border-zinc-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                <th className="py-3 px-2">Initiative Name</th>
                <th className="py-3 px-2 text-center">FFS Score</th>
                <th className="py-3 px-2 text-center">IQS Score</th>
                <th className="py-3 px-2 text-center">P_Fail Calibration</th>
                <th className="py-3 px-2 text-right">Engineering Budget</th>
                <th className="py-3 px-2 text-right">Expected Loss</th>
                <th className="py-3 px-2 text-center">Verdict</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 text-sm font-sans">
              {filteredItems.map((item) => {
                const isActive = activeItemId?.toLowerCase().includes((item.featureName || '').toLowerCase()) || 
                  (activeItemId === item.id);

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-zinc-900/20 group transition-colors ${
                      isActive ? 'bg-blue-950/10' : ''
                    }`}
                  >
                    <td className="py-3.5 px-2 font-medium text-zinc-200">
                      <div>
                        {item.featureName}
                        {isActive && (
                          <span className="ml-2 px-1.5 py-0.5 text-[8px] font-mono rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase font-semibold">
                            Loaded Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-center font-mono font-semibold text-red-400">{item.ffsRaw}</td>
                    <td className="py-3.5 px-2 text-center font-mono font-semibold text-purple-400">{item.iqsRaw}</td>
                    <td className="py-3.5 px-2 text-center font-mono font-semibold text-zinc-100">
                      {Math.round(item.pFail * 100)}%
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono text-zinc-400">${item.budget.toLocaleString()}</td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-red-400">${item.expectedLoss.toLocaleString()}</td>
                    
                    <td className="py-3.5 px-2 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-semibold uppercase rounded-full ${
                        item.recommendation === 'VALIDATED_BUILD' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : item.recommendation === 'PILOT_RECOMMENDED'
                            ? 'bg-blue-500/10 text-blue-400'
                            : item.recommendation === 'CONDITIONAL_REVIEW' 
                              ? 'bg-amber-500/10 text-amber-400' 
                              : 'bg-red-500/10 text-red-400'
                      }`}>
                        {item.recommendation.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-2 text-center">
                      <select 
                        value={item.status}
                        onChange={(e) => {
                          onUpdateStatus(item.id, e.target.value);
                        }}
                        className="bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-300 rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
                      >
                        <option value="InDiscovery">In Discovery</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Committed">Committed</option>
                        <option value="Halted">Halted</option>
                        <option value="Launched_Success">Launched (Success)</option>
                        <option value="Launched_Failure">Launched (Failure)</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="flex items-center gap-0.5 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono rounded cursor-pointer border border-zinc-700"
                        >
                          <ArrowUpRight className="w-3 h-3" />
                          Load Source
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1 hover:text-red-400 text-zinc-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
