/**
 * Marque du cabinet : un tracé de glycémie qui se stabilise, inscrit dans
 * un disque. Dessinée ici plutôt qu'importée, parce qu'un cabinet n'a pas
 * de logo officiel fourni (voir PLAN.md, point ouvert).
 */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="1.1" opacity="0.28" />
      <path
        d="M7 21.5c2.3 0 2.6-7 5-7s2.1 10 4.6 10 2.4-9 4.8-9 2 5.5 3.4 5.5h4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
