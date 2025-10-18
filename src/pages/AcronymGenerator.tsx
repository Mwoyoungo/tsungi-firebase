import React, { useState } from 'react';

// CA1 Acronym Library Data
const ca1AcronymLibrary = [
  {
    id: 'create-great-lists',
    acronym: 'CREATE GREAT LISTS',
    chapter: 'Chapter 3: External Environment',
    topic: 'Factors to consider in relation to the external environment',
    letters: [
      { letter: 'C', term: 'Commercial requirements', explanation: 'e.g. competition and the underwriting cycle' },
      { letter: 'R', term: 'Regulation and legislation', explanation: 'Legal requirements and regulatory compliance' },
      { letter: 'E', term: 'Environmental issues', explanation: 'Environmental factors affecting business' },
      { letter: 'A', term: 'Accounting standards', explanation: 'Financial reporting requirements' },
      { letter: 'T', term: 'Tax', explanation: 'Tax implications and requirements' },
      { letter: 'E', term: 'Economic outlook', explanation: 'Economic conditions and forecasts' },
      { letter: 'G', term: 'Governance', explanation: 'Corporate governance requirements' },
      { letter: 'R', term: 'Risk management requirements', explanation: 'Risk management frameworks' },
      { letter: 'E', term: 'Experience overseas', explanation: 'International experience and lessons' },
      { letter: 'A', term: 'Adequacy of capital and solvency', explanation: 'Capital and solvency requirements' },
      { letter: 'T', term: 'Trends – demographic', explanation: 'Population and demographic changes' },
      { letter: 'L', term: 'Lifestyle considerations', explanation: 'Changing lifestyle patterns' },
      { letter: 'I', term: 'Institutional structure', explanation: 'Institutional framework and structure' },
      { letter: 'S', term: 'Social and cultural trends', explanation: 'Social and cultural changes' },
      { letter: 'T', term: 'Technology', explanation: 'Technological developments and impacts' },
      { letter: 'S', term: 'State benefits', explanation: 'Government benefits and social security' }
    ]
  },
  {
    id: 'fat-sir',
    acronym: 'FAT SIR',
    chapter: 'Chapter 12: Capital Project Appraisal',
    topic: 'Ways of mitigating risks in a capital project',
    letters: [
      { letter: 'F', term: 'Further research', explanation: 'Conduct additional research and analysis' },
      { letter: 'A', term: 'Avoid', explanation: 'Avoid the risk entirely' },
      { letter: 'T', term: 'Transfer', explanation: 'Transfer the risk to another party' },
      { letter: 'S', term: 'Share', explanation: 'Share the risk with partners' },
      { letter: 'I', term: 'Insure', explanation: 'Purchase insurance coverage' },
      { letter: 'R', term: 'Reduce', explanation: 'Reduce the risk impact or probability' }
    ]
  },
  {
    id: 'rapid-cost',
    acronym: 'RAPID COST',
    chapter: 'Chapter 10: Contract Design',
    topic: 'Expenses incurred by a product provider',
    letters: [
      { letter: 'R', term: 'Renewal administration', explanation: 'e.g. collecting premiums / contributions' },
      { letter: 'A', term: 'Asset management', explanation: 'Managing investment portfolios' },
      { letter: 'P', term: 'Profits', explanation: 'Profit margins and distributions' },
      { letter: 'I', term: 'Initial administration', explanation: 'e.g. setting up new client records' },
      { letter: 'D', term: 'Design of the contract', explanation: 'Product design and development costs' },
      { letter: 'C', term: 'Commission', explanation: 'Sales commission and incentives' },
      { letter: 'O', term: 'Overheads', explanation: 'General business overheads' },
      { letter: 'S', term: 'Sales/advertising', explanation: 'Marketing and promotional expenses' },
      { letter: 'T', term: 'Terminal', explanation: 'e.g. paying benefits' }
    ]
  },
  {
    id: 'pierces-creamer',
    acronym: 'PIERCES & CREAMeR',
    chapter: 'Chapter 19: Overseas Markets',
    topic: 'Factors to consider when investing in emerging markets',
    letters: [
      { letter: 'P', term: 'Political stability', explanation: 'Degree of political stability' },
      { letter: 'I', term: 'Information', explanation: 'Availability and quality of information' },
      { letter: 'E', term: 'Expected return', explanation: 'Higher expected return due to higher risk' },
      { letter: 'R', term: 'Regulation', explanation: 'Market regulation quality' },
      { letter: 'C', term: 'Currency stability', explanation: 'Currency stability and strength' },
      { letter: 'E', term: 'Extra diversification', explanation: 'Less correlation than larger developed markets' },
      { letter: 'S', term: 'Small countries', explanation: 'Markets highly influenced by international sentiment' },
      { letter: 'C', term: 'Communication problems', explanation: 'Language and communication barriers' },
      { letter: 'R', term: 'Restrictions', explanation: 'Restrictions on foreign investment' },
      { letter: 'E', term: 'Economic growth', explanation: 'Possibility of high economic growth' },
      { letter: 'A', term: 'Asset valuation', explanation: 'Current market valuation of assets' },
      { letter: 'M', term: 'Marketability', explanation: 'Level of marketability' },
      { letter: 'R', term: 'Range', explanation: 'Range of companies available' }
    ]
  }
];

interface Letter {
  letter: string;
  term: string;
  explanation: string;
}

interface GeneratedAcronym {
  acronym: string;
  topic: string;
  letters: Letter[];
  context: string;
  category: string;
}

const AcronymGenerator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const [generatedAcronym, setGeneratedAcronym] = useState<GeneratedAcronym | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCA1Library, setShowCA1Library] = useState(false);
  const [savedAcronyms, setSavedAcronyms] = useState<GeneratedAcronym[]>([]);

  const saveAcronymToLibrary = () => {
    if (generatedAcronym) {
      const newAcronym = {
        ...generatedAcronym,
        id: Date.now().toString()
      };
      setSavedAcronyms(prev => [...prev, newAcronym as any]);
    }
  };

  const deleteAcronym = (id: string) => {
    setSavedAcronyms(prev => prev.filter(item => (item as any).id !== id));
  };

  // Intelligent acronym generation using Flowise API
  const generateSmartAcronym = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch('https://cloud.flowiseai.com/api/v1/prediction/f4e3fd37-4d9f-4d7b-bb7f-ed4d3f26eb30', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputText
        })
      });

      const data = await response.json();
      console.log('API Response:', data);

      let acronymData;

      // Try to parse the response
      if (typeof data.text === 'string') {
        let cleanText = data.text;

        // Remove markdown code blocks if present
        if (cleanText.includes('```json')) {
          cleanText = cleanText.replace(/```json\s*/g, '').replace(/\s*```/g, '');
        } else if (cleanText.includes('```')) {
          cleanText = cleanText.replace(/```\s*/g, '').replace(/\s*```/g, '');
        }

        cleanText = cleanText.trim();

        // Try to find JSON in the response
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsedData = JSON.parse(jsonMatch[0]);
            if (parsedData.acronyms && parsedData.acronyms.length > 0) {
              acronymData = parsedData.acronyms[0];
            } else if (parsedData.acronym) {
              acronymData = parsedData;
            } else {
              throw new Error('No acronym data found in response');
            }
          } catch (parseError) {
            console.error('JSON Parse error:', parseError);
            throw new Error('The AI response could not be parsed. Please try rephrasing your input.');
          }
        } else {
          // No JSON found - AI returned plain text
          throw new Error('The AI returned a text response instead of an acronym. Please try a more specific topic or concept.');
        }
      } else if (data.acronym) {
        acronymData = data;
      } else {
        throw new Error('Invalid response format from API');
      }

      if (acronymData.error) {
        alert(acronymData.error);
        return;
      }

      const transformedData: GeneratedAcronym = {
        acronym: acronymData.acronym,
        topic: inputText.substring(0, 60) + '...',
        letters: Object.entries(acronymData.terms || {}).map(([letter, term]) => ({
          letter: letter.toUpperCase(),
          term: term as string,
          explanation: `Key component: ${term}`
        })),
        context: acronymData.notes || 'Generated smart acronym for better memorization',
        category: `Relevance: ${acronymData.domainRelevance || 'High'}, Pronounceability: ${acronymData.pronounceability || 'Good'}`
      };

      setGeneratedAcronym(transformedData);

    } catch (error: any) {
      console.error('Error generating acronym:', error);
      const errorMessage = error.message || 'Failed to generate acronym. Please try again with a different input.';
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Acronym copied to clipboard!');
  };

  const filteredAcronyms = savedAcronyms.filter(acronym =>
    acronym.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acronym.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acronym.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acronym.letters.some(letter =>
      letter.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.explanation.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container max-w-4xl mx-auto space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4 py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Smart Acronym Generator
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Create intelligent, memorable acronyms for actuarial and financial concepts — like FAT SIR, RAPID COST, and PIERCES & CREAMeR
        </p>
        {savedAcronyms.length > 0 && (
          <div className="flex justify-center mt-4 md:mt-6">
            <div className="badge badge-secondary px-4 md:px-6 py-2 md:py-3 flex items-center gap-2">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
              </svg>
              <span className="font-medium">{savedAcronyms.length} Smart Acronyms</span>
            </div>
          </div>
        )}
      </div>

      {/* Search - Only show when there are saved acronyms */}
      {savedAcronyms.length > 0 && (
        <div className="card">
          <div className="card-content p-4 md:p-6">
            <div className="relative">
              <svg className="icon-sm absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                placeholder="Search acronyms, terms, or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full pl-10 md:pl-12"
              />
            </div>
          </div>
        </div>
      )}

      {/* Smart Acronym Generator */}
      <div className="card">
        <div className="card-content p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <svg className="icon-md text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Generate Smart Acronym
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Enter a topic, paragraph, or concept. AI will analyze it and create a memorable acronym with educational explanations.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold">Topic or Concept</label>
            <textarea
              placeholder="e.g., 'Evaluating investment opportunities in volatile markets requires considering multiple risk factors, regulatory requirements, stakeholder impacts, and timing considerations...'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              className="textarea w-full resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={generateSmartAcronym}
              disabled={!inputText.trim() || isGenerating}
              className="btn btn-primary flex-1 h-12 md:h-14 flex items-center justify-center gap-2 md:gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm md:text-base">Analyzing & Creating Acronym...</span>
                </>
              ) : (
                <>
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    <path d="M5 3v4"/>
                    <path d="M19 17v4"/>
                    <path d="M3 5h4"/>
                    <path d="M17 19h4"/>
                  </svg>
                  <span className="text-sm md:text-base">Generate Smart Acronym</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowCA1Library(!showCA1Library)}
              className="btn btn-outline h-12 md:h-14 px-4 md:px-6 flex items-center justify-center gap-2 md:gap-3"
            >
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
              <span className="text-sm md:text-base">{showCA1Library ? 'Hide' : 'Read'} CA1 Acronyms</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Acronym Display */}
      {generatedAcronym && (
        <div className="card">
          <div className="card-content p-6 md:p-8 space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <svg className="icon-md text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {generatedAcronym.acronym}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium mb-3">{generatedAcronym.topic}</p>
                <div className="badge badge-secondary text-xs md:text-sm">
                  {generatedAcronym.category}
                </div>
              </div>
            </div>

            {/* Acronym Breakdown */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-bold">Acronym Breakdown</h3>
              <div className="space-y-3 md:space-y-4">
                {generatedAcronym.letters.map((item, index) => (
                  <div key={index} className="card">
                    <div className="card-content p-4 md:p-5 flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center font-bold text-base md:text-lg text-primary-foreground shrink-0">
                        {item.letter}
                      </div>
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <h4 className="font-bold text-base md:text-lg">{item.term}</h4>
                        <p className="text-sm md:text-base text-muted-foreground">{item.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context */}
            <div className="card bg-muted">
              <div className="card-content p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-warning flex items-center justify-center">
                    <svg className="icon-sm text-warning-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
                    </svg>
                  </div>
                  <span className="font-bold text-base md:text-lg">Usage Context</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">{generatedAcronym.context}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => copyToClipboard(generatedAcronym.acronym)}
                className="btn btn-outline flex-1 h-11 md:h-12 flex items-center justify-center gap-2"
              >
                <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                Copy Acronym
              </button>
              <button
                onClick={saveAcronymToLibrary}
                className="btn btn-primary flex-1 h-11 md:h-12 flex items-center justify-center gap-2"
              >
                <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                  <line x1="12" x2="12" y1="7" y2="13"/>
                  <line x1="15" x2="9" y1="10" y2="10"/>
                </svg>
                Save to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CA1 Acronym Reference Guide */}
      {showCA1Library && (
        <div className="card">
          <div className="card-content p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-progress flex items-center justify-center shrink-0">
                <svg className="icon-md text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  CA1 Acronym Reference Guide
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Essential acronyms from CA1 actuarial exam materials for quick reference and study
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {ca1AcronymLibrary.map((item) => (
                <div key={item.id} className="card">
                  <div className="card-content p-5 md:p-6 space-y-4 md:space-y-6">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="badge badge-lg bg-progress text-white px-4 md:px-6 py-2 md:py-3 font-bold text-base md:text-xl">
                          {item.acronym}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg md:text-xl mb-2">{item.topic}</h3>
                      <div className="badge badge-secondary text-xs md:text-sm">
                        {item.chapter}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {item.letters.map((letter, index) => (
                        <div key={index} className="card bg-muted">
                          <div className="card-content p-3 md:p-4 flex items-start gap-3 md:gap-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-progress flex items-center justify-center font-bold text-sm md:text-base text-white shrink-0">
                              {letter.letter}
                            </div>
                            <div className="space-y-1 flex-1">
                              <h4 className="font-semibold text-sm md:text-lg">{letter.term}</h4>
                              <p className="text-xs md:text-base text-muted-foreground">{letter.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Saved Acronyms Library */}
      {savedAcronyms.length > 0 && (
        <div className="card">
          <div className="card-content p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-warning flex items-center justify-center shrink-0">
                <svg className="icon-md text-warning-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  Smart Acronym Library
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Professional acronyms for actuarial and financial analysis
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {filteredAcronyms.map((item: any) => (
                <div key={item.id} className="card">
                  <div className="card-content p-5 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="badge badge-lg bg-primary text-primary-foreground px-4 py-2 font-bold text-base md:text-lg">
                          {item.acronym}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg md:text-xl mb-2">{item.topic}</h3>
                          <div className="badge badge-secondary text-xs md:text-sm">
                            {item.category}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(item.acronym)}
                          className="btn btn-ghost btn-sm w-9 h-9 md:w-10 md:h-10 p-0 flex items-center justify-center"
                        >
                          <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteAcronym(item.id)}
                          className="btn btn-ghost btn-sm w-9 h-9 md:w-10 md:h-10 p-0 flex items-center justify-center"
                        >
                          <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.letters.map((letter: Letter, index: number) => (
                        <div key={index} className="card bg-muted">
                          <div className="card-content p-3 md:p-4 flex items-start gap-3">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs md:text-sm text-primary-foreground shrink-0">
                              {letter.letter}
                            </div>
                            <div className="space-y-1 flex-1 min-w-0">
                              <span className="font-semibold text-xs md:text-sm block">{letter.term}</span>
                              <p className="text-xs text-muted-foreground">{letter.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="card bg-muted border-l-4 border-l-primary">
                      <div className="card-content p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="icon-sm text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                          </svg>
                          <span className="text-xs md:text-sm font-bold">Usage Context</span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.context}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredAcronyms.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <svg className="icon-lg text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg">No acronyms found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcronymGenerator;
