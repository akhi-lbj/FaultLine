import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 w-full">
      <div className="text-zinc-100 p-8 md:p-16 max-w-4xl mx-auto font-sans leading-relaxed">
        <h1 className="text-3xl font-bold mb-8 font-display">FaultLine Privacy Policy</h1>
        
        <div className="space-y-8 text-zinc-300">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>Welcome to FaultLine. This Privacy Policy explains how we collect, use, store, and protect your information when you use our Risk Decision System application.</p>
            <p>FaultLine is designed to help users analyze transcripts, generate predictive risk insights, and manage a prioritized financial exposure portfolio. We take your privacy seriously and are committed to protecting the personal and business information you provide while using the application.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
            <p>When you use FaultLine, we may collect information that you provide directly to the application, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your email address when you sign in using your Google account.</li>
              <li>Transcript text, interview notes, or business conversations that you upload or enter for analysis.</li>
              <li>Project budget data, financial exposure values, and related portfolio information.</li>
              <li>Analysis results, risk scores, classifications, recommendations, and portfolio board data generated through the application.</li>
            </ul>
            <p>We use your Google account information only to identify your account and associate your saved portfolio data with your user profile.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">3. How We Use Your Information</h2>
            <p>We use the information collected through FaultLine only to provide and improve the application’s core services, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Analyzing transcripts and business conversations.</li>
              <li>Generating predictive risk indexes and decision-support insights.</li>
              <li>Creating and managing your financial exposure portfolio.</li>
              <li>Saving your session data and analysis results.</li>
              <li>Improving the reliability, performance, and usability of the application.</li>
            </ul>
            <p>FaultLine’s outputs are intended to support decision-making and should not be treated as financial, legal, investment, or professional advice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">4. How We Share Information</h2>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
            <p>Your information is used only for operating the FaultLine application and providing the services requested by you. We do not disclose your uploaded transcripts, financial data, or analysis results to external parties unless required by law, necessary to protect the security of the service, or authorized by you.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Data Security</h2>
            <p>We use reasonable technical and organizational measures designed to protect your data from unauthorized access, loss, misuse, alteration, or disclosure.</p>
            <p>However, no digital system can be guaranteed to be completely secure. You are responsible for ensuring that the information you upload is appropriate, lawful, and authorized for processing.</p>
            <p>You should not upload sensitive Personally Identifiable Information, confidential third-party data, regulated financial information, or private business information into FaultLine unless you have proper authorization from your organization or the relevant data owner.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">6. User Responsibilities</h2>
            <p>By using FaultLine, you agree that you are responsible for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The accuracy and legality of the data you upload.</li>
              <li>Ensuring that you have permission to process any transcripts, financial data, or business records entered into the application.</li>
              <li>Avoiding the upload of unnecessary sensitive personal information.</li>
              <li>Maintaining the security of your Google account and login credentials.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">7. Data Retention</h2>
            <p>FaultLine may retain your account information, uploaded data, analysis results, and portfolio records for as long as necessary to provide the application’s services.</p>
            <p>You may request deletion of your data where applicable. Some information may be retained if required for legal, security, or operational purposes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">8. Third-Party Services</h2>
            <p>FaultLine may rely on third-party services such as Google Sign-In or cloud infrastructure providers to operate the application.</p>
            <p>When you use Google Sign-In, your use of Google services is also subject to Google’s own privacy policies and terms. FaultLine only accesses the basic account information required to authenticate you and connect your data to your account.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in the application, legal requirements, or our data practices.</p>
            <p>Continued use of FaultLine after any updates means that you accept the revised Privacy Policy.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">10. Contact</h2>
            <p>For questions, concerns, or data-related requests, please contact the FaultLine team. <a href="mailto:faultlinesupport@gmail.com" className="text-blue-400 hover:underline">faultlinesupport@gmail.com</a></p>
          </section>

          <div className="pt-8 border-t border-zinc-800">
            <a href="#" className="inline-block text-sm bg-zinc-900 border border-zinc-800 px-4 py-2 rounded hover:bg-zinc-800 transition-colors">
              Back to App
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
