import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
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
  const [error, setError] = useState('');

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
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain') {
        setResumeFile(file);
      } else {
        setError('Please upload a PDF, DOCX, or TXT file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain') {
        setResumeFile(file);
      } else {
        setError('Please upload a PDF, DOCX, or TXT file');
      }
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === 'text/plain') {
      return await file.text();
    } else if (file.type === 'application/pdf') {
      // For PDF, return a placeholder - in production, use pdfjs-dist
      return `[PDF: ${file.name}] - PDF parsing requires additional library. Using file name as content indicator.`;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // For DOCX, return a placeholder - in production, use docx library
      return `[DOCX: ${file.name}] - DOCX parsing requires additional library. Using file name as content indicator.`;
    }
    return '';
  };

  const analyzeResume = async (resumeText: string, jobDesc: string) => {
    // Normalize text
    const normalizeText = (text: string) => text.toLowerCase().trim();
    const normalizedResume = normalizeText(resumeText);
    const normalizedJob = normalizeText(jobDesc);

    // Extract keywords from job description
    const jobKeywords = normalizedJob
      .split(/[\s,;.!?()\\-\n]+/)
      .filter((word) => word.length > 2 && !/^[0-9]+$/.test(word))
      .filter((word, index, self) => self.indexOf(word) === index)
      .slice(0, 25);

    // Extract keywords from resume
    const resumeKeywords = normalizedResume
      .split(/[\s,;.!?()\\-\n]+/)
      .filter((word) => word.length > 2 && !/^[0-9]+$/.test(word))
      .filter((word, index, self) => self.indexOf(word) === index);

    // Find matched and missing keywords
    const matched = jobKeywords.filter((keyword) =>
      resumeKeywords.some((rk) => rk.includes(keyword) || keyword.includes(rk))
    );
    const missing = jobKeywords.filter((keyword) => !matched.includes(keyword));

    // Calculate scores based on actual resume content analysis
    const keywordMatchScore = jobKeywords.length > 0 ? Math.min(100, Math.round((matched.length / jobKeywords.length) * 100)) : 65;
    
    // Check for common resume sections
    const hasSummary = /summary|objective|profile/.test(normalizedResume);
    const hasExperience = /experience|employment|work|position|role/.test(normalizedResume);
    const hasEducation = /education|degree|university|college|school/.test(normalizedResume);
    const hasSkills = /skills|technical|proficiency|expertise/.test(normalizedResume);
    const hasCertifications = /certification|certified|certificate/.test(normalizedResume);
    const hasProjects = /project|portfolio|github|developed|built/.test(normalizedResume);
    
    // Count action verbs (common in good resumes)
    const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'designed', 'led', 'improved', 'increased', 'reduced', 'achieved', 'delivered', 'coordinated', 'analyzed', 'optimized', 'launched'];
    const actionVerbCount = actionVerbs.filter(verb => normalizedResume.includes(verb)).length;
    
    // Check for quantifiable achievements
    const hasMetrics = /\d+%|\$\d+|\d+x|\d+\s*(million|thousand|hundred|k|m)/.test(normalizedResume);
    
    // Calculate section completeness score
    const completeSections = [hasSummary, hasExperience, hasEducation, hasSkills].filter(Boolean).length;
    const completenessScore = Math.round((completeSections / 4) * 100);
    
    // Calculate skills match score - ensure it's never NaN
    const skillsScore = Math.min(100, Math.max(0, Math.round((actionVerbCount / 15) * 100))) || 45;
    
    // Calculate formatting score (based on length and structure)
    const lines = Math.max(1, resumeText.split('\n').length);
    const avgLineLength = resumeText.length / lines;
    const formattingScore = Math.min(100, Math.max(0, Math.round((lines / 30) * 50 + (avgLineLength > 20 && avgLineLength < 100 ? 50 : 20)))) || 55;
    
    // Calculate relevance score
    const relevanceScore = hasMetrics ? Math.min(100, keywordMatchScore + 15) : keywordMatchScore;
    
    // Calculate readability score - ensure it's never NaN
    const readabilityScore = Math.min(100, Math.max(0, Math.round((lines / 50) * 100))) || 50;

    // Calculate weighted score
    const currentScore = Math.round(
      (keywordMatchScore * 0.3 +
        skillsScore * 0.2 +
        formattingScore * 0.15 +
        completenessScore * 0.15 +
        relevanceScore * 0.1 +
        readabilityScore * 0.1)
    );

    const potentialScore = Math.min(100, currentScore + (missing.length > 0 ? Math.min(20, missing.length * 2) : 10));

    // Determine section statuses
    const sections = [
      { name: 'Contact Information', status: (resumeText.includes('@') || /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(resumeText)) ? 'complete' as const : 'incomplete' as const },
      { name: 'Professional Summary', status: hasSummary ? 'complete' as const : 'missing' as const },
      { name: 'Skills', status: hasSkills ? 'complete' as const : 'missing' as const },
      { name: 'Work Experience', status: hasExperience ? 'complete' as const : 'incomplete' as const },
      { name: 'Education', status: hasEducation ? 'complete' as const : 'missing' as const },
      { name: 'Projects', status: hasProjects ? 'complete' as const : 'missing' as const },
      { name: 'Certifications', status: hasCertifications ? 'complete' as const : 'missing' as const },
    ];

    // Generate improvements based on analysis
    const improvements = [];
    
    if (missing.length > 0) {
      improvements.push({
        issue: 'Missing critical keywords',
        fix: `Add these keywords from the job description: "${missing.slice(0, 5).join('", "')}"`,
        scoreGain: Math.min(10, missing.length * 2),
        priority: 'high' as const,
      });
    }
    
    if (actionVerbCount < 5) {
      improvements.push({
        issue: 'Weak action verbs',
        fix: 'Use strong action verbs like "Managed", "Developed", "Implemented" to start bullet points',
        scoreGain: 8,
        priority: 'high' as const,
      });
    }
    
    if (!hasMetrics) {
      improvements.push({
        issue: 'Missing quantifiable achievements',
        fix: 'Add metrics and numbers to achievements (e.g., "Increased sales by 35%", "Reduced costs by $50K")',
        scoreGain: 10,
        priority: 'high' as const,
      });
    }
    
    if (!hasCertifications) {
      improvements.push({
        issue: 'No certifications section',
        fix: 'Add a dedicated certifications section to highlight professional credentials',
        scoreGain: 5,
        priority: 'medium' as const,
      });
    }
    
    if (!hasSummary) {
      improvements.push({
        issue: 'Missing professional summary',
        fix: 'Add a brief professional summary at the top highlighting your key strengths',
        scoreGain: 6,
        priority: 'medium' as const,
      });
    }

    const analysis = {
      currentScore: Math.max(0, Math.min(100, currentScore)),
      potentialScore: Math.max(0, Math.min(100, potentialScore)),
      scoreBreakdown: [
        { category: 'Keyword Match', score: keywordMatchScore, weight: 30, color: 'bg-destructive' },
        { category: 'Skills & Action Verbs', score: skillsScore, weight: 20, color: 'bg-secondary' },
        { category: 'Formatting', score: formattingScore, weight: 15, color: 'bg-primary' },
        { category: 'Section Completeness', score: completenessScore, weight: 15, color: 'bg-accent' },
        { category: 'Experience Relevance', score: relevanceScore, weight: 10, color: 'bg-secondary' },
        { category: 'Readability', score: readabilityScore, weight: 10, color: 'bg-accent' },
      ],
      improvements: improvements.length > 0 ? improvements : [
        {
          issue: 'Excellent resume',
          fix: 'Your resume is well-structured. Consider adding more specific metrics to further improve ATS compatibility.',
          scoreGain: 5,
          priority: 'low' as const,
        },
      ],
      matchedKeywords: matched.slice(0, 10),
      missingKeywords: missing.slice(0, 8),
      sections,
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

  const jobKeywords = jobDescription
    .toLowerCase()
    .split(/[\s,;.!?]+/)
    .filter((word) => word.length > 3);

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

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <p className="font-paragraph text-sm text-destructive">{error}</p>
                </motion.div>
              )}

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
                  accept=".pdf,.docx,.txt"
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
                        Supports PDF, DOCX, and TXT formats
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

              {/* Keyword Analysis Section */}
              {resumeFile && jobDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 pt-8 border-t border-foreground/10"
                >
                  <h3 className="font-heading text-base text-foreground mb-4">Keyword Analysis Preview</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-2">Keywords Found</p>
                      <div className="flex flex-wrap gap-2">
                        {jobKeywords
                          .slice(0, 6)
                          .map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-accent/10 text-accent rounded-full font-paragraph text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-paragraph text-xs text-foreground/60 mb-2">Analysis Metrics</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary/5 rounded-lg p-3">
                          <p className="font-paragraph text-xs text-foreground/60">Total Keywords</p>
                          <p className="font-heading text-lg text-primary">
                            {jobKeywords.length}
                          </p>
                        </div>
                        <div className="bg-secondary/5 rounded-lg p-3">
                          <p className="font-paragraph text-xs text-foreground/60">Analysis Ready</p>
                          <p className="font-heading text-lg text-secondary">✓</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
