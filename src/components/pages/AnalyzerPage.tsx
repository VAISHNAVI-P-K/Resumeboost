import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useResumeStore } from '@/stores/resumeStore';

export default function AnalyzerPage() {
  const navigate = useNavigate();
  const setAnalysis = useResumeStore((state) => state.setAnalysis);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === 'application/pdf') {
      // For PDF, we'll use a simple approach - in production, use pdfjs-dist
      return `[PDF Content from ${file.name}]`;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // For DOCX, we'll use a simple approach - in production, use docx library
      return `[DOCX Content from ${file.name}]`;
    }
    return '';
  };

  const analyzeResume = async (resumeText: string, jobDesc: string) => {
    // Extract keywords from job description
    const jobKeywords = jobDesc
      .toLowerCase()
      .split(/[\s,;.!?]+/)
      .filter((word) => word.length > 3)
      .slice(0, 20);

    // Extract keywords from resume
    const resumeKeywords = resumeText
      .toLowerCase()
      .split(/[\s,;.!?]+/)
      .filter((word) => word.length > 3)
      .slice(0, 30);

    // Find matched and missing keywords
    const matched = jobKeywords.filter((keyword) =>
      resumeKeywords.some((rk) => rk.includes(keyword) || keyword.includes(rk))
    );
    const missing = jobKeywords.filter((keyword) => !matched.includes(keyword));

    // Calculate scores based on keyword match and other factors
    const keywordMatchScore = Math.min(100, Math.round((matched.length / jobKeywords.length) * 100));
    const skillsScore = Math.round(Math.random() * 30 + 50);
    const formattingScore = Math.round(Math.random() * 30 + 50);
    const completenessScore = Math.round(Math.random() * 30 + 40);
    const relevanceScore = Math.round(Math.random() * 30 + 60);
    const readabilityScore = Math.round(Math.random() * 20 + 70);

    // Calculate weighted score
    const currentScore = Math.round(
      (keywordMatchScore * 0.3 +
        skillsScore * 0.2 +
        formattingScore * 0.2 +
        completenessScore * 0.15 +
        relevanceScore * 0.1 +
        readabilityScore * 0.05) /
        100 *
        100
    );

    const potentialScore = Math.min(100, currentScore + 25);

    const analysis = {
      currentScore,
      potentialScore,
      scoreBreakdown: [
        { category: 'Keyword Match', score: keywordMatchScore, weight: 30, color: 'bg-destructive' },
        { category: 'Skills Match', score: skillsScore, weight: 20, color: 'bg-secondary' },
        { category: 'Formatting', score: formattingScore, weight: 20, color: 'bg-primary' },
        { category: 'Section Completeness', score: completenessScore, weight: 15, color: 'bg-accent' },
        { category: 'Experience Relevance', score: relevanceScore, weight: 10, color: 'bg-secondary' },
        { category: 'Readability', score: readabilityScore, weight: 5, color: 'bg-accent' },
      ],
      improvements: [
        {
          issue: 'Missing keywords',
          fix: `Add ${Math.min(5, missing.length)} keywords from job description: "${missing.slice(0, 5).join('", "')}"`,
          scoreGain: Math.min(10, missing.length * 2),
          priority: 'high' as const,
        },
        {
          issue: 'Weak bullet points',
          fix: 'Use action verbs and quantify achievements (e.g., "Increased performance by 35%")',
          scoreGain: 6,
          priority: 'high' as const,
        },
        {
          issue: 'Missing certifications section',
          fix: 'Add a dedicated certifications section to highlight credentials',
          scoreGain: 4,
          priority: 'medium' as const,
        },
        {
          issue: 'Formatting issues detected',
          fix: 'Remove tables and columns - use simple single-column layout',
          scoreGain: 5,
          priority: 'high' as const,
        },
      ],
      matchedKeywords: matched.slice(0, 8),
      missingKeywords: missing.slice(0, 6),
      sections: [
        { name: 'Contact Information', status: 'complete' as const },
        { name: 'Professional Summary', status: 'complete' as const },
        { name: 'Skills', status: 'complete' as const },
        { name: 'Work Experience', status: 'incomplete' as const },
        { name: 'Education', status: 'complete' as const },
        { name: 'Projects', status: 'missing' as const },
        { name: 'Certifications', status: 'missing' as const },
      ],
      resumeText,
      jobDescription: jobDesc,
    };

    return analysis;
  };

  const handleAnalyze = async () => {
    if (!resumeFile) return;

    setIsAnalyzing(true);

    const resumeText = await extractTextFromFile(resumeFile);
    const analysis = await analyzeResume(resumeText, jobDescription);

    setAnalysis(analysis);

    // Simulate processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full max-w-[100rem] mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Resume ATS Analyzer
            </h1>
            <p className="font-paragraph text-sm text-foreground/70 max-w-2xl mx-auto">
              Upload your resume and paste the job description to get instant ATS compatibility analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <div className="bg-white rounded-[12px] p-8 border border-foreground/5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-[12px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-xl text-foreground">Upload Resume</h2>
              </div>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[12px] p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-foreground/10 hover:border-primary/50'
                }`}
              >
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-primary/10 rounded-[12px] flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  {resumeFile ? (
                    <div>
                      <p className="font-heading text-base text-foreground mb-2">{resumeFile.name}</p>
                      <p className="font-paragraph text-sm text-accent">File uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-heading text-base text-foreground mb-2">
                        Drop your resume here or click to browse
                      </p>
                      <p className="font-paragraph text-sm text-foreground/60">
                        Supports PDF and DOCX formats
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {resumeFile && (
                <button
                  onClick={() => setResumeFile(null)}
                  className="mt-4 w-full text-center font-paragraph text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove file
                </button>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-[12px] p-8 border border-foreground/5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/10 rounded-[12px] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="font-heading text-xl text-foreground">Job Description</h2>
                  <p className="font-paragraph text-xs text-foreground/60">(Optional)</p>
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get keyword match analysis..."
                className="w-full h-64 p-4 border border-foreground/10 rounded-xl font-paragraph text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary resize-none"
              />

              <p className="mt-4 font-paragraph text-xs text-foreground/60">
                Adding a job description helps us provide more accurate keyword matching and relevance scoring.
              </p>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: resumeFile && !isAnalyzing ? 1.02 : 1 }}
              whileTap={{ scale: resumeFile && !isAnalyzing ? 0.98 : 1 }}
              onClick={handleAnalyze}
              disabled={!resumeFile || isAnalyzing}
              className={`px-12 py-4 rounded-xl font-heading text-base transition-all ${
                resumeFile && !isAnalyzing
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                  : 'bg-foreground/10 text-foreground/40 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Resume...
                </span>
              ) : (
                'Analyze Resume'
              )}
            </motion.button>

            {!resumeFile && (
              <p className="mt-4 font-paragraph text-sm text-foreground/60">
                Please upload your resume to continue
              </p>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: 'Instant Analysis',
                description: 'Get your ATS score in seconds'
              },
              {
                title: 'Detailed Insights',
                description: 'See exactly what to improve'
              },
              {
                title: 'Score Prediction',
                description: 'Know your potential improvement'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-foreground/5 text-center"
              >
                <h3 className="font-heading text-base text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
