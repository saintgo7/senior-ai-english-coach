export function CourseTimer() {
  const blocks = [
    ['15분', '단어와 숙어'],
    ['20분', '상황극 회화'],
    ['15분', '원어민식 표현 교정'],
    ['10분', '복습 카드'],
  ];

  return (
    <section className="panel course-timer" aria-label="오늘의 1시간 학습 계획">
      <h2>오늘의 1시간 플랜</h2>
      <div className="timer-grid">
        {blocks.map(([time, label]) => (
          <div className="time-block" key={label}>
            <strong>{time}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
