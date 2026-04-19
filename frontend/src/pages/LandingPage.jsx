import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, FileSearch, Shield, Sparkles, Zap, Upload, CheckCircle } from 'lucide-react';
import { GradientButton } from '../components/ui/gradient-button';

/* ═══════════════════════════════════════════════════════════════
   HERO DATA — each slide has one background + one headline
   ═══════════════════════════════════════════════════════════════ */
const heroSlides = [
  {
    bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
    subtitle: "AI-Powered Tool",
    title: "Smart Resume Analyzer",
    description: "Get instant ATS scores, skill gap detection, and AI-powered improvement suggestions.",
  },
  {
    bg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
    subtitle: "Intelligent Detection",
    title: "Skill Gap Analysis",
    description: "Our AI identifies missing skills and tells you exactly what to add for your dream role.",
  },
  {
    bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
    subtitle: "Actionable Insights",
    title: "AI Feedback Engine",
    description: "Receive personalized, actionable recommendations to boost your interview chances.",
  },
  {
    bg: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80",
    subtitle: "Career Success",
    title: "Land Your Dream Job",
    description: "Optimize your resume with data-driven strategies trusted by thousands.",
  },
];

const features = [
  {
    title: "ATS Score Analysis",
    description: "Get your resume's ATS compatibility score. Understand how well it passes the automated screening systems used by 98% of Fortune 500 companies.",
    icon: <BarChart3 className="h-6 w-6" />,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Smart Skill Extraction",
    description: "Our AI identifies which skills from the job description are present or missing in your resume with intelligent fuzzy matching.",
    icon: <Brain className="h-6 w-6" />,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Job Role Matching",
    description: "See how well your resume aligns with specific job roles across 10+ industry categories with detailed gap analysis.",
    icon: <FileSearch className="h-6 w-6" />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "AI-Powered Suggestions",
    description: "Receive actionable, personalized recommendations to improve your resume and dramatically increase your interview chances.",
    icon: <Sparkles className="h-6 w-6" />,
    gradient: "from-pink-500 to-rose-500",
  },
];

const stats = [
  { value: "98%", label: "ATS Accuracy" },
  { value: "10+", label: "Job Categories" },
  { value: "50+", label: "Skills Tracked" },
  { value: "<3min", label: "Analysis Time" },
];

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDESHOW — clean, no-overlap, single text at a time
   ═══════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ── Background images (crossfade) ── */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={slide.bg}
          src={slide.bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          draggable={false}
        />
      </AnimatePresence>

      {/* ── Dark overlay for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 z-[1]" />

      {/* ── Navbar ── */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
            R
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Rezumate</span>
        </div>
        <Link to="/auth">
          <GradientButton variant="ghost" size="sm">
            Get Started <ArrowRight className="h-4 w-4 ml-1" />
          </GradientButton>
        </Link>
      </nav>

      {/* ── Centered content — ONLY ONE active slide shown ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Subtitle pill */}
            <p className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm uppercase tracking-widest text-indigo-300 font-medium">
              {slide.subtitle}
            </p>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              {slide.title}
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed">
              {slide.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/auth">
                <GradientButton variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Get Started Free
                </GradientButton>
              </Link>
              <Link to="/upload">
                <GradientButton variant="ghost" size="lg" icon={<Upload className="h-4 w-4" />} iconPosition="left">
                  Upload Resume
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); clearInterval(intervalRef.current); }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? 'w-8 bg-white'
                : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════════ */
const LandingPage = () => {
  return (
    <div className="bg-[#020617]">
      {/* HERO */}
      <HeroSection />

      {/* STATS BAR */}
      <section className="relative z-10 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/50 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Features
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                optimize your resume
              </span>
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-lg text-white/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our AI-powered platform provides comprehensive analysis to help you get past
              ATS systems and land more interviews.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-5 shadow-lg`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/95 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gradient-to-b from-[#020617] via-[#0a1128] to-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Three simple steps
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {[
              { step: "01", title: "Upload", desc: "Upload your PDF resume — takes just seconds.", icon: <Upload className="h-6 w-6" /> },
              { step: "02", title: "Analyze", desc: "Our AI scans your resume against ATS patterns and job-role requirements.", icon: <Brain className="h-6 w-6" /> },
              { step: "03", title: "Improve", desc: "Get your score, missing skills, and actionable improvement suggestions.", icon: <CheckCircle className="h-6 w-6" /> },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-6 shadow-lg shadow-indigo-500/20">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-indigo-400 tracking-widest mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[128px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to land your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              dream job?
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/50 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            Upload your resume now and get instant AI-powered analysis with actionable
            recommendations to boost your ATS score.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/auth">
              <GradientButton variant="primary" size="xl" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                Get Started Free
              </GradientButton>
            </Link>
            <Link to="/upload">
              <GradientButton variant="ghost" size="xl">
                Analyze Resume
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;