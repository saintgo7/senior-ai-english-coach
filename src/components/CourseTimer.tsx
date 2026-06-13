import { Fragment } from 'react';

export function CourseTimer() {
  const steps = [
    { id: 'vocab', labelKo: '단어', labelEn: 'Vocab', status: 'completed', num: '1' },
    { id: 'roleplay', labelKo: '회화', labelEn: 'Practice', status: 'active', num: '2' },
    { id: 'corrections', labelKo: '교정', labelEn: 'Correction', status: 'upcoming', num: '3' },
    { id: 'review', labelKo: '복습', labelEn: 'Review', status: 'upcoming', num: '4' },
  ];

  return (
    <section className="timeline-section" aria-label="학습 계획">
      <div className="agenda-masthead">
        {/* Simplified numbered stages */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {steps.map((step, index) => (
            <Fragment key={step.id}>
              <div className={`agenda-item ${step.status}`}>
                <span className="agenda-num">{step.num}.</span>
                <div className="agenda-label">
                  <span className="agenda-label-ko">{step.labelKo}</span>
                  <span className="agenda-label-en">{step.labelEn}</span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <span className="agenda-separator" aria-hidden="true">
                  →
                </span>
              )}
            </Fragment>
          ))}
        </div>

        {/* Style 2 inspired Streak Widget */}
        <div className="streak-masthead-widget">
          <span style={{ fontSize: '14px' }}>🔥</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontWeight: 700 }}>7일 연속 학습 중</span>
            <span style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase' }}>7 Days Streak • 45m left</span>
          </div>
        </div>
      </div>
    </section>
  );
}
