import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  Brain, 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Database,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface StudyData {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'draft';
  participants: number;
  startDate: string;
  endDate?: string;
  category: 'effects' | 'dosage' | 'terpenes' | 'cannabinoids' | 'consumption';
  results?: {
    totalResponses: number;
    averageRating: number;
    topEffects: string[];
    insights: string[];
  };
}

interface AnalyticsData {
  totalStudies: number;
  activeParticipants: number;
  completedSurveys: number;
  dataPoints: number;
  effectsReported: { [key: string]: number };
  cannabinoidCorrelations: { [key: string]: number };
  terpenePreferences: { [key: string]: number };
  consumptionPatterns: { [key: string]: number };
}

const ScientificStudies: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studies, setStudies] = useState<StudyData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStudies([
        {
          id: 'study-1',
          title: 'Cannabis Effects on Sleep Quality',
          description: 'Studying the correlation between CBN content and sleep improvement',
          status: 'active',
          participants: 156,
          startDate: '2024-01-15',
          category: 'effects',
          results: {
            totalResponses: 89,
            averageRating: 4.2,
            topEffects: ['Sleepy', 'Relaxed', 'Calm'],
            insights: ['CBN levels above 3% show 85% sleep improvement', 'Myrcene terpene enhances sedative effects']
          }
        },
        {
          id: 'study-2',
          title: 'Terpene Profile Preferences by Demographics',
          description: 'Analyzing terpene preferences across different age groups and consumption patterns',
          status: 'active',
          participants: 203,
          startDate: '2024-02-01',
          category: 'terpenes',
          results: {
            totalResponses: 145,
            averageRating: 4.5,
            topEffects: ['Uplifted', 'Focused', 'Creative'],
            insights: ['Limonene preferred by 65% of users under 35', 'Pinene shows correlation with focus enhancement']
          }
        },
        {
          id: 'study-3',
          title: 'Microdosing Effectiveness Study',
          description: 'Evaluating the therapeutic benefits of low-dose cannabis consumption',
          status: 'completed',
          participants: 89,
          startDate: '2023-11-01',
          endDate: '2024-01-31',
          category: 'dosage',
          results: {
            totalResponses: 89,
            averageRating: 4.7,
            topEffects: ['Focused', 'Calm', 'Clear'],
            insights: ['2.5mg THC optimal for productivity', '78% report improved mood without impairment']
          }
        }
      ]);

      setAnalytics({
        totalStudies: 12,
        activeParticipants: 567,
        completedSurveys: 1234,
        dataPoints: 15678,
        effectsReported: {
          'Relaxed': 456,
          'Happy': 389,
          'Sleepy': 234,
          'Focused': 198,
          'Creative': 167,
          'Euphoric': 145,
          'Uplifted': 123,
          'Calm': 98
        },
        cannabinoidCorrelations: {
          'THC + CBD': 0.85,
          'CBN + Myrcene': 0.78,
          'CBG + Limonene': 0.72,
          'CBC + Pinene': 0.65
        },
        terpenePreferences: {
          'Myrcene': 34,
          'Limonene': 28,
          'Pinene': 18,
          'Linalool': 12,
          'Caryophyllene': 8
        },
        consumptionPatterns: {
          'Evening': 45,
          'Afternoon': 25,
          'Morning': 20,
          'Night': 10
        }
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'paused':
        return <AlertCircle className="h-4 w-4" />;
      case 'draft':
        return <XCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scientific Studies</h1>
          <p className="text-gray-600">Cannabis research and data analytics platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Study
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'studies', name: 'Active Studies', icon: Beaker },
            { id: 'analytics', name: 'Data Analytics', icon: Brain },
            { id: 'insights', name: 'AI Insights', icon: Zap },
            { id: 'participants', name: 'Participants', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Studies</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalStudies}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.activeParticipants}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Surveys</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.completedSurveys}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Data Points</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.dataPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Effects Reported */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Reported Effects</h3>
              <div className="space-y-3">
                {Object.entries(analytics.effectsReported).slice(0, 6).map(([effect, count]) => (
                  <div key={effect} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{effect}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(count / Math.max(...Object.values(analytics.effectsReported))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cannabinoid Correlations */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cannabinoid Correlations</h3>
              <div className="space-y-3">
                {Object.entries(analytics.cannabinoidCorrelations).map(([combination, correlation]) => (
                  <div key={combination} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{combination}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${correlation * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{(correlation * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Key Findings</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• CBN + Myrcene combination shows 78% correlation with sleep improvement</li>
                  <li>• Users prefer citrus terpenes (Limonene) for daytime consumption</li>
                  <li>• Microdosing (2.5mg THC) optimal for productivity without impairment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Develop CBN-rich products for sleep market segment</li>
                  <li>• Create terpene-specific product lines</li>
                  <li>• Expand microdosing product offerings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'studies' && (
        <div className="space-y-6">
          {/* Studies List */}
          <div className="space-y-4">
            {studies.map((study) => (
              <div key={study.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{study.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(study.status)}`}>
                        {getStatusIcon(study.status)}
                        <span className="ml-1 capitalize">{study.status}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Participants</p>
                        <p className="font-medium">{study.participants}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium">{new Date(study.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium capitalize">{study.category}</p>
                      </div>
                      {study.results && (
                        <div>
                          <p className="text-gray-500">Responses</p>
                          <p className="font-medium">{study.results.totalResponses}</p>
                        </div>
                      )}
                    </div>

                    {study.results && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {study.results.insights.map((insight, index) => (
                            <li key={index}>• {insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          {/* Advanced Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Terpene Preferences */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terpene Preferences</h3>
              <div className="space-y-3">
                {Object.entries(analytics.terpenePreferences).map(([terpene, percentage]) => (
                  <div key={terpene} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{terpene}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumption Patterns */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumption Patterns</h3>
              <div className="space-y-3">
                {Object.entries(analytics.consumptionPatterns).map(([time, percentage]) => (
                  <div key={time} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{time}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export & Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-5 w-5 mr-2 text-gray-600" />
                <span>Export Raw Data</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                <span>Generate Report</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Brain className="h-5 w-5 mr-2 text-gray-600" />
                <span>AI Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* AI Insights Dashboard */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <Zap className="h-6 w-6 text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Product Development Opportunity</h4>
                  <p className="text-sm text-blue-800">
                    Data shows 78% correlation between CBN content and sleep improvement. 
                    Consider developing CBN-rich products for the sleep market segment.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Market Trend</h4>
                  <p className="text-sm text-green-800">
                    Microdosing products show highest satisfaction rates (4.7/5). 
                    65% of users prefer 2.5mg THC doses for productivity.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Terpene Preference</h4>
                  <p className="text-sm text-purple-800">
                    Limonene-dominant products preferred by 65% of users under 35. 
                    Strong correlation with mood enhancement and creativity.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Consumption Pattern</h4>
                  <p className="text-sm text-orange-800">
                    Evening consumption dominates (45%), followed by afternoon (25%). 
                    Optimize inventory and marketing for peak times.
                  </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Quality Indicator</h4>
                  <p className="text-sm text-red-800">
                    Products with lab-verified terpene profiles receive 23% higher ratings. 
                    Invest in comprehensive lab testing and reporting.
                  </p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900 mb-2">Customer Retention</h4>
                  <p className="text-sm text-indigo-800">
                    Users who complete effect surveys show 40% higher retention rates. 
                    Implement post-purchase feedback systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'participants' && (
        <div className="space-y-6">
          {/* Participant Management */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Study Participants</h3>
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Invite Participants
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">567</p>
                <p className="text-sm text-gray-600">Active Participants</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">4.6</p>
                <p className="text-sm text-gray-600">Avg Engagement Score</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Studies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'John D.', studies: 3, responses: 12, lastActive: '2 hours ago', status: 'active' },
                    { id: 2, name: 'Sarah M.', studies: 2, responses: 8, lastActive: '1 day ago', status: 'active' },
                    { id: 3, name: 'Mike R.', studies: 1, responses: 5, lastActive: '3 days ago', status: 'inactive' },
                  ].map((participant) => (
                    <tr key={participant.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {participant.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {participant.studies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {participant.responses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          participant.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {participant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScientificStudies;