import styles from "./SuccessPage.module.css";

function formatDateTime(date) {
  const day = date.getDate();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day} ${month} ${year} at ${hours.toString().padStart(2,"0")}:${minutes} ${ampm}`;
}

function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}


export default function SuccessPage({ data, onPayAgain }) {
  const txnDate = formatDateTime(new Date());
  const initials = getInitials(data.name);
  const fullUpi = data.upiId.toUpperCase();

  return (
    <div className={styles.page}>

      {/* ── GREEN TOP HALF (background image covers this) ── */}
      <div className={styles.topSection}>

        {/* Ripple halo stack */}
        <div className={styles.tickWrap}>

          {/* Single brighter aura ring */}
          <span className={styles.ripple} aria-hidden="true" />

          {/* White circle with green SVG checkmark + flowing shine */}
          <div className={styles.tickCircle}>
            {/* Base tick */}
            <svg
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.tickSvg}
            >
              <polyline
                points="11,28 21,38 41,16"
                stroke="#1e8c3a"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Flowing white aura sweeping over the tick */}
            <svg
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.tickGlow}
              aria-hidden="true"
            >
              <polyline
                points="11,28 21,38 41,16"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className={styles.heading}>Payment Successful</p>
        <p className={styles.dateTime}>{txnDate}</p>
      </div>

      {/* ── DARK BOTTOM HALF ── */}
      <div className={styles.bottomSection}>

        {/* ── CARD ── */}
        <div className={styles.card}>

          {/* Card top: initials + info */}
          <div className={styles.cardTop}>
            <div className={styles.initialsBox}>
              <span className={styles.initialsText}>{initials}</span>
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.recipientName}>{data.name}</p>
              <p className={styles.maskedUpi}>{fullUpi}</p>
              <div className={styles.amountRow}>
                <span className={styles.amount}>₹{data.amount}</span>
                <span className={styles.splitExpense}>Split Expense</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.cardDivider} />

          {/* Card actions */}
          <div className={styles.cardActions}>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>
                {/* Document / list icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2"/>
                  <line x1="9" y1="7" x2="15" y2="7"/>
                  <line x1="9" y1="11" x2="15" y2="11"/>
                  <line x1="9" y1="15" x2="13" y2="15"/>
                </svg>
              </span>
              <span className={styles.actionLabel}>View Details</span>
            </button>
            <div className={styles.actionSep} />
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>
                {/* Share icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </span>
              <span className={styles.actionLabel}>Share Receipt</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
