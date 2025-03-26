import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, PenTool as Tool, Clock, Heart, BookOpen, Home as HomeIcon } from 'lucide-react';

// DIYプロジェクトのデータ型定義
type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface Material {
  name: string;
  quantity: string;
}

interface Tool {
  name: string;
  optional: boolean;
}

interface Step {
  order: number;
  description: string;
  imageUrl: string;
}

interface DIYProject {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: DifficultyLevel;
  duration: string;
  category: string;
  materials: Material[];
  tools: Tool[];
  steps: Step[];
  likes: number;
}

// サンプルデータ
const projects: DIYProject[] = [
  {
    id: 1,
    title: "シンプルな木製本棚",
    description: "初心者向けの基本的な木工プロジェクト。必要な工具も最小限で作れます。",
    imageUrl: "https://source.unsplash.com/random/800x600?wooden+shelf",
    difficulty: "easy",
    duration: "2-3時間",
    category: "木工",
    materials: [
      { name: "木材（1.8cm x 20cm x 180cm）", quantity: "3枚" },
      { name: "木ネジ（5cm）", quantity: "12本" }
    ],
    tools: [
      { name: "電動ドリル", optional: false },
      { name: "メジャー", optional: false },
      { name: "鉛筆", optional: false }
    ],
    steps: [
      {
        order: 1,
        description: "木材を必要なサイズにカットします。側板2枚（高さ90cm）と棚板3枚（幅60cm）を作ります。",
        imageUrl: "https://source.unsplash.com/random/800x600?woodworking"
      },
      {
        order: 2,
        description: "側板に棚板の取り付け位置を印をつけます。上下と中央に均等に配置します。",
        imageUrl: "https://source.unsplash.com/random/800x600?measuring"
      }
    ],
    likes: 124
  },
  {
    id: 2,
    title: "ハーブガーデンプランター",
    description: "ベランダや窓際で楽しむハーブガーデンの作り方。",
    imageUrl: "https://source.unsplash.com/random/800x600?herb+garden",
    difficulty: "easy",
    duration: "1-2時間",
    category: "ガーデニング",
    materials: [
      { name: "プランターボックス", quantity: "1個" },
      { name: "培養土", quantity: "5L" },
      { name: "ハーブの苗", quantity: "3～4株" }
    ],
    tools: [
      { name: "園芸用シャベル", optional: false },
      { name: "じょうろ", optional: false }
    ],
    steps: [
      {
        order: 1,
        description: "プランターの底に排水用の穴があることを確認し、必要に応じて追加で開けます。",
        imageUrl: "https://source.unsplash.com/random/800x600?planter"
      }
    ],
    likes: 89
  },
  {
    id: 3,
    title: "モダンな壁掛けシェルフ",
    description: "インテリアとして素敵な壁掛けシェルフの製作手順。",
    imageUrl: "https://source.unsplash.com/random/800x600?wall+shelf",
    difficulty: "medium",
    duration: "3-4時間",
    category: "木工",
    materials: [],
    tools: [],
    steps: [],
    likes: 156
  },
  {
    id: 4,
    title: "多肉植物の寄せ植え",
    description: "おしゃれな多肉植物の寄せ植えの作り方。",
    imageUrl: "https://source.unsplash.com/random/800x600?succulent",
    difficulty: "easy",
    duration: "1時間",
    category: "ガーデニング",
    materials: [],
    tools: [],
    steps: [],
    likes: 234
  },
  {
    id: 5,
    title: "リサイクルパレットテーブル",
    description: "廃材を利用したエコなDIYテーブルの作り方。",
    imageUrl: "https://source.unsplash.com/random/800x600?pallet+table",
    difficulty: "hard",
    duration: "4-5時間",
    category: "木工",
    materials: [],
    tools: [],
    steps: [],
    likes: 178
  }
];

function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(projects.map(p => p.category)));

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="プロジェクトを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Tool className="h-4 w-4 mr-1" />
                  <span className={getDifficultyColor(project.difficulty)}>
                    {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-gray-600">{project.duration}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-gray-600">{project.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail() {
  const navigate = useNavigate();
  const projectId = parseInt(window.location.pathname.split('/').pop() || '1');
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <div>プロジェクトが見つかりません</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-600"
      >
        <HomeIcon className="h-4 w-4 mr-2" />
        ホームに戻る
      </button>

      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <div className="flex items-center space-x-4">
          <span className={`flex items-center ${getDifficultyColor(project.difficulty)}`}>
            <Tool className="h-5 w-5 mr-1" />
            {project.difficulty}
          </span>
          <span className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-1" />
            {project.duration}
          </span>
          <span className="flex items-center">
            <Heart className="h-5 w-5 mr-1 text-red-500" />
            {project.likes}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-8">{project.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">必要な材料</h2>
          <ul className="space-y-2">
            {project.materials.map((material, index) => (
              <li key={index} className="flex justify-between">
                <span>{material.name}</span>
                <span className="text-gray-600">{material.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">必要な道具</h2>
          <ul className="space-y-2">
            {project.tools.map((tool, index) => (
              <li key={index} className="flex justify-between">
                <span>{tool.name}</span>
                <span className="text-gray-600">
                  {tool.optional ? '(オプション)' : '(必須)'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">手順</h2>
        <div className="space-y-8">
          {project.steps.map((step) => (
            <div key={step.order} className="border-b pb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {step.order}
                </div>
                <h3 className="text-lg font-medium">{step.description}</h3>
              </div>
              <img
                src={step.imageUrl}
                alt={`Step ${step.order}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <Link to="/" className="text-3xl font-bold text-gray-900">
                DIY Project Gallery
              </Link>
              <nav className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  <HomeIcon className="h-6 w-6" />
                </Link>
                <Link to="/favorites" className="text-gray-600 hover:text-gray-900">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/library" className="text-gray-600 hover:text-gray-900">
                  <BookOpen className="h-6 w-6" />
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;