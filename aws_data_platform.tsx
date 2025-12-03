import React, { useState } from 'react';
import { Database, Layers, Shield, Activity, GitBranch, Gauge, Lock, Globe } from 'lucide-react';

const DataPlatformArchitecture = () => {
  const [selectedLayer, setSelectedLayer] = useState(null);

  const layers = [
    {
      id: 'ingestion',
      name: 'Data Ingestion Layer',
      icon: Database,
      color: 'bg-blue-500',
      services: [
        { name: 'AWS DMS', purpose: 'Database replication (CDC)', scale: 'Auto-scaling tasks' },
        { name: 'AWS Kinesis Data Streams', purpose: 'Real-time streaming', scale: 'Shard-based scaling' },
        { name: 'AWS AppFlow', purpose: 'SaaS data ingestion', scale: 'Managed service' },
        { name: 'AWS Transfer Family', purpose: 'SFTP/FTP ingestion', scale: 'HA endpoints' },
        { name: 'EventBridge', purpose: 'Event-driven ingestion', scale: 'Serverless' }
      ],
      monitoring: ['CloudWatch Metrics', 'Data quality checks', 'Ingestion lag monitoring']
    },
    {
      id: 'storage',
      name: 'Storage Layer',
      icon: Layers,
      color: 'bg-green-500',
      services: [
        { name: 'S3 (Data Lake)', purpose: 'Raw/Bronze layer', scale: 'Unlimited, lifecycle policies' },
        { name: 'S3 Intelligent-Tiering', purpose: 'Silver/Gold layers', scale: 'Cost optimization' },
        { name: 'S3 Versioning', purpose: 'Data history', scale: 'Compliance & rollback' }
      ],
      structure: [
        's3://lake/raw/ - Landing zone',
        's3://lake/processed/ - Cleaned data',
        's3://lake/curated/ - Business-ready',
        's3://lake/archive/ - Cold storage'
      ],
      monitoring: ['S3 Storage Lens', 'Cost anomaly detection', 'Access patterns']
    },
    {
      id: 'processing',
      name: 'Processing & Transformation',
      icon: Activity,
      color: 'bg-purple-500',
      services: [
        { name: 'AWS Glue ETL', purpose: 'Batch processing', scale: 'DPU auto-scaling' },
        { name: 'AWS EMR Serverless', purpose: 'Spark jobs at scale', scale: 'Workers auto-scale' },
        { name: 'Kinesis Data Analytics', purpose: 'Streaming SQL', scale: 'KPU-based' },
        { name: 'Step Functions', purpose: 'Orchestration', scale: 'Serverless workflow' },
        { name: 'Lambda', purpose: 'Light transformations', scale: 'Concurrent executions' }
      ],
      patterns: [
        'Medallion Architecture (Bronze→Silver→Gold)',
        'Incremental processing with bookmarks',
        'Data quality validation gates'
      ],
      monitoring: ['Glue job metrics', 'EMR cluster health', 'Data quality scores']
    },
    {
      id: 'governance',
      name: 'Governance & Catalog',
      icon: Shield,
      color: 'bg-yellow-500',
      services: [
        { name: 'AWS Lake Formation', purpose: 'Fine-grained access control', scale: 'Centralized permissions' },
        { name: 'AWS Glue Data Catalog', purpose: 'Metadata repository', scale: 'Millions of objects' },
        { name: 'Amazon DataZone', purpose: 'Data discovery & lineage', scale: 'Business catalog' },
        { name: 'AWS IAM', purpose: 'Identity management', scale: 'Role-based access' },
        { name: 'Macie', purpose: 'PII detection', scale: 'ML-powered scanning' }
      ],
      features: [
        'Column-level security',
        'Data lineage tracking',
        'Business glossary',
        'Compliance tagging'
      ],
      monitoring: ['Access audit logs', 'Policy compliance', 'Data classification status']
    },
    {
      id: 'consumption',
      name: 'Analytics & Consumption',
      icon: Gauge,
      color: 'bg-red-500',
      services: [
        { name: 'Amazon Athena', purpose: 'Serverless SQL', scale: 'Pay per query' },
        { name: 'Amazon Redshift Serverless', purpose: 'Data warehouse', scale: 'RPU auto-scaling' },
        { name: 'QuickSight', purpose: 'BI & dashboards', scale: 'SPICE engine' },
        { name: 'SageMaker', purpose: 'ML workloads', scale: 'Training/inference instances' },
        { name: 'OpenSearch', purpose: 'Search & analytics', scale: 'Cluster scaling' }
      ],
      optimization: [
        'Partition pruning strategies',
        'Columnar formats (Parquet, Iceberg)',
        'Materialized views in Redshift'
      ],
      monitoring: ['Query performance', 'Cost per query', 'Concurrent users']
    },
    {
      id: 'observability',
      name: 'Observability & Operations',
      icon: Activity,
      color: 'bg-indigo-500',
      services: [
        { name: 'CloudWatch', purpose: 'Metrics & logs', scale: 'Centralized monitoring' },
        { name: 'CloudTrail', purpose: 'Audit logs', scale: 'All API calls' },
        { name: 'X-Ray', purpose: 'Distributed tracing', scale: 'End-to-end visibility' },
        { name: 'AWS Cost Explorer', purpose: 'Cost analysis', scale: 'Granular tracking' },
        { name: 'Systems Manager', purpose: 'Operational dashboards', scale: 'OpsCenter integration' }
      ],
      dashboards: [
        'Pipeline health dashboard',
        'Data quality metrics',
        'Cost per dataset',
        'SLA compliance tracking'
      ],
      monitoring: ['Alert routing', 'Automated remediation', 'Incident management']
    },
    {
      id: 'cicd',
      name: 'CI/CD & IaC',
      icon: GitBranch,
      color: 'bg-cyan-500',
      services: [
        { name: 'AWS CodePipeline', purpose: 'CI/CD automation', scale: 'Multi-environment' },
        { name: 'Terraform/CDK', purpose: 'Infrastructure as Code', scale: 'Version controlled' },
        { name: 'CodeBuild', purpose: 'Build & test', scale: 'Parallel builds' },
        { name: 'CodeCommit/GitHub', purpose: 'Source control', scale: 'Git workflows' }
      ],
      practices: [
        'Environment parity (dev/staging/prod)',
        'Blue-green deployments',
        'Automated testing pipelines',
        'GitOps workflows'
      ],
      monitoring: ['Deployment success rate', 'Rollback metrics', 'Build times']
    },
    {
      id: 'security',
      name: 'Security Layer',
      icon: Lock,
      color: 'bg-gray-700',
      services: [
        { name: 'AWS KMS', purpose: 'Encryption key management', scale: 'Centralized keys' },
        { name: 'Secrets Manager', purpose: 'Credential rotation', scale: 'Auto-rotation' },
        { name: 'WAF', purpose: 'API protection', scale: 'Rate limiting' },
        { name: 'GuardDuty', purpose: 'Threat detection', scale: 'ML-based' },
        { name: 'VPC', purpose: 'Network isolation', scale: 'Private subnets' }
      ],
      features: [
        'Encryption at rest & transit',
        'Private endpoints (PrivateLink)',
        'Network segmentation',
        'Zero-trust architecture'
      ],
      monitoring: ['Security findings', 'Unauthorized access attempts', 'Encryption status']
    }
  ];

  const additionalConsiderations = {
    dataQuality: [
      'AWS Glue Data Quality - automated rules',
      'Great Expectations integration',
      'Data validation checkpoints',
      'Anomaly detection with SageMaker'
    ],
    costOptimization: [
      'S3 Intelligent-Tiering for storage',
      'Spot instances for EMR',
      'Reserved capacity for Redshift',
      'Query result caching in Athena',
      'Compression (Snappy, ZSTD)'
    ],
    scalability: [
      'Horizontal scaling with partitioning',
      'Auto-scaling for compute resources',
      'Serverless-first approach',
      'Async processing patterns',
      'Event-driven architecture'
    ],
    reliability: [
      'Multi-AZ deployments',
      'Cross-region replication for critical data',
      'Automated backups',
      'Disaster recovery runbooks',
      'Chaos engineering practices'
    ]
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Production AWS Data Platform Architecture
          </h1>
          <p className="text-slate-400">Scalable, Observable, and Production-Ready</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                className={`${layer.color} bg-opacity-20 border-2 ${layer.color.replace('bg-', 'border-')} rounded-lg p-4 cursor-pointer hover:bg-opacity-30 transition-all ${
                  selectedLayer === layer.id ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''
                }`}
              >
                <Icon className="w-8 h-8 mb-2" />
                <h3 className="font-bold text-lg">{layer.name}</h3>
              </div>
            );
          })}
        </div>

        {selectedLayer && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
            {layers
              .filter((l) => l.id === selectedLayer)
              .map((layer) => (
                <div key={layer.id}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    {React.createElement(layer.icon, { className: 'w-6 h-6' })}
                    {layer.name}
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Core Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {layer.services.map((service, idx) => (
                        <div key={idx} className="bg-slate-700 rounded p-4">
                          <h4 className="font-bold text-green-400 mb-1">{service.name}</h4>
                          <p className="text-sm text-slate-300 mb-2">{service.purpose}</p>
                          <p className="text-xs text-slate-400">
                            <span className="font-semibold">Scale:</span> {service.scale}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {layer.structure && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Structure</h3>
                      <div className="bg-slate-700 rounded p-4">
                        {layer.structure.map((item, idx) => (
                          <div key={idx} className="font-mono text-sm text-slate-300 mb-1">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {layer.patterns && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-yellow-400">Design Patterns</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {layer.patterns.map((pattern, idx) => (
                          <li key={idx}>{pattern}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {layer.features && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-green-400">Key Features</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {layer.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {layer.optimization && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-orange-400">Optimization</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {layer.optimization.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {layer.dashboards && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-cyan-400">Dashboards</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {layer.dashboards.map((dash, idx) => (
                          <li key={idx}>{dash}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {layer.practices && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-pink-400">Best Practices</h3>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {layer.practices.map((practice, idx) => (
                          <li key={idx}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-red-400">Monitoring & Alerts</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {layer.monitoring.map((mon, idx) => (
                        <li key={idx}>{mon}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-green-400">Data Quality</h3>
            <ul className="space-y-2 text-slate-300">
              {additionalConsiderations.dataQuality.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Cost Optimization</h3>
            <ul className="space-y-2 text-slate-300">
              {additionalConsiderations.costOptimization.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-yellow-400 mr-2">$</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Scalability</h3>
            <ul className="space-y-2 text-slate-300">
              {additionalConsiderations.scalability.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-400 mr-2">↗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Reliability</h3>
            <ul className="space-y-2 text-slate-300">
              {additionalConsiderations.reliability.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-purple-400 mr-2">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700">
          <h3 className="text-xl font-bold mb-4">Implementation Roadmap</h3>
          <div className="space-y-3 text-slate-200">
            <div><strong className="text-blue-300">Phase 1 (Months 1-2):</strong> Foundation - S3 data lake, Glue Catalog, IAM, basic monitoring</div>
            <div><strong className="text-blue-300">Phase 2 (Months 3-4):</strong> Ingestion - DMS, Kinesis, AppFlow integration</div>
            <div><strong className="text-blue-300">Phase 3 (Months 5-6):</strong> Processing - Glue ETL, Step Functions orchestration</div>
            <div><strong className="text-blue-300">Phase 4 (Months 7-8):</strong> Governance - Lake Formation, DataZone, data quality</div>
            <div><strong className="text-blue-300">Phase 5 (Months 9-10):</strong> Analytics - Athena, Redshift Serverless, QuickSight</div>
            <div><strong className="text-blue-300">Phase 6 (Ongoing):</strong> Optimization - Cost controls, performance tuning, scaling</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPlatformArchitecture;