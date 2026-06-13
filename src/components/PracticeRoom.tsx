import { useEffect, useState } from 'react';
import type { PracticeTurnFeedback, Scenario } from '../domain/types';
import type { AiCoachProvider } from '../services/aiCoachService';

export function PracticeRoom({
  scenario,
  aiCoach,
  onSubmitted,
  onFeedback,
  submittedText,
}: {
  scenario: Scenario;
  aiCoach: AiCoachProvider;
  onSubmitted: (text: string) => void;
  onFeedback: (feedback: PracticeTurnFeedback | null) => void;
  submittedText: string;
}) {
  const [userText, setUserText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('타이핑으로 연습할 수 있습니다. / Type your sentence below.');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; id: string }>>([]);
  const [recognition, setRecognition] = useState<any>(null);

  // Reset conversation history when selected scenario changes
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: scenario.openingPrompt,
        id: 'opening-' + scenario.id,
      },
    ]);
  }, [scenario]);

  // Initialize Web Speech API SpeechRecognition
  useEffect(() => {
    const SpeechRecognitionClass =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (SpeechRecognitionClass) {
      const rec = new SpeechRecognitionClass();
      rec.continuous = false;
      rec.lang = 'en-US'; // English conversation training
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsRecording(true);
        setStatus('마이크가 켜졌습니다. 영어로 말씀해 주세요. / Listening... Please speak English.');
      };

      rec.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        setUserText(transcriptText);
        setStatus('음성 입력 완료! 전송 단추를 눌러주세요. / Voice capture complete.');
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setStatus('마이크 권한이 비활성화되었습니다. / Microphone permission denied.');
        } else {
          setStatus('음성 인식을 실패했습니다. 다시 시도해 주세요. / Speech error. Try again.');
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, []);

  async function submitTurn() {
    const textToSend = userText.trim();
    if (!textToSend) return;
    
    setStatus('AI 코치가 표현을 다듬는 중입니다... / AI Coach is reviewing...');
    
    // 1. Append user's message to conversation history
    const userMsgId = 'user-' + Date.now();
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend, id: userMsgId }]);
    setUserText(''); // Clear input box immediately

    try {
      const nextFeedback = await aiCoach.submitPracticeTurn({
        scenarioId: scenario.id,
        userText: textToSend,
        inputMode: 'text',
      });
      
      // 2. Append AI's explanatory coachReply response to conversation history
      const aiMsgId = 'ai-' + (Date.now() + 1);
      setMessages((prev) => [...prev, { sender: 'ai', text: nextFeedback.coachReply, id: aiMsgId }]);
      
      onSubmitted(textToSend);
      onFeedback(nextFeedback);
      setStatus('교정 피드백이 완료되었습니다. / Revision is ready.');
    } catch (error) {
      console.error(error);
      setStatus('오류가 발생했습니다. 다시 시도해 주세요. / Error occurred. Please try again.');
    }
  }

  function handleVoiceInput() {
    if (!recognition) {
      setStatus('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 권장합니다. / Speech recognition not supported on this browser.');
      // Fallback behavior for simulation/testing (e.g. JSDOM environments)
      setUserText('I want to change my appointment time.');
      setStatus('음성 입력(가상) 완료! 전송 단추를 눌러주세요. / Mock voice capture complete.');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      setUserText('');
      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  }

  return (
    <section className="practice-room" aria-label="연습 공간">
      <div className="practice-header">
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--outline)', fontWeight: 600 }}>
          Stage II • Active Dialogue
        </span>
        <h2>{scenario.title}</h2>
        <p style={{ fontSize: '14px', color: 'var(--outline)', margin: 0 }}>
          학습 목표: {scenario.learnerGoal}
        </p>
      </div>

      <div className="chat-history custom-scrollbar">
        {messages.map((msg) => (
          <div className={`chat-message ${msg.sender}`} key={msg.id}>
            <div className="chat-avatar-container" aria-label={msg.sender === 'ai' ? 'Coach' : 'Learner'}></div>
            <div className="chat-bubble-text">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Script Input Line */}
      <div className="chat-input-bar-container">
        <div className="chat-input-bar">
          <button
            className={`voice-input-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
            title="Voice Input"
            type="button"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              mic
            </span>
          </button>
          <input
            className="chat-text-input"
            onChange={(event) => setUserText(event.target.value)}
            placeholder="여기에 영어로 답변을 작성해 보세요. / Type your English sentence here..."
            type="text"
            value={userText}
            aria-label="연습 문장 입력"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                submitTurn();
              }
            }}
          />
          <button
            className={`chat-send-btn ${userText.trim() ? 'active' : ''}`}
            onClick={submitTurn}
            disabled={!userText.trim()}
            aria-label="AI 코치에게 보내기"
            type="button"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              send
            </span>
          </button>
        </div>
        <p className="action-status-text" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
