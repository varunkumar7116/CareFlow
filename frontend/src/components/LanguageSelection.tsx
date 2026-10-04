import React, { useState } from 'react';
import { Languages, Check, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { LanguageItem, PRIMARY_LANGUAGES, ALL_SCHEDULED_LANGUAGES } from '../data/languages';
import { getTranslation } from '../data/translations';

interface LanguageSelectionProps {
  selectedLanguage: LanguageItem;
  onSelectLanguage: (lang: LanguageItem) => void;
  onContinue: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const t = getTranslation(selectedLanguage.code);

  const filteredLanguages = ALL_SCHEDULED_LANGUAGES.filter(
    (lang) =>
      lang.nameNative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gov-entry-container">
      {/* Header Banner */}
      <header className="gov-entry-header">
        <div className="entry-header-content">
          <div className="brand-emblem">CF</div>
          <div>
            <h1 className="entry-brand-title">{t.portalTitle}</h1>
            <p className="entry-brand-subtitle">{t.portalSubtitle}</p>
          </div>
        </div>
        <div className="entry-header-tag">{t.govTag}</div>
      </header>

      {/* Main Content Area */}
      <div className="gov-entry-card-wrapper">
        <div className="gov-card entry-card">
          <div className="entry-card-header">
            <div className="entry-icon-box">
              <Languages size={24} color="#0284c7" />
            </div>
            <div>
              <h2 className="entry-card-title">{t.selectLanguageTitle}</h2>
              <p className="entry-card-desc">{t.selectLanguageDesc}</p>
            </div>
          </div>

          {/* Primary Prioritized Languages (Hindi, Marathi, English) */}
          <div className="primary-languages-section">
            <label className="section-label">{t.primaryLangHeader}</label>
            <div className="primary-lang-grid">
              {PRIMARY_LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    className={`lang-card-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectLanguage(lang)}
                    aria-pressed={isSelected}
                  >
                    <div className="lang-btn-content">
                      <span className="lang-native">{lang.nameNative}</span>
                      <span className="lang-english">{lang.nameEnglish}</span>
                    </div>
                    {isSelected && (
                      <span className="selected-indicator">
                        <Check size={16} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* All Languages Expandable & Searchable Selector */}
          <div className="all-languages-section">
            <button
              type="button"
              className="toggle-all-lang-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <span>{t.allLangHeader}</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isExpanded && (
              <div className="all-languages-dropdown-content">
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder={t.searchLangPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="all-lang-grid">
                  {filteredLanguages.map((lang) => {
                    const isSelected = selectedLanguage.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        className={`lang-option-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => onSelectLanguage(lang)}
                        aria-pressed={isSelected}
                      >
                        <span className="chip-native">{lang.nameNative}</span>
                        <span className="chip-english">({lang.nameEnglish})</span>
                        {isSelected && <Check size={14} className="chip-check" />}
                      </button>
                    );
                  })}
                  {filteredLanguages.length === 0 && (
                    <div className="no-lang-found">
                      {t.noLangFound} "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="entry-card-footer">
            <div className="selected-lang-status">
              {t.selectedText}: <strong>{selectedLanguage.nameNative}</strong> ({selectedLanguage.nameEnglish})
            </div>
            <button
              type="button"
              className="btn-gov btn-continue"
              onClick={onContinue}
            >
              <span>{t.continueBtn}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
