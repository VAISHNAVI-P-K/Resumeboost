import { motion } from 'framer-motion';
import { TrendingUp, Target, FileText, CheckCircle, AlertCircle, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useResumeStore } from '@/stores/resumeStore';
import { useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const navigate = useNavigate();
  const analysis = useResumeStore((state) => state.analysis);
  const clearAnalysis = useResumeStore((state) => state.clearAnalysis);

  // Redirect to analyzer if no analysis data
  if (!analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl text-foreground mb-4">No Analysis Found</h1>
            <p className="font-paragraph text-sm text-foreground/70 mb-8">
              Please upload and analyze a resume first.
            </p>
            <button
              onClick={() => navigate('/analyzer')}
              className="bg-primary text-primary-foreground font-heading text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Go to Analyzer
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const { currentScore, potentialScore, scoreBreakdown, improvements, matchedKeywords, missingKeywords, sections } = analysis;
  const improvement = potentialScore - currentScore;

  const getScoreColor = (score: number) => {
    if (score >= 71) return 'text-accent';
    if (score >= 41) return 'text-secondary';
    return 'text-destructive';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 71) return 'bg-accent';
    if (score >= 41) return 'bg-secondary';
    return 'bg-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Your ATS Analysis Results
            </h1>
            <p className="font-paragraph text-sm text-foreground/70 max-w-2xl mx-auto">
              Comprehensive analysis of your resume's ATS compatibility with actionable improvement suggestions.
            </p>
          </div>

          {/* Score Overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Current Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 border border-foreground/5"
            >
              <div className="text-center">
                <p className="font-paragraph text-sm text-foreground/60 mb-2">Current ATS Score</p>
                <div className={`text-7xl font-heading ${getScoreColor(currentScore)} mb-4`}>
                  {currentScore}%
                </div>
                <div className="relative h-4 bg-foreground/5 rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentScore}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`absolute h-full ${getScoreBgColor(currentScore)} rounded-full`}
                  />
                </div>
                <p className="font-paragraph text-sm text-foreground/70">
                  Your resume needs improvement to pass ATS filters
                </p>
              </div>
            </motion.div>

            {/* Potential Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20"
            >
              <div className="text-center">
                <p className="font-paragraph text-sm text-foreground/60 mb-2">Potential Score After Improvements</p>
                <div className="text-7xl font-heading text-accent mb-4">
                  {potentialScore}%
                </div>
                <div className="relative h-4 bg-foreground/5 rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${potentialScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute h-full bg-accent rounded-full"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-accent">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-heading text-base">+{improvement}% improvement potential</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-8 border border-foreground/5 mb-12"
          >
            <h2 className="font-heading text-2xl text-foreground mb-6">Score Breakdown</h2>
            <div className="space-y-6">
              {scoreBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-base text-foreground">{item.category}</span>
                      <span className="font-paragraph text-xs text-foreground/60">({item.weight}% weight)</span>
                    </div>
                    <span className={`font-heading text-base ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                      className={`absolute h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Improvement Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-8 border border-foreground/5 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading text-2xl text-foreground">Improvement Suggestions</h2>
            </div>

            <div className="space-y-4">
              {improvements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-foreground/5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                        <h3 className="font-heading text-base text-foreground">{item.issue}</h3>
                        {item.priority === 'high' && (
                          <span className="px-2 py-1 bg-destructive/10 text-destructive font-paragraph text-xs rounded">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="font-paragraph text-sm text-foreground/70 mb-3">{item.fix}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-heading text-accent">+{item.scoreGain}%</div>
                      <div className="font-paragraph text-xs text-foreground/60">score gain</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
              <p className="font-paragraph text-sm text-foreground">
                <span className="font-bold">Total Potential Improvement:</span> Implementing all suggestions could increase your score by <span className="font-heading text-accent">+{improvement}%</span>
              </p>
            </div>
          </motion.div>

          {/* Keyword Analysis */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Matched Keywords */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-8 border border-foreground/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-heading text-xl text-foreground">Matched Keywords</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-accent/10 text-accent font-paragraph text-sm rounded-lg"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Missing Keywords */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-8 border border-foreground/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-destructive" />
                </div>
                <h2 className="font-heading text-xl text-foreground">Missing Keywords</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-destructive/10 text-destructive font-paragraph text-sm rounded-lg"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Section Completeness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl p-8 border border-foreground/5 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="font-heading text-2xl text-foreground">Section Completeness</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background rounded-xl border border-foreground/5"
                >
                  <span className="font-paragraph text-sm text-foreground">{section.name}</span>
                  {section.status === 'complete' ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : section.status === 'incomplete' ? (
                    <AlertCircle className="w-5 h-5 text-secondary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-primary text-primary-foreground font-heading text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Full Report
            </button>
            <Link to="/templates">
              <button className="bg-transparent text-primary border-2 border-primary font-heading text-base px-8 py-4 rounded-xl hover:bg-primary/5 transition-colors flex items-center gap-2">
                Get ATS Template
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
