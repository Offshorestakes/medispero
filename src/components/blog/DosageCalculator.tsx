import { useState } from "react";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DosageResult {
  startingDose: string;
  optimalRange: string;
  frequency: string;
  productType: string;
  notes: string;
}

const DosageCalculator = () => {
  const [weight, setWeight] = useState([150]);
  const [severity, setSeverity] = useState("");
  const [condition, setCondition] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState<DosageResult | null>(null);

  const calculate = () => {
    const w = weight[0];
    const baseMultiplier = w < 130 ? 0.1 : w < 180 ? 0.15 : w < 230 ? 0.2 : 0.25;

    let severityFactor = 1;
    if (severity === "moderate") severityFactor = 1.5;
    if (severity === "severe") severityFactor = 2;

    let experienceFactor = 1;
    if (experience === "some") experienceFactor = 1.3;
    if (experience === "experienced") experienceFactor = 1.6;

    const baseDose = Math.round(w * baseMultiplier * severityFactor * experienceFactor * 0.1);
    const startMg = Math.max(5, Math.round(baseDose * 0.5 / 5) * 5);
    const optimalLow = Math.max(10, Math.round(baseDose * 0.8 / 5) * 5);
    const optimalHigh = Math.max(15, Math.round(baseDose * 1.5 / 5) * 5);

    const productMap: Record<string, string> = {
      adhd: "CBD + CBG Focus Capsules or Full-Spectrum CBD Oil",
      anxiety: "Full-Spectrum CBD Oil or Delta-8 Calm Gummies",
      depression: "CBD Mood Softgels or Delta-9 Mood Tincture",
      sleep: "CBD + CBN Sleep Tincture or Sleep Gummies",
    };

    const notesMap: Record<string, string> = {
      adhd: "Take in the morning for focus. CBG enhances alertness. Avoid evening doses.",
      anxiety: "Split dose AM/PM. Sublingual oils work fastest for acute episodes.",
      depression: "Consistent daily use is key. Allow 2-3 weeks for full effect.",
      sleep: "Take 30-60 minutes before bed. Combine with CBN for enhanced effect.",
    };

    setResult({
      startingDose: `${startMg}mg`,
      optimalRange: `${optimalLow}-${optimalHigh}mg`,
      frequency: condition === "sleep" ? "Once daily (evening)" : "Twice daily (AM/PM)",
      productType: productMap[condition] || "Full-Spectrum CBD Oil",
      notes: notesMap[condition] || "Start low and increase gradually over 2 weeks.",
    });
  };

  const isComplete = severity && condition && experience;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">CBD Dosage Calculator</h3>
          <p className="text-sm text-muted-foreground">Get a personalized starting recommendation</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Weight */}
        <div>
          <Label className="mb-3 block">Body Weight: {weight[0]} lbs</Label>
          <Slider
            value={weight}
            onValueChange={setWeight}
            min={80}
            max={350}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>80 lbs</span>
            <span>350 lbs</span>
          </div>
        </div>

        {/* Condition */}
        <div>
          <Label className="mb-2 block">Primary Concern</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger><SelectValue placeholder="Select your concern" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="adhd">ADHD / Focus</SelectItem>
              <SelectItem value="anxiety">Anxiety / Stress</SelectItem>
              <SelectItem value="depression">Depression / Mood</SelectItem>
              <SelectItem value="sleep">Sleep / Insomnia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Severity */}
        <div>
          <Label className="mb-2 block">Symptom Severity</Label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger><SelectValue placeholder="How severe?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mild">Mild — Occasional symptoms</SelectItem>
              <SelectItem value="moderate">Moderate — Daily impact</SelectItem>
              <SelectItem value="severe">Severe — Significantly affects life</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience */}
        <div>
          <Label className="mb-2 block">CBD Experience Level</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger><SelectValue placeholder="Your experience" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">New to CBD</SelectItem>
              <SelectItem value="some">Some experience</SelectItem>
              <SelectItem value="experienced">Regular user</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculate} disabled={!isComplete} className="w-full">
          Calculate My Dosage <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 p-6 bg-primary/5 border border-primary/20 rounded-xl space-y-4 animate-in fade-in duration-300">
          <h4 className="font-bold text-primary">Your Personalized Recommendation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Starting Dose</p>
              <p className="text-2xl font-bold">{result.startingDose}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Optimal Range</p>
              <p className="text-2xl font-bold">{result.optimalRange}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Frequency</p>
              <p className="font-medium">{result.frequency}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Best Product</p>
              <p className="font-medium">{result.productType}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{result.notes}</p>
          <div className="flex items-start gap-2 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
            <Info className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              This is an educational estimate only. Always consult a healthcare professional before
              starting any supplement regimen. Individual responses vary.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DosageCalculator;
