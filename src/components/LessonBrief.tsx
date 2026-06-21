import type { Scenario } from '../domain/types';

// getVoices() is loaded asynchronously in Chrome/Edge and returns [] until the
// 'voiceschanged' event fires. Cache the list and refresh it on that event so
// the first playback can still pick an English voice instead of the default.
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const refreshVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  refreshVoices();
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
}

export function LessonBrief({ scenario }: { scenario: Scenario }) {
  function handlePlayAudio(text: string) {
    if ('speechSynthesis' in window) {
      // Cancel previous speech to prevent overlapping sounds
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
      
      // Prioritize clear, premium natural-sounding voices (e.g., Samantha, Google US, premium assistants)
      const idealVoice = voices.find(
        (v) =>
          v.lang.startsWith('en-') &&
          (v.name.includes('Samantha') ||
            v.name.includes('Google US English') ||
            v.name.includes('Natural') ||
            v.name.includes('Daniel') ||
            v.name.includes('Zira') ||
            v.name.includes('Microsoft David'))
      ) || voices.find((v) => v.lang.startsWith('en-'));
      
      if (idealVoice) {
        utterance.voice = idealVoice;
      }
      
      // Micro-adjustments for bright, comfortable language learning tone
      utterance.pitch = 1.05; // Bright, youthful, and high-clarity tone
      utterance.rate = 0.9;   // 10% slower rate for comfortable pronunciation coaching
      
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <section className="lesson-brief" aria-label="오늘의 표현 요약">
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--outline)', fontWeight: 600 }}>
          Stage I • Reference Syllabus ({scenario.durationMinutes}m)
        </span>
        <h2 style={{ fontSize: '22px', margin: '6px 0 8px', fontWeight: 700, fontFamily: 'Lora, Georgia, serif' }}>
          {scenario.title}
        </h2>
        <p style={{ fontSize: '14.5px', color: 'var(--outline)', margin: 0 }}>
          {scenario.koreanExplanation}
        </p>
      </div>

      <div className="vocab-list">
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', margin: '16px 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          필수 표현 어휘 • Vocabulary
        </h3>
        
        {/* Render Words */}
        {scenario.keyWords.map((term) => (
          <article className="vocab-item" key={term.english}>
            <div className="vocab-text">
              <strong className="vocab-english">{term.english}</strong>
              <span className="vocab-korean">{term.korean}</span>
              <small style={{ fontSize: '12px', color: 'var(--outline)', marginTop: '4px' }}>
                Ex: {term.example}
              </small>
            </div>
            <button
              className="audio-btn"
              onClick={() => handlePlayAudio(term.english)}
              title="Listen Pronunciation"
              aria-label={`Listen to pronunciation of ${term.english}`}
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">
                volume_up
              </span>
            </button>
          </article>
        ))}

        {/* Render Idioms */}
        {scenario.idioms.map((term) => (
          <article className="vocab-item" key={term.english}>
            <div className="vocab-text">
              <strong className="vocab-english">{term.english}</strong>
              <span className="vocab-korean">{term.korean}</span>
              <small style={{ fontSize: '12px', color: 'var(--outline)', marginTop: '4px' }}>
                Ex: {term.example}
              </small>
            </div>
            <button
              className="audio-btn"
              onClick={() => handlePlayAudio(term.english)}
              title="Listen Pronunciation"
              aria-label={`Listen to pronunciation of ${term.english}`}
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">
                volume_up
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
