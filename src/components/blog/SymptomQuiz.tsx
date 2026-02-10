import { useState } from "react";
import { Brain, ChevronRight, RotateCcw, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  question: string;
  options: { label: string; scores: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your primary wellness concern?",
    options: [
      { label: "Difficulty concentrating or staying focused", scores: { adhd: 3, anxiety: 1, depression: 0 } },
      { label: "Persistent worry or nervousness", scores: { adhd: 0, anxiety: 3, depression: 1 } },
      { label: "Low mood or lack of motivation", scores: { adhd: 1, anxiety: 1, depression: 3 } },
      { label: "Trouble sleeping at night", scores: { adhd: 1, anxiety: 2, depression: 1 } },
    ],
  },
  {
    id: 2,
    question: "How often do you experience these symptoms?",
    options: [
      { label: "Occasionally (a few times a month)", scores: { adhd: 1, anxiety: 1, depression: 1 } },
      { label: "Frequently (several times a week)", scores: { adhd: 2, anxiety: 2, depression: 2 } },
      { label: "Daily — it affects my routine", scores: { adhd: 3, anxiety: 3, depression: 3 } },
    ],
  },
  {
    id: 3,
    question: "Which best describes your energy levels?",
    options: [
      { label: "Restless and scattered — I can't sit still", scores: { adhd: 3, anxiety: 2, depression: 0 } },
      { label: "Wired but tired — anxious energy", scores: { adhd: 1, anxiety: 3, depression: 1 } },
      { label: "Low and flat — hard to get started", scores: { adhd: 0, anxiety: 0, depression: 3 } },
      { label: "It changes throughout the day", scores: { adhd: 2, anxiety: 1, depression: 1 } },
    ],
  },
  {
    id: 4,
    question: "Have you tried CBD or THC products before?",
    options: [
      { label: "No, I'm completely new", scores: { adhd: 0, anxiety: 0, depression: 0 } },
      { label: "I've tried CBD but not THC", scores: { adhd: 1, anxiety: 1, depression: 1 } },
      { label: "Yes, I've used both", scores: { adhd: 1, anxiety: 1, depression: 1 } },
    ],
  },
  {
    id: 5,
    question: "What type of product do you prefer?",
    options: [
      { label: "Something I can take daily like a capsule", scores: { adhd: 1, anxiety: 0, depression: 1 } },
      { label: "Fast-acting for immediate relief", scores: { adhd: 0, anxiety: 2, depression: 0 } },
      { label: "A calming edible like gummies", scores: { adhd: 1, anxiety: 1, depression: 1 } },
      { label: "I'm open to anything", scores: { adhd: 0, anxiety: 0, depression: 0 } },
    ],
  },
];

interface ResultProfile {
  title: string;
  description: string;
  products: { name: string; link: string }[];
  blogPost: { title: string; slug: string };
}

const profiles: Record<string, ResultProfile> = {
  adhd: {
    title: "Focus & ADHD Support",
    description: "Based on your responses, you may benefit from cannabinoid products designed to enhance focus and support executive function. CBD combined with CBG has shown promise for concentration and cognitive clarity.",
    products: [
      { name: "ADHD Focus Capsules", link: "/product/adhd-focus-capsules" },
      { name: "Full-Spectrum CBD Oil", link: "/product/cbd-oil-full-spectrum" },
    ],
    blogPost: { title: "CBD and THC for ADHD", slug: "cbd-thc-adhd-focus-concentration" },
  },
  anxiety: {
    title: "Anxiety & Stress Relief",
    description: "Your responses suggest anxiety and stress are significant concerns. CBD activates serotonin receptors (5-HT1A) and enhances GABA signaling, providing natural calming effects without sedation.",
    products: [
      { name: "CBD Stress Spray", link: "/product/cbd-stress-spray" },
      { name: "Delta-8 Calm Gummies", link: "/product/delta-8-calm-gummies" },
    ],
    blogPost: { title: "CBD for Anxiety: Complete Guide", slug: "cbd-delta8-anxiety-stress-relief" },
  },
  depression: {
    title: "Mood & Depression Support",
    description: "Your responses indicate mood support as a primary need. Cannabinoids may help by stimulating dopamine pathways, modulating serotonin, and promoting neuroplasticity — all key factors in mood regulation.",
    products: [
      { name: "CBD Mood Softgels", link: "/product/cbd-mood-softgels" },
      { name: "Delta-9 Mood Tincture", link: "/product/delta-9-mood-tincture" },
    ],
    blogPost: { title: "CBD for Depression & Mood", slug: "cbd-thc-depression-mood-enhancement" },
  },
};

const SymptomQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ adhd: 0, anxiety: 0, depression: 0 });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option: { scores: Record<string, number> }) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);

    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const getResult = (): ResultProfile => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return profiles[sorted[0][0]];
  };

  const reset = () => {
    setCurrent(0);
    setScores({ adhd: 0, anxiety: 0, depression: 0 });
    setFinished(false);
  };

  const progress = finished ? 100 : (current / questions.length) * 100;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <Brain className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Wellness Assessment Quiz</h3>
          <p className="text-sm text-muted-foreground">Find the right cannabinoid for your needs</p>
        </div>
      </div>

      <Progress value={progress} className="mb-6 mt-4" />

      {!finished ? (
        <div className="animate-in fade-in duration-200">
          <p className="text-xs text-muted-foreground mb-2">
            Question {current + 1} of {questions.length}
          </p>
          <h4 className="font-semibold text-lg mb-4">{questions[current].question}</h4>
          <div className="grid gap-3">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="text-left p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
              >
                <span>{option.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {(() => {
            const result = getResult();
            return (
              <>
                <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl mb-4">
                  <h4 className="font-bold text-primary text-lg mb-2">Your Profile: {result.title}</h4>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Recommended Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.products.map((p) => (
                      <Button key={p.name} asChild variant="outline" size="sm">
                        <Link to={p.link}>
                          <ShoppingBag className="h-3 w-3 mr-1" /> {p.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Read More:</p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to={`/blog/${result.blogPost.slug}`}>{result.blogPost.title} →</Link>
                  </Button>
                </div>

                <Button variant="ghost" size="sm" onClick={reset}>
                  <RotateCcw className="h-3 w-3 mr-1" /> Retake Quiz
                </Button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default SymptomQuiz;
