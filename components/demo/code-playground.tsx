"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Check,
  ChevronRight,
  Bug,
  Shield,
  Code,
  Eye,
  Lock
} from "lucide-react";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: "vulnerability" | "detection" | "mitigation";
  language: string;
  vulnerableCode: string;
  analysis: string[];
  fixedCode?: string;
  severity: "critical" | "high" | "medium" | "low";
}

const CODE_EXAMPLES: CodeExample[] = [
  {
    id: "sql-injection",
    title: "SQL Injection Detection",
    description: "Identify classic SQL injection vulnerabilities in user input handling.",
    category: "vulnerability",
    language: "python",
    severity: "critical",
    vulnerableCode: `def get_user(username):
    # ⚠️ VULNERABLE: Direct string interpolation
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()

# Attack payload:
# username = "admin' OR '1'='1"
# Results in: SELECT * FROM users WHERE username = 'admin' OR '1'='1'`,
    analysis: [
      "🔴 Direct string interpolation allows SQL injection",
      "🔴 User input is not sanitized or validated",
      "🔴 No parameterized query usage",
      "💀 Attacker can bypass authentication entirely",
      "💀 Full database compromise possible",
    ],
    fixedCode: `def get_user(username):
    # ✅ SECURE: Parameterized query
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    return cursor.fetchone()

# The ? placeholder ensures the database treats
# the input as data, not executable SQL.`,
  },
  {
    id: "auth-bypass",
    title: "Authentication Bypass",
    description: "Flawed authentication logic that allows privilege escalation.",
    category: "vulnerability",
    language: "javascript",
    severity: "critical",
    vulnerableCode: `app.get('/admin', (req, res) => {
  // ⚠️ VULNERABLE: Checking user-controlled header
  const isAdmin = req.headers['x-user-role'] === 'admin';
  
  if (isAdmin) {
    return res.json({ secrets: getAdminData() });
  }
  
  return res.status(403).json({ error: 'Forbidden' });
});

// Attack: Simply add header "X-User-Role: admin"
// curl -H "X-User-Role: admin" https://target.com/admin`,
    analysis: [
      "🔴 Trust in client-controlled HTTP header",
      "🔴 No server-side session validation",
      "🔴 Role check happens on untrusted data",
      "💀 Any user can become admin",
      "💀 Complete authorization bypass",
    ],
    fixedCode: `app.get('/admin', authenticate, (req, res) => {
  // ✅ SECURE: Server-side session validation
  const user = req.session.user;
  
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  return res.json({ secrets: getAdminData() });
});

// Role is validated from server-side session,
// not from client-controlled headers.`,
  },
  {
    id: "ssrf",
    title: "Server-Side Request Forgery",
    description: "User-controlled URLs that can access internal services.",
    category: "vulnerability",
    language: "python",
    severity: "high",
    vulnerableCode: `@app.route('/fetch')
def fetch_url():
    # ⚠️ VULNERABLE: User controls the URL
    url = request.args.get('url')
    response = requests.get(url)
    return response.text

# Attack payloads:
# /fetch?url=http://169.254.169.254/latest/meta-data/
# /fetch?url=http://localhost:6379/CONFIG%20GET%20*
# /fetch?url=file:///etc/passwd`,
    analysis: [
      "🔴 User controls destination URL without validation",
      "🔴 No allowlist of permitted hosts",
      "🔴 Internal network accessible",
      "💀 AWS metadata endpoint exposure",
      "💀 Internal service port scanning",
      "💀 Local file read via file:// protocol",
    ],
    fixedCode: `import urllib.parse

ALLOWED_HOSTS = ['api.example.com', 'cdn.example.com']

@app.route('/fetch')
def fetch_url():
    url = request.args.get('url')
    parsed = urllib.parse.urlparse(url)
    
    # ✅ SECURE: Validate against allowlist
    if parsed.scheme not in ['http', 'https']:
        return 'Invalid protocol', 400
    
    if parsed.hostname not in ALLOWED_HOSTS:
        return 'Host not allowed', 400
    
    response = requests.get(url, timeout=5)
    return response.text`,
  },
  {
    id: "path-traversal",
    title: "Path Traversal",
    description: "File access outside intended directory via ../ sequences.",
    category: "vulnerability",
    language: "javascript",
    severity: "high",
    vulnerableCode: `app.get('/download', (req, res) => {
  // ⚠️ VULNERABLE: Direct path concatenation
  const filename = req.query.file;
  const filepath = \`./uploads/\${filename}\`;
  
  res.sendFile(filepath, { root: __dirname });
});

// Attack:
// /download?file=../../../etc/passwd
// /download?file=../.env`,
    analysis: [
      "🔴 No sanitization of file parameter",
      "🔴 ../ sequences not filtered",
      "🔴 Can escape uploads directory",
      "💀 Read sensitive config files (.env)",
      "💀 Access system files (/etc/passwd)",
    ],
    fixedCode: `const path = require('path');

app.get('/download', (req, res) => {
  const filename = req.query.file;
  const uploadsDir = path.join(__dirname, 'uploads');
  
  // ✅ SECURE: Resolve and validate path
  const filepath = path.join(uploadsDir, filename);
  const realPath = path.resolve(filepath);
  
  // Ensure file is within uploads directory
  if (!realPath.startsWith(uploadsDir)) {
    return res.status(403).send('Access denied');
  }
  
  res.sendFile(realPath);
});`,
  },
  {
    id: "api-key-exposure",
    title: "API Key Exposure",
    description: "Sensitive credentials leaked in client-side code or logs.",
    category: "detection",
    language: "javascript",
    severity: "high",
    vulnerableCode: `// ⚠️ VULNERABLE: API key in client-side code
const config = {
  apiKey: 'sk-1234567890abcdef',
  apiSecret: 'secret_abc123xyz789',
  databaseUrl: 'postgres://admin:password@db.example.com/prod'
};

// Also found in:
// - Git commit history
// - Build artifacts
// - Console.log statements
// - Error messages
console.log('Connecting with:', config);`,
    analysis: [
      "🔴 Hardcoded API keys in source code",
      "🔴 Credentials visible in browser dev tools",
      "🔴 Logged to console/error handlers",
      "💀 Keys can be extracted by any user",
      "💀 Compromises entire service account",
    ],
    fixedCode: `// ✅ SECURE: Environment variables + server-side only
// .env file (never committed to git)
// API_KEY=sk-1234567890abcdef
// API_SECRET=secret_abc123xyz789

// Server-side only
const config = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
};

// For client-side, use proxy endpoints:
// Client calls /api/data
// Server uses credentials to call external API
// Credentials never leave server`,
  },
];

const CATEGORY_CONFIG = {
  vulnerability: { icon: Bug, color: "text-red-400", bg: "bg-red-400/10" },
  detection: { icon: Eye, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  mitigation: { icon: Shield, color: "text-green-400", bg: "bg-green-400/10" },
};

const SEVERITY_COLORS = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function CodePlayground() {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(CODE_EXAMPLES[0]);
  const [showFix, setShowFix] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Reset state when example changes
  useEffect(() => {
    setShowFix(false);
    setAnalysisStep(0);
  }, [selectedExample]);

  // Simulate analysis animation
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    
    const steps = selectedExample.analysis.length;
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      
      if (step >= steps) {
        clearInterval(interval);
        setIsAnalyzing(false);
      }
    }, 400);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CategoryIcon = CATEGORY_CONFIG[selectedExample.category].icon;

  return (
    <div className="space-y-6">
      {/* Example Selector */}
      <div className="flex flex-wrap gap-2">
        {CODE_EXAMPLES.map((example) => {
          const config = CATEGORY_CONFIG[example.category];
          const Icon = config.icon;
          return (
            <button
              key={example.id}
              onClick={() => setSelectedExample(example)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg border transition-all ${
                selectedExample.id === example.id
                  ? `${config.bg} ${config.color} border-current`
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{example.title}</span>
              <span className="sm:hidden">{example.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Panel */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${CATEGORY_CONFIG[selectedExample.category].bg}`}>
                <CategoryIcon className={`w-5 h-5 ${CATEGORY_CONFIG[selectedExample.category].color}`} />
              </div>
              <div>
                <h3 className="font-bold text-white">{selectedExample.title}</h3>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className={`w-2 h-2 rounded-full ${SEVERITY_COLORS[selectedExample.severity]}`} />
                  <span className="capitalize">{selectedExample.severity}</span>
                  <span>•</span>
                  <span className="uppercase">{selectedExample.language}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-400">{selectedExample.description}</p>

          {/* Code Block - Vulnerable */}
          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 rounded-t-lg border border-zinc-700 border-b-0">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-mono text-red-400">VULNERABLE CODE</span>
              </div>
              <button
                onClick={() => copyCode(selectedExample.vulnerableCode, `vuln-${selectedExample.id}`)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {copiedId === `vuln-${selectedExample.id}` ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <pre className="p-4 bg-zinc-900 rounded-b-lg border border-zinc-700 overflow-x-auto">
              <code className="text-sm font-mono text-zinc-300 whitespace-pre">
                {selectedExample.vulnerableCode}
              </code>
            </pre>
          </div>

          {/* Fixed Code Block */}
          <AnimatePresence>
            {showFix && selectedExample.fixedCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-green-900/30 rounded-t-lg border border-green-700/30 border-b-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-mono text-green-400">SECURE CODE</span>
                  </div>
                  <button
                    onClick={() => copyCode(selectedExample.fixedCode!, `fix-${selectedExample.id}`)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedId === `fix-${selectedExample.id}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-zinc-900 rounded-b-lg border border-green-700/30 overflow-x-auto">
                  <code className="text-sm font-mono text-zinc-300 whitespace-pre">
                    {selectedExample.fixedCode}
                  </code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-lime-400/10 text-lime-400 border border-lime-400/30 rounded-lg hover:bg-lime-400/20 transition-all disabled:opacity-50 text-sm font-mono"
            >
              <Play className="w-4 h-4" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </button>
            
            {selectedExample.fixedCode && (
              <button
                onClick={() => setShowFix(!showFix)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-all text-sm font-mono"
              >
                <Lock className="w-4 h-4" />
                {showFix ? "Hide Fix" : "Show Fix"}
              </button>
            )}
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-lime-400" />
            <h3 className="font-bold text-white font-mono">Security Analysis</h3>
          </div>

          {/* Analysis Results */}
          <div className="space-y-3">
            {selectedExample.analysis.map((item, index) => {
              const isVisible = index < analysisStep;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.3, 
                    x: isVisible ? 0 : -10 
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    isVisible ? "text-lime-400" : "text-zinc-600"
                  }`} />
                  <span className={`text-sm ${
                    isVisible ? "text-zinc-300" : "text-zinc-600"
                  }`}>
                    {item}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Analyzing...</span>
                <span>{Math.round((analysisStep / selectedExample.analysis.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-lime-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(analysisStep / selectedExample.analysis.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Summary */}
          {analysisStep >= selectedExample.analysis.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-400/5 border border-red-400/20 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="font-bold text-red-400 text-sm">Vulnerability Confirmed</span>
              </div>
              <p className="text-sm text-zinc-400">
                This code pattern is exploitable. {selectedExample.fixedCode && "Click 'Show Fix' to see the secure implementation."}
              </p>
            </motion.div>
          )}

          {/* Empty State */}
          {analysisStep === 0 && !isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-48 text-zinc-600">
              <Play className="w-8 h-8 mb-2" />
              <p className="text-sm font-mono">Click "Run Analysis" to start</p>
            </div>
          )}
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
        <p className="text-xs text-zinc-500 text-center">
          🎓 These examples demonstrate common vulnerability patterns. Understanding these helps build more secure applications.
        </p>
      </div>
    </div>
  );
}
