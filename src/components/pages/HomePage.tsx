// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Target, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Zap, 
  ArrowRight, 
  Shield, 
  Search, 
  Layout, 
  BarChart3, 
  Cpu,
  ChevronRight,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Utility Components ---

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="h-px w-8 bg-primary/50"></span>
    <span className="text-primary font-heading text-sm uppercase tracking-wider font-bold">{children}</span>
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/20 selection:text-primary">
      <Header />
      
      <main className="w-full flex flex-col items-center">
        <HeroSection />
        <LogoTicker />
        <ProblemStatementSection />
        <HowItWorksSection />
        <FeatureBentoGrid />
        <InteractiveScoreSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

// --- Sections ---

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[110vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <GridPattern />
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-[100rem] w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-foreground/5 shadow-sm text-sm font-heading text-foreground/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            AI-Powered Resume Intelligence
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground mb-8 max-w-6xl z-20 relative"
        >
          Beat the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ATS System</span>.
          <br />
          Land the Interview.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-paragraph text-lg md:text-xl text-foreground/60 max-w-2xl mb-12 leading-relaxed"
        >
          90% of resumes are rejected by automated systems before a human ever sees them. 
          ResumeBoost decodes the algorithm and optimizes your application in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center z-30"
        >
          <Link to="/analyzer" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
            <button className="relative w-full sm:w-auto bg-primary text-white font-heading font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Analyze My Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/templates">
            <button className="w-full sm:w-auto bg-white text-foreground border border-foreground/10 font-heading font-bold text-lg px-8 py-4 rounded-xl hover:bg-foreground/5 transition-all">
              View ATS Templates
            </button>
          </Link>
        </motion.div>

        {/* Floating UI Elements - Parallax */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-1/2 -left-12 lg:left-0 hidden xl:block pointer-events-none z-0"
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-foreground/5 w-72 rotate-[-6deg]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-foreground/50 font-heading uppercase">Status</div>
                <div className="text-lg font-bold text-red-600">Not Optimized</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-foreground/5 rounded-full w-full" />
              <div className="h-2 bg-foreground/5 rounded-full w-3/4" />
              <div className="h-2 bg-foreground/5 rounded-full w-5/6" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute top-2/3 -right-12 lg:right-0 hidden xl:block pointer-events-none z-0"
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-foreground/5 w-72 rotate-[6deg]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-foreground/50 font-heading uppercase">ATS Score</div>
                <div className="text-lg font-bold text-accent">94/100</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-foreground/60">
                <span>Keywords</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 bg-foreground/5 rounded-full w-full overflow-hidden">
                <div className="h-full bg-accent w-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Image / Dashboard Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        style={{ perspective: '1000px' }}
        className="w-full max-w-[90rem] mt-20 relative z-10"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-foreground/10 bg-white">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-50" />
           <Image 
             src="https://static.wixstatic.com/media/2e45bf_b0b495719d7349459d1fb07bde6d5b47~mv2.png?originWidth=1600&originHeight=896" 
             alt="ResumeBoost Dashboard Interface" 
             width={1600}
             height={900}
             className="w-full h-auto object-cover"
           />
           {/* Overlay UI Mockup */}
           <div className="absolute top-8 left-8 right-8 bottom-8 z-20 pointer-events-none hidden md:block">
              <div className="flex h-full gap-6">
                 <div className="w-1/3 bg-white/90 backdrop-blur-md rounded-xl border border-foreground/5 shadow-lg p-6 flex flex-col gap-4">
                    <div className="h-8 w-32 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-4 w-full bg-foreground/5 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-foreground/5 rounded animate-pulse" />
                    <div className="mt-auto p-4 bg-accent/5 rounded-lg border border-accent/10">
                       <div className="text-accent font-bold text-2xl">Top 5%</div>
                       <div className="text-accent/80 text-sm">Candidate Ranking</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}

function LogoTicker() {
  return (
    <section className="w-full py-12 border-y border-foreground/5 bg-white overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-heading text-foreground/40 uppercase tracking-widest">Optimized for all major ATS platforms</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
          {['Workday', 'Greenhouse', 'Lever', 'Taleo', 'iCIMS', 'Jobvite', 'SmartRecruiters', 'BambooHR'].map((logo, i) => (
            <span key={i} className="text-2xl md:text-3xl font-heading font-bold text-foreground/20 select-none">
              {logo}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {['Workday', 'Greenhouse', 'Lever', 'Taleo', 'iCIMS', 'Jobvite', 'SmartRecruiters', 'BambooHR'].map((logo, i) => (
            <span key={`dup-${i}`} className="text-2xl md:text-3xl font-heading font-bold text-foreground/20 select-none">
              {logo}
            </span>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

function ProblemStatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 bg-background relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative z-10">
          <SectionLabel>The Problem</SectionLabel>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl text-foreground mb-8 leading-tight"
          >
            Your resume is speaking a language <br/>
            <span className="text-destructive">robots don't understand.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-paragraph text-lg text-foreground/70 mb-8 max-w-xl"
          >
            Modern hiring relies on Applicant Tracking Systems (ATS) to filter candidates. 
            Complex formatting, missing keywords, and unreadable layouts cause 75% of qualified candidates to be rejected instantly.
          </motion.p>
          
          <div className="space-y-4">
            {[
              "Tables and columns confuse parsers",
              "Missing industry keywords lower ranking",
              "Graphics and icons are unreadable",
              "Generic descriptions fail relevance checks"
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                </div>
                <span className="font-paragraph text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[600px] w-full">
          {/* Abstract representation of a resume being shredded/rejected */}
          <div className="absolute inset-0 bg-foreground/5 rounded-3xl overflow-hidden border border-foreground/5">
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-[1px] h-full bg-foreground/20 mx-auto" />
                <div className="h-[1px] w-full bg-foreground/20 my-auto absolute" />
             </div>
             
             {/* Floating "Rejected" Resumes */}
             {[1, 2, 3].map((i) => (
               <motion.div
                 key={i}
                 initial={{ y: 100, opacity: 0, rotate: 0 }}
                 animate={isInView ? { 
                   y: [100, -50, -200], 
                   opacity: [0, 1, 0],
                   rotate: [0, i % 2 === 0 ? 10 : -10]
                 } : {}}
                 transition={{ 
                   duration: 4, 
                   repeat: Infinity, 
                   delay: i * 1.5,
                   ease: "linear"
                 }}
                 className="absolute left-1/2 top-1/2 -translate-x-1/2 w-64 h-80 bg-white shadow-xl rounded-lg border border-foreground/10 p-4 flex flex-col gap-3"
               >
                 <div className="w-12 h-12 bg-foreground/10 rounded-full mb-2" />
                 <div className="h-4 bg-foreground/10 rounded w-3/4" />
                 <div className="h-3 bg-foreground/5 rounded w-full" />
                 <div className="h-3 bg-foreground/5 rounded w-full" />
                 <div className="h-3 bg-foreground/5 rounded w-5/6" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-destructive text-destructive font-bold text-2xl px-4 py-2 rounded -rotate-12 opacity-80">
                   REJECTED
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    {
      id: "01",
      title: "Upload & Parse",
      desc: "Upload your existing resume (PDF or DOCX) and the job description you're targeting. Our engine extracts every detail.",
      icon: Upload,
      color: "bg-blue-500"
    },
    {
      id: "02",
      title: "Deep Analysis",
      desc: "We compare your profile against the job requirements using NLP to identify keyword gaps, formatting errors, and missing skills.",
      icon: Search,
      color: "bg-indigo-500"
    },
    {
      id: "03",
      title: "Optimize & Export",
      desc: "Follow our actionable suggestions to increase your score, then export a perfectly formatted, ATS-friendly resume.",
      icon: TrendingUp,
      color: "bg-emerald-500"
    }
  ];

  return (
    <section ref={containerRef} className="w-full bg-white relative">
      <div className="max-w-[100rem] mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sticky Left Content */}
          <div className="lg:w-1/2 h-fit lg:sticky lg:top-32 self-start">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-8">
              From rejected to <br/>
              <span className="text-primary">shortlisted</span> in 3 steps.
            </h2>
            <p className="font-paragraph text-lg text-foreground/60 mb-12 max-w-md">
              Our process is designed to be fast, transparent, and effective. No black box algorithms—just clear, data-driven improvements.
            </p>
            
            <div className="hidden lg:block relative h-2 bg-foreground/5 rounded-full w-full max-w-md overflow-hidden">
              <motion.div 
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                className="absolute inset-y-0 left-0 bg-primary w-full"
              />
            </div>
          </div>

          {/* Scrollable Right Content */}
          <div className="lg:w-1/2 flex flex-col gap-32 pb-32">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-background rounded-3xl p-8 md:p-12 border border-foreground/5 shadow-lg overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-64 h-64 ${step.color} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 group-hover:opacity-10`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            <step.icon className="w-8 h-8" />
          </div>
          <span className="text-6xl font-heading font-bold text-foreground/5">{step.id}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{step.title}</h3>
        <p className="text-foreground/70 font-paragraph leading-relaxed">{step.desc}</p>
      </div>

      {/* Decorative Image Placeholder */}
      <div className="mt-8 rounded-xl overflow-hidden border border-foreground/5 h-48 relative bg-white">
         <Image 
           src="https://static.wixstatic.com/media/2e45bf_63a4d29c20014a09a5db8389c8ebbcd9~mv2.png?originWidth=768&originHeight=192" 
           alt={`Illustration for ${step.title}`}
           className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
         />
      </div>
    </motion.div>
  );
}

function FeatureBentoGrid() {
  return (
    <section className="w-full py-32 bg-background">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel>Features</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">Comprehensive Analysis Engine</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          
          {/* Large Feature - Keyword Match */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-8 border border-foreground/5 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-32 h-32" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">Keyword Match Score</h3>
                <p className="text-foreground/60 max-w-md">Instantly see which keywords from the job description are missing from your resume. Our NLP engine identifies hard skills, soft skills, and industry terminology.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'AWS', 'System Design'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {tag}
                  </span>
                ))}
                {['Docker', 'Kubernetes'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-1 opacity-60">
                    <span className="w-3 h-3 block text-center leading-none">-</span> {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tall Feature - Formatting */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-primary to-secondary text-white rounded-3xl p-8 shadow-lg relative overflow-hidden"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">Formatting Check</h3>
              <p className="text-white/80 mb-8">Detects ATS-killing formatting issues like tables, columns, headers, and unreadable fonts.</p>
              
              <div className="mt-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tables</span>
                    <span className="text-red-300">Detected</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex items-center justify-between text-sm">
                    <span>Columns</span>
                    <span className="text-emerald-300">Clean</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex items-center justify-between text-sm">
                    <span>Images</span>
                    <span className="text-emerald-300">None</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Square Feature - Skills */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 border border-foreground/5 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Skills Gap Analysis</h3>
            <p className="text-foreground/60 text-sm">Compare your hard and soft skills against the job requirements.</p>
          </motion.div>

          {/* Square Feature - Sections */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 border border-foreground/5 shadow-sm relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Section Completeness</h3>
            <p className="text-foreground/60 text-sm">Ensure all critical sections (Summary, Experience, Education) are present.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function InteractiveScoreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Animated counters
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setScore(prev => {
          if (prev >= 87) {
            clearInterval(interval);
            return 87;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="w-full py-32 bg-white border-y border-foreground/5">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Dashboard */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-50" />
            <div className="relative bg-background rounded-2xl border border-foreground/5 shadow-2xl p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">Optimization Report</h3>
                  <p className="text-sm text-foreground/50">Generated just now</p>
                </div>
                <div className="px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">
                  Ready for Export
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="text-center p-6 bg-white rounded-xl border border-foreground/5">
                  <div className="text-sm text-foreground/50 mb-2">Initial Score</div>
                  <div className="text-4xl md:text-5xl font-heading font-bold text-foreground/30">62%</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border-2 border-accent/20 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5" />
                  <div className="relative z-10">
                    <div className="text-sm text-accent mb-2 font-bold">Potential Score</div>
                    <div className="text-4xl md:text-5xl font-heading font-bold text-accent">
                      {score}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Optimization Progress</span>
                  <span className="text-primary">{Math.round((score / 87) * 100)}%</span>
                </div>
                <div className="h-3 bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(score / 87) * 100}%` } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>Results</SectionLabel>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8">
              See the impact <br/>
              <span className="text-accent">before you apply.</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              Don't guess if your resume is good enough. ResumeBoost gives you a concrete score and a clear roadmap to improvement.
            </p>
            
            <ul className="space-y-6 mb-10">
              {[
                { label: "Increase interview callbacks by 3x", icon: Star },
                { label: "Pass automated filters with confidence", icon: Shield },
                { label: "Stand out to hiring managers", icon: CheckCircle }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-heading text-lg text-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/analyzer">
              <button className="group flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all">
                Start your free analysis <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="w-full py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 skew-y-3 scale-110 origin-bottom-left" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-8 tracking-tight">
            Ready to get hired?
          </h2>
          <p className="font-paragraph text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
            Join thousands of job seekers who have optimized their resumes and landed jobs at top tech companies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/analyzer" className="w-full sm:w-auto">
              <button className="w-full bg-primary text-white font-heading font-bold text-xl px-10 py-5 rounded-xl shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                Optimize My Resume Now
              </button>
            </Link>
            <Link to="/templates" className="w-full sm:w-auto">
              <button className="w-full bg-white text-foreground border border-foreground/10 font-heading font-bold text-xl px-10 py-5 rounded-xl hover:bg-foreground/5 transition-all duration-300">
                Browse Templates
              </button>
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-foreground/40">
            No credit card required for initial analysis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}