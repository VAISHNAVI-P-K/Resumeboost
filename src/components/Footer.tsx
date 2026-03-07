// Connect Section
<div>
  <h3 className="font-heading text-base text-background mb-4">Connect</h3>
  <div className="flex gap-4">
    {/* ✅ FIXED: Add actual URLs for social profiles */}
    <a
      href="https://linkedin.com/company/resumeboost" // ✅ FIXED: Use real URL
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
      aria-label="LinkedIn"
    >
      <Linkedin className="w-5 h-5 text-background" />
    </a>
    <a
      href="https://twitter.com/resumeboost" // ✅ FIXED: Use real URL
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
      aria-label="Twitter"
    >
      <Twitter className="w-5 h-5 text-background" />
    </a>
    <a
      href="https://github.com/VAISHNAVI-P-K/Resumeboost" // ✅ FIXED: Link to actual repo
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
      aria-label="GitHub"
    >
      <Github className="w-5 h-5 text-background" />
    </a>
    <a
      href="mailto:support@resumeboost.com"
      className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
      aria-label="Email"
    >
      <Mail className="w-5 h-5 text-background" />
    </a>
  </div>
</div>
