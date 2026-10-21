import styles from './PhoneMockup.module.css'

const PEOPLE = [
  { initials: 'A', x: 150, y: 92, self: false },
  { initials: 'P', x: 70, y: 168, self: false },
  { initials: 'M', x: 168, y: 214, self: true },
]

export function PhoneMockup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.phone} role="img" aria-label="Tela do app Horus Guardian mostrando três familiares no mapa">
        <div className={styles.notch} />
        <svg className={styles.map} viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="240" height="300" fill="#e9efeb" />
          <rect x="20" y="20" width="70" height="55" rx="8" fill="#cfe6d6" />
          <rect x="150" y="230" width="70" height="50" rx="8" fill="#cfe6d6" />
          <g stroke="#ffffff" strokeWidth="9" fill="none" strokeLinecap="round">
            <path d="M-10 120 L250 140" />
            <path d="M100 -10 L120 310" />
            <path d="M-10 250 L250 200" strokeWidth="6" />
            <path d="M190 -10 L170 310" strokeWidth="6" />
          </g>
          {PEOPLE.map((p) => (
            <g key={p.initials} transform={`translate(${p.x} ${p.y})`}>
              <circle r="20" fill={p.self ? '#059669' : '#010440'} opacity="0.18" />
              <circle r="13" fill={p.self ? '#059669' : '#010440'} stroke="#fff" strokeWidth="2.5" />
              <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill="#fff">
                {p.initials}
              </text>
            </g>
          ))}
        </svg>
        <div className={styles.status}>
          <span className={styles.dot} /> Conectado
        </div>
      </div>

      <div className={`${styles.card} ${styles.cardTop}`}>
        <strong>Ana chegou na faculdade</strong>
        <span>Atualizado agora</span>
      </div>
      <div className={`${styles.card} ${styles.cardBottom}`}>
        <strong>Pai saiu do trabalho</strong>
        <span>Atualizado há 1 min</span>
      </div>
    </div>
  )
}
