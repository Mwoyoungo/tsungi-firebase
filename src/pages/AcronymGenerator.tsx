import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Star, Eye, EyeOff } from 'lucide-react';
import Flashcard from '../components/Flashcard';
import { flashcards, chapters } from '../data/flashcards';
import '../styles/flashcard.css';

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

const AcronymGenerator = () => {
  // Flashcard state management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredCards, setFilteredCards] = useState(flashcards);
  const [selectedChapter, setSelectedChapter] = useState('All Chapters');
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [confidenceRatings, setConfidenceRatings] = useState<Map<number, number>>(new Map());
  const [showMastered, setShowMastered] = useState(true);
  const [showCA1Library, setShowCA1Library] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedMastered = localStorage.getItem('masteredCards');
    const savedConfidence = localStorage.getItem('confidenceRatings');

    if (savedMastered) {
      setMasteredCards(new Set(JSON.parse(savedMastered)));
    }
    if (savedConfidence) {
      setConfidenceRatings(new Map(JSON.parse(savedConfidence)));
    }
  }, []);

  // Save to localStorage whenever mastered cards or confidence changes
  useEffect(() => {
    localStorage.setItem('masteredCards', JSON.stringify(Array.from(masteredCards)));
  }, [masteredCards]);

  useEffect(() => {
    localStorage.setItem('confidenceRatings', JSON.stringify(Array.from(confidenceRatings.entries())));
  }, [confidenceRatings]);

  // Filter cards based on chapter and mastered status
  useEffect(() => {
    let filtered = flashcards;

    // Filter by chapter
    if (selectedChapter !== 'All Chapters') {
      filtered = filtered.filter(card => card.chapter === selectedChapter);
    }

    // Filter by mastered status
    if (!showMastered) {
      filtered = filtered.filter(card => !masteredCards.has(card.id));
    }

    setFilteredCards(filtered);
    setCurrentIndex(0); // Reset to first card when filters change
  }, [selectedChapter, showMastered, masteredCards]);

  const currentCard = filteredCards[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = () => {
    if (!currentCard) return;

    const newMastered = new Set(masteredCards);
    if (newMastered.has(currentCard.id)) {
      newMastered.delete(currentCard.id);
    } else {
      newMastered.add(currentCard.id);
    }
    setMasteredCards(newMastered);
  };

  const setConfidence = (rating: number) => {
    if (!currentCard) return;

    const newRatings = new Map(confidenceRatings);
    newRatings.set(currentCard.id, rating);
    setConfidenceRatings(newRatings);
  };

  const progress = (currentIndex + 1) / filteredCards.length * 100;

  return (
    <div className="container max-w-4xl mx-auto space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4 py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          CA1 Flashcards
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Master all 33 CA1 acronyms with interactive flashcards. Guess the acronym, flip to check your answer!
        </p>
        <div className="flex justify-center mt-4 md:mt-6 gap-4 flex-wrap">
          <div className="badge badge-secondary px-4 md:px-6 py-2 md:py-3 flex items-center gap-2">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
            <span className="font-medium">{flashcards.length} Total Flashcards</span>
          </div>
          <div className="badge badge-secondary px-4 md:px-6 py-2 md:py-3 flex items-center gap-2">
            <Star className="icon-sm" fill="currentColor" />
            <span className="font-medium">{masteredCards.size} Mastered</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {filteredCards.length > 0 && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flashcard-filters">
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="filter-select"
        >
          <option value="All Chapters">All Chapters</option>
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>

        <button onClick={handleShuffle} className="action-btn">
          <Shuffle className="icon-sm" />
          Shuffle
        </button>

        <button onClick={toggleMastered} className="action-btn">
          <Star
            className="icon-sm"
            fill={currentCard && masteredCards.has(currentCard.id) ? 'currentColor' : 'none'}
          />
          {currentCard && masteredCards.has(currentCard.id) ? 'Unmark' : 'Mark as Mastered'}
        </button>

        <button
          onClick={() => setShowMastered(!showMastered)}
          className="action-btn"
        >
          {showMastered ? <Eye className="icon-sm" /> : <EyeOff className="icon-sm" />}
          {showMastered ? 'Hide Mastered' : 'Show Mastered'}
        </button>

        <button
          onClick={() => setShowCA1Library(!showCA1Library)}
          className="action-btn"
        >
          <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          {showCA1Library ? 'Hide' : 'View'} Audio Library
        </button>
      </div>

      {/* Flashcard Display */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="space-y-6">
          <Flashcard
            front={currentCard.topic}
            back={currentCard.acronym}
            color={currentCard.color}
            chapter={currentCard.chapter}
          />

          {/* Confidence Rating */}
          <div className="confidence-rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`confidence-star ${confidenceRatings.get(currentCard.id) >= rating ? 'filled' : ''}`}
                fill={confidenceRatings.get(currentCard.id) >= rating ? 'currentColor' : 'none'}
                onClick={() => setConfidence(rating)}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flashcard-controls">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flashcard-nav-btn"
            >
              <ChevronLeft />
            </button>

            <div className="card-counter">
              {currentIndex + 1} / {filteredCards.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="flashcard-nav-btn"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-content p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Star className="icon-lg text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No flashcards to show</h3>
            <p className="text-muted-foreground">
              {!showMastered && masteredCards.size > 0
                ? "You've mastered all cards in this filter! Show mastered cards to review them."
                : "Try changing your filter settings."}
            </p>
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

    </div>
  );
};

export default AcronymGenerator;
