import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Share2, MessageSquare, Calendar, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const copyText = (text: string, setCopied: (v: string) => void, id: string) => {
  navigator.clipboard.writeText(text);
  setCopied(id);
  setTimeout(() => setCopied(""), 2000);
};

const MarketingCopyPage = () => {
  const [copied, setCopied] = useState("");

  const CopyButton = ({ id, text }: { id: string; text: string }) => (
    <Button variant="ghost" size="sm" onClick={() => copyText(text, setCopied, id)} className="absolute top-2 right-2">
      {copied === id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
    </Button>
  );

  const emailSequences = [
    {
      id: "adhd-email-1",
      subject: "Is ADHD actually a dopamine problem? (New research)",
      preview: "The neuroscience behind why your brain craves stimulation — and what to do about it.",
      body: `Hi {{first_name}},

If you've ever wondered why your ADHD brain can hyperfocus on interesting tasks but can't sit through a meeting, the answer is dopamine.

New research confirms that ADHD brains have significantly lower anandamide levels — your body's natural "focus molecule."

We just published a comprehensive guide on how CBD, CBG, and Delta-8 THC support the dopamine pathways that ADHD brains need:

→ How CBD raises anandamide (the bliss molecule) by blocking FAAH
→ Why CBG is called the "focus cannabinoid" 
→ A 30-day dosing protocol used by thousands of adults with ADHD
→ Interactive dosage calculator based on your weight and symptoms

👉 Read the full article: [LINK to /blog/cbd-thc-adhd-focus-concentration]

No jitters. No crash. Just focused calm.

— The Medi Spero Team

P.S. Our ADHD Focus Capsules (25mg CBD + 10mg CBG) are specifically formulated for cognitive wellness. Shop now: [LINK to /products]`
    },
    {
      id: "adhd-email-2",
      subject: "Your 30-day ADHD focus protocol (save this)",
      preview: "Week-by-week guide: CBD + CBG foundation → Delta-8 optimization → maintenance.",
      body: `Hi {{first_name}},

Last email we talked about the science. Today: the protocol.

Here's the exact 30-day plan our customers use for ADHD focus support:

WEEK 1-2: Foundation
• Morning: 15mg CBD + 5mg CBG
• Midday: 10mg CBD (if afternoon focus drops)
• Evening: 15mg CBD only

WEEK 3-4: Optimize
• Morning: 20mg CBD + 10mg CBG + 5mg Delta-8
• Midday: 10mg CBD + 5mg CBG
• Evening: 20mg CBD (no Delta-8)

ONGOING: Maintain
• Track focus daily
• Adjust by 5mg every 5 days
• Cycle: 5 days on, 2 days off

Not sure about your ideal dose? Use our free calculator:
👉 [LINK to /blog/cbd-thc-adhd-focus-concentration]

All Medi Spero products are:
✅ 99% pure, pharmaceutical-grade
✅ Third-party tested (COA with every order)
✅ Free shipping on orders over $50

Shop the ADHD Focus Collection → [LINK to /category/adhd-focus]

Focus forward,
The Medi Spero Team`
    },
    {
      id: "anxiety-email-1",
      subject: "40 million Americans have anxiety. Here's what's actually working.",
      preview: "CBD activates the same receptors as Buspar — without the prescription.",
      body: `Hi {{first_name}},

Here's a number that should make us all uncomfortable: only 36.9% of the 40 million Americans with anxiety receive treatment.

Why? Because the options aren't great:
❌ Benzodiazepines → addictive within weeks
❌ SSRIs → 4-6 week delay + sexual side effects in 40-65%
❌ Therapy alone → helpful but slow for acute symptoms

There's a better path. We just published the most comprehensive guide on cannabinoids for anxiety we've ever written:

📖 "The Complete Science of CBD & Delta-8 for Anxiety"
→ How CBD activates serotonin 5-HT1A receptors (same target as Buspar)
→ Why Delta-8 calms without the paranoia of regular THC
→ Dosing protocols for GAD, social anxiety, panic disorder, and PTSD
→ Interactive symptom quiz to find YOUR ideal product

Read now: [LINK to /blog/cbd-delta8-anxiety-stress-relief]

Your peace of mind is worth it.

— The Medi Spero Team`
    },
    {
      id: "depression-email-1",
      subject: "Depression isn't a serotonin deficiency (here's what it actually is)",
      preview: "The 5 mechanisms behind depression — and how cannabinoids address all of them.",
      body: `Hi {{first_name}},

For decades we were told depression = "chemical imbalance." Take an SSRI, boost serotonin, feel better.

But modern neuroscience tells a more complex story. Depression involves:

1️⃣ Neuroplasticity failure (brain can't form new connections)
2️⃣ Chronic neuroinflammation (inflammatory cytokines damage brain tissue)
3️⃣ HPA axis dysregulation (stress system stuck on overdrive)
4️⃣ Dopamine circuit shutdown (nothing feels rewarding)
5️⃣ Endocannabinoid deficiency (depleted natural cannabinoids)

What's remarkable? CBD and hemp-derived THC address ALL FIVE.

Our newest article breaks down the science with an 8-week protocol:

📖 "CBD & THC for Depression: Neuroplasticity, Dopamine & Evidence-Based Mood Enhancement"

Key findings:
• CBD increased hippocampal BDNF by 42% in 4 weeks (vs 4-6 weeks for Prozac)
• Hemp-derived Delta-9 at 5-15mg restores reward circuit function
• Combined protocol showed 3-5 point mood improvement on 10-point scale by week 8

Read the full guide: [LINK to /blog/cbd-thc-depression-mood-enhancement]

There IS light. Let's find it together.

— The Medi Spero Team

If you or someone you know is in crisis, please contact the 988 Suicide & Crisis Lifeline (call or text 988).`
    }
  ];

  const socialPosts = [
    {
      id: "social-adhd-1",
      platform: "X / Twitter",
      text: `🧠 ADHD isn't a focus problem — it's a dopamine problem.

New research: Adults with ADHD have 23% lower anandamide levels.

CBD raises anandamide by blocking FAAH.
CBG enhances alertness without jitters.
Delta-8 provides gentle dopamine support.

Full guide + free dosage calculator ↓
[LINK]

#ADHD #CBD #Focus #MentalHealth`
    },
    {
      id: "social-adhd-2",
      platform: "Instagram / Facebook",
      text: `🎯 Struggling with focus? Your brain might be asking for cannabinoid support.

We just published the most comprehensive guide on CBD for ADHD — covering:

✅ The neuroscience (dopamine, anandamide, prefrontal cortex)
✅ Why CBG is called the "focus cannabinoid"
✅ A 30-day protocol with exact dosing
✅ Free interactive dosage calculator

No jitters. No crash. Just focused calm.

Link in bio → medispero.com/blog/cbd-thc-adhd-focus-concentration

#ADHD #ADHDSupport #CBD #CBG #FocusNaturally #MentalHealth #NeurodivergentCommunity #Cannabinoids #NaturalWellness #MediSpero`
    },
    {
      id: "social-anxiety-1",
      platform: "X / Twitter",
      text: `📊 CBD vs. Anxiety Medications:

CBD: Works in 30-60 min, no dependence
Benzos: Works in 15 min, addictive in 2-4 weeks
SSRIs: Takes 4-6 weeks, sexual side effects in 40-65%

CBD activates 5-HT1A serotonin receptors — the same target as Buspar.

Full dosing protocols for GAD, SAD, PTSD ↓
[LINK]`
    },
    {
      id: "social-anxiety-2",
      platform: "Instagram / Facebook",
      text: `😮‍💨 40 million Americans have anxiety. Only 36.9% get treatment.

Why? Because conventional options come with strings attached.

We wrote the definitive guide on CBD + Delta-8 for anxiety:

🔬 How CBD activates serotonin receptors (without a prescription)
📊 Complete comparison table: CBD vs. benzos vs. SSRIs
💊 Dosing protocols for:
   → Generalized Anxiety (GAD)
   → Social Anxiety (SAD)
   → Panic Disorder
   → PTSD

Plus: Take our free Wellness Assessment Quiz to find your ideal cannabinoid.

Your calm is waiting → Link in bio

#AnxietyRelief #CBD #Delta8 #MentalHealthMatters #NaturalAnxietyRelief #StressRelief #Wellness #MediSpero`
    },
    {
      id: "social-depression-1",
      platform: "X / Twitter",
      text: `Depression isn't just "low serotonin."

Modern neuroscience shows it involves:
1. Neuroplasticity failure
2. Chronic neuroinflammation
3. HPA axis dysregulation
4. Dopamine circuit shutdown
5. Endocannabinoid deficiency

CBD addresses ALL 5 mechanisms.

8-week protocol + research ↓
[LINK]`
    },
    {
      id: "social-depression-2",
      platform: "Instagram / Facebook",
      text: `🌅 Depression lies to you. Neuroscience tells a different story.

New research shows CBD increased brain BDNF (the "fertilizer for neurons") by 42% in just 4 weeks.

Our newest guide covers:
🧬 How CBD promotes neuroplasticity (new brain connections)
🔥 The inflammation-depression connection
💫 Why low-dose Delta-9 THC restores the ability to feel pleasure
📋 An 8-week evidence-based mood protocol

This isn't about toxic positivity. It's about giving your brain the tools it needs to heal.

Read the full guide → Link in bio

If you're in crisis: 988 Suicide & Crisis Lifeline (call or text 988) 💚

#Depression #MoodSupport #CBD #MentalHealth #Neuroplasticity #BDNF #HempWellness #MediSpero`
    }
  ];

  const metaDescriptions = [
    {
      id: "meta-adhd",
      page: "ADHD Blog Post",
      title: "CBD and THC for ADHD: How Cannabinoids Support Focus & Concentration | Medi Spero",
      description: "Explore how CBD, CBG & Delta-8 THC modulate dopamine pathways to support ADHD focus. Includes 30-day dosing protocol, interactive calculator & clinical evidence. Pharmaceutical-grade.",
      keywords: "CBD for ADHD, CBG focus, Delta-8 ADHD, cannabinoids concentration, dopamine support, ADHD natural treatment, CBD focus capsules, executive function support"
    },
    {
      id: "meta-anxiety",
      page: "Anxiety Blog Post",
      title: "CBD & Delta-8 THC for Anxiety: Dosing Protocols for GAD, SAD & PTSD | Medi Spero",
      description: "Complete science guide on CBD serotonin receptor activation & Delta-8 for anxiety relief. Evidence-based protocols for GAD, social anxiety, panic disorder & PTSD. No prescription needed.",
      keywords: "CBD anxiety, Delta-8 anxiety, natural anxiety relief, CBD vs benzodiazepines, serotonin 5-HT1A, GAD treatment, PTSD CBD, panic disorder relief"
    },
    {
      id: "meta-depression",
      page: "Depression Blog Post",
      title: "CBD & THC for Depression: Neuroplasticity & Mood Enhancement Strategies | Medi Spero",
      description: "How pharmaceutical-grade CBD & hemp-derived Delta-9 THC support mood via BDNF neuroplasticity, dopamine restoration & inflammation reduction. 8-week clinical protocol included.",
      keywords: "CBD depression, Delta-9 mood support, BDNF neuroplasticity, natural antidepressant, CBD vs SSRIs, mood enhancement, hemp-derived THC, anhedonia treatment"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Marketing Copy & Email Sequences | Medi Spero</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 section-padding">
        <div className="container-wide max-w-5xl">
          <div className="mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">Internal Reference</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog Marketing Copy</h1>
            <p className="text-muted-foreground max-w-2xl">
              Email sequences, social media posts, and meta descriptions for the 3 new SEO blog articles. 
              Copy any section with the copy button.
            </p>
          </div>

          {/* Meta Descriptions */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Meta Descriptions & SEO Titles</h2>
            </div>
            <div className="grid gap-6">
              {metaDescriptions.map((meta) => (
                <div key={meta.id} className="relative bg-muted/50 rounded-xl p-6 border border-border">
                  <CopyButton id={meta.id} text={`Title: ${meta.title}\nDescription: ${meta.description}\nKeywords: ${meta.keywords}`} />
                  <Badge variant="outline" className="mb-3">{meta.page}</Badge>
                  <p className="font-semibold text-sm mb-1">Title ({meta.title.length} chars):</p>
                  <p className="text-sm text-primary mb-3">{meta.title}</p>
                  <p className="font-semibold text-sm mb-1">Description ({meta.description.length} chars):</p>
                  <p className="text-sm text-muted-foreground mb-3">{meta.description}</p>
                  <p className="font-semibold text-sm mb-1">Keywords:</p>
                  <p className="text-xs text-muted-foreground">{meta.keywords}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-16" />

          {/* Email Sequences */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Email Marketing Sequences</h2>
            </div>
            <div className="grid gap-8">
              {emailSequences.map((email) => (
                <div key={email.id} className="relative bg-muted/50 rounded-xl p-6 border border-border">
                  <CopyButton id={email.id} text={`Subject: ${email.subject}\nPreview: ${email.preview}\n\n${email.body}`} />
                  <p className="font-semibold text-sm text-primary mb-1">Subject:</p>
                  <p className="font-medium mb-2">{email.subject}</p>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">Preview text:</p>
                  <p className="text-sm text-muted-foreground italic mb-4">{email.preview}</p>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">{email.body}</pre>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-16" />

          {/* Social Media Posts */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Share2 className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Social Media Posts</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {socialPosts.map((post) => (
                <div key={post.id} className="relative bg-muted/50 rounded-xl p-6 border border-border">
                  <CopyButton id={post.id} text={post.text} />
                  <Badge variant="outline" className="mb-3">{post.platform}</Badge>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">{post.text}</pre>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MarketingCopyPage;
