import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ResumeTemplates } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<ResumeTemplates[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const result = await BaseCrudService.getAll<ResumeTemplates>('resumetemplates');
      setTemplates(result.items);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string | undefined, format: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full max-w-[100rem] mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              ATS-Optimized Resume Templates
            </h1>
            <p className="font-paragraph text-sm text-foreground/70 max-w-2xl mx-auto">
              Download professionally designed resume templates that are guaranteed to pass ATS systems.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: CheckCircle,
                title: 'ATS Compatible',
                description: 'Tested with major ATS platforms'
              },
              {
                icon: FileText,
                title: 'Multiple Formats',
                description: 'Available in PDF and DOCX'
              },
              {
                icon: Download,
                title: 'Instant Download',
                description: 'Get your template immediately'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-foreground/5 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-base text-foreground mb-2">{feature.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="min-h-[400px]">
            {isLoading ? null : templates.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template, index) => (
                  <motion.div
                    key={template._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden border border-foreground/5 hover:shadow-xl transition-shadow"
                  >
                    {/* Preview Image */}
                    <div className="aspect-[3/4] bg-foreground/5 overflow-hidden">
                      {template.previewImage && (
                        <Image
                          src={template.previewImage}
                          alt={template.templateName || 'Resume template preview'}
                          className="w-full h-full object-cover"
                          width={400}
                        />
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <h3 className="font-heading text-xl text-foreground mb-2">
                        {template.templateName || 'Resume Template'}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 mb-6">
                        {template.description || 'Professional ATS-optimized resume template'}
                      </p>

                      {/* Download Buttons */}
                      <div className="flex gap-3">
                        {template.downloadPdfUrl && (
                          <button
                            onClick={() => handleDownload(template.downloadPdfUrl, 'PDF')}
                            className="flex-1 bg-primary text-primary-foreground font-heading text-sm px-4 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            PDF
                          </button>
                        )}
                        {template.downloadDocxUrl && (
                          <button
                            onClick={() => handleDownload(template.downloadDocxUrl, 'DOCX')}
                            className="flex-1 bg-secondary text-secondary-foreground font-heading text-sm px-4 py-3 rounded-xl hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            DOCX
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-foreground/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-foreground/40" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">No Templates Available</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Templates will be available soon. Check back later!
                </p>
              </div>
            )}
          </div>

          {/* Template Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-white rounded-xl p-8 border border-foreground/5"
          >
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">
              What Makes Our Templates ATS-Friendly?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Simple Single-Column Layout',
                  description: 'No tables or complex multi-column designs that confuse ATS systems'
                },
                {
                  title: 'Standard Section Headers',
                  description: 'Clear, recognizable section names like "Work Experience" and "Education"'
                },
                {
                  title: 'Clean Typography',
                  description: 'Standard fonts that are easily readable by all ATS platforms'
                },
                {
                  title: 'No Graphics or Images',
                  description: 'Text-only format ensures all information is properly parsed'
                },
                {
                  title: 'Proper Formatting',
                  description: 'Consistent use of bullet points, dates, and job titles'
                },
                {
                  title: 'Keyword Optimized',
                  description: 'Structured to highlight relevant skills and experience'
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-foreground mb-1">{feature.title}</h3>
                    <p className="font-paragraph text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
