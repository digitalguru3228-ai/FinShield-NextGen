import React, {
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from '@xyflow/react';

import { CustomAccountNode } from './CustomAccountNode';
import { EntityDossierPanel } from './EntityDossierPanel';
import { useInvestigation } from '../../context/InvestigationContext';

import {
  GitFork,
  Filter,
  RefreshCw
} from 'lucide-react';

const nodeTypes = {
  accountNode: CustomAccountNode
};

export const NetworkGraph = () => {
  const { networkNodes, networkEdges } = useInvestigation();

  const [nodes, setNodes, onNodesChange] =
    useNodesState(networkNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(networkEdges);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [riskFilter, setRiskFilter] = useState('ALL');

  // Sync nodes whenever backend data changes
  useEffect(() => {
    setNodes(networkNodes);
  }, [networkNodes, setNodes]);

  // Sync edges whenever backend data changes
  useEffect(() => {
    setEdges(networkEdges);
  }, [networkEdges, setEdges]);

  // Filter high and critical risk accounts
  const filteredNodes = useMemo(() => {
    if (riskFilter === 'ALL') {
      return nodes;
    }

    if (riskFilter === 'HIGH_CRITICAL') {
      return nodes.filter(
        node =>
          node.data.riskLevel === 'Critical' ||
          node.data.riskLevel === 'High'
      );
    }

    return nodes;
  }, [nodes, riskFilter]);

  // Select account node
  const onNodeClick = useCallback((event, node) => {
    setSelectedEntity(node);
  }, []);

  // Close dossier when clicking graph background
  const onPaneClick = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  // Reset graph layout
  const handleResetLayout = () => {
    setNodes(networkNodes);
  };

  return (
    <div className="relative w-full h-[650px] lg:h-[720px] rounded-2xl border border-slate-800 bg-[#090e1a] overflow-hidden flex flex-col shadow-2xl">

      {/* Top Graph Controls Bar */}
      <div className="p-4 border-b border-slate-800 bg-[#0b1220]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-10">

        <div className="flex items-center gap-3">

          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <GitFork className="w-4 h-4" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Financial Entity Topology & Transaction Graph

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Interactive Graph
              </span>
            </h3>

            <p className="text-xs text-slate-400">
              Visualizing transaction relationships between connected accounts
            </p>
          </div>

        </div>

        {/* Filter and Actions */}
        <div className="flex items-center gap-2">

          <div className="flex items-center gap-1.5 text-xs bg-[#080d18] px-2.5 py-1.5 rounded-lg border border-slate-700">

            <Filter className="w-3.5 h-3.5 text-slate-400" />

            <span className="text-slate-400">
              Filter:
            </span>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="ALL">
                All Graph Nodes ({nodes.length})
              </option>

              <option value="HIGH_CRITICAL">
                High & Critical Entities Only
              </option>
            </select>

          </div>

          <button
            onClick={handleResetLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            title="Reset Graph Positions"
          >
            <RefreshCw className="w-3.5 h-3.5" />

            <span className="hidden sm:inline">
              Reset
            </span>
          </button>

        </div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 flex relative overflow-hidden">

        <div className="flex-1 w-full h-full">

          <ReactFlow
            nodes={filteredNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            maxZoom={1.8}
            defaultEdgeOptions={{
              type: 'smoothstep'
            }}
          >

            <Background
              color="#1e293b"
              gap={24}
              size={1}
              variant={BackgroundVariant.Dots}
            />

            <Controls className="!left-4 !bottom-4 !top-auto" />

            <MiniMap
              nodeColor={(node) => {
                if (node.data.riskLevel === 'Critical') {
                  return '#ef4444';
                }

                if (node.data.riskLevel === 'High') {
                  return '#f97316';
                }

                if (node.data.riskLevel === 'Medium') {
                  return '#eab308';
                }

                return '#10b981';
              }}
              maskColor="rgba(9, 14, 26, 0.85)"
              className="!right-4 !bottom-4 !rounded-lg !border !border-slate-800 !bg-[#0b1220]"
            />

          </ReactFlow>

        </div>

        {/* Selected Entity Dossier */}
        {selectedEntity && (
          <EntityDossierPanel
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
          />
        )}

      </div>

      {/* Legend Footer */}
      <div className="px-4 py-2.5 bg-[#0b1220] border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3 z-10">

        <div className="flex items-center gap-4">

          <span className="font-semibold text-slate-300">
            Legend:
          </span>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span>Critical Risk</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>High Risk</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span>Medium Risk</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Low Risk</span>
          </div>

        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span>
            Click any node to open entity dossier
          </span>
        </div>

      </div>

    </div>
  );
};