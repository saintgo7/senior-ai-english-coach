// 비보안 컨텍스트(HTTP)에서도 동작하는 UUID 생성 헬퍼
// crypto.randomUUID()는 보안 출처(HTTPS/localhost)에서만 노출되므로,
// 평문 HTTP 스테이징에서 throw 되지 않도록 안전하게 폴백한다.
export function uuid(): string {
  const cryptoObj = typeof crypto !== 'undefined' ? crypto : undefined;

  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  // crypto.getRandomValues는 비보안 컨텍스트에서도 사용 가능하다.
  if (cryptoObj?.getRandomValues) {
    const bytes = cryptoObj.getRandomValues(new Uint8Array(16));
    // RFC 4122 version 4 / variant 비트 설정
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex
      .slice(6, 8)
      .join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
  }

  // 최후 폴백: 충돌 가능성이 낮은 비암호학적 ID(키 용도로만 사용).
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}
