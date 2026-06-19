export interface TranscriptTemplate {
  name: string;
  label: string;
  budget: number;
  description: string;
  text: string;
}

export const TRANSCRIPT_TEMPLATES: TranscriptTemplate[] = [
  {
    name: "AI Auto-Summarized Transcripts",
    label: "Volatile (Severe Risk Signal)",
    budget: 150000,
    description: "Contains severe politeness markers, interviewer leading prompts, and major workflow contradictions.",
    text: `INTERVIEWER: Thanks for taking the time today! Wouldn't it be highly helpful if we consolidated all of your raw chat panels into a single premium AI portal that auto-extracted key highlights?
CLIENT: Oh yeah, absolutely. That sounds really interesting and neat! I think my teammates would enjoy playing with that twice a month. Nice work!
INTERVIEWER: That is fantastic to hear. If we built this, would you migrate all of your tracking protocols over by next quarter?
CLIENT: Yes, that looks very elegant and convenient. I'm sure my VP would love to look at it when they review compliance budgets next fiscal year.
INTERVIEWER: Awesome. How do you solve this summarization problem today?
CLIENT: Well, we don't really have any budget allocated to do any custom work on this right now. We currently just copy-paste the direct text into an Excel sheet and a shared team chat, which takes about 5 minutes once a month. Honestly, Excel does everything we need for forecasting, so we're completely fine.
INTERVIEWER: Don't you think having an automatic dashboard here would save you all that clicking?
CLIENT: Yeah, definitely, clicking is annoying.`
  },
  {
    name: "Excel Customer Importer Tool",
    label: "Validated (Strong Core Need)",
    budget: 65000,
    description: "Features intense customer pain points, behavioral friction, and direct willingness-to-pay signals.",
    text: `INTERVIEWER: How do you currently import external client databases into your operations terminal?
CLIENT: It is a complete and absolute nightmare. Every Monday we receive raw Excel lists from 5 different field partners. The formatting is completely broken—some list names, others skip emails. I currently spend 4 hours every single Monday manually typing, copying, formatting, and correcting cell errors. I've literally begged my manager to hire a freelancer just for this.
INTERVIEWER: Have you tried looking for software products to do this?
CLIENT: Yes! I tried installing two different tools from the Web, but they failed because they didn't support our custom compliance schema. I actually paid $40 out of my own pocket for an imports plug-in last month but it kept crashing.
INTERVIEWER: If we built a compliant custom importer where you drag and drop columns directly, what would that be worth to your squad?
CLIENT: I would literally sign a Purchase Order today. We have a pre-approved budget of $12,000 annually for operations SaaS, and since this saves me 16 hours of grueling manual work every month, I can guarantee my director would approve the invoice on day one. We are desperate for this.`
  },
  {
    name: "Slack Real-Time Notifications Engine",
    label: "Indecisive (Conditional Review)",
    budget: 120000,
    description: "Displays moderate interest and valid pain points, but suffers from intermediate methodology bias.",
    text: `INTERVIEWER: How do you currently stay on top of critical server status failures?
CLIENT: Right now, we get email alerts sent to our team alias. It is somewhat messy because people miss threads, which delays incident response by about an hour.
INTERVIEWER: If we pushed these alerts directly as interactive Slack notifications, would that solve your incident delays?
CLIENT: Yes, Slack is where we spend 90% of our active communication time. Pushing notifications directly into our #ops channel would certainly make the alerts highly visible and improve coordination.
INTERVIEWER: Is that something your IT director would commit budget toward?
CLIENT: Maybe at some point next summer. Alerts are important, but currently our core focus is upgrading database clusters, so getting Slack alerts is more of a 'nice-to-have' convenience rather than a blocker. We could probably live with emails for another year, but a Slack connector would definitely look neat and clean.`
  }
];
