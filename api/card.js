export default function handler(req, res) {
  const { username = 'User', totalStars = '0', currentYearStars = '0', currentDay = '0', completedDays = '0', currentYear = new Date().getFullYear() } = req.query;

  // Calcul du pourcentage et de la progression du cercle
  const totalDays = 25;
  const percentage = (parseInt(completedDays) / totalDays) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100 * circumference);

  // Lecture du template HTML
  const svg = `<svg width="500" height="250" xmlns="http://www.w3.org/2000/svg" style="background-color: #0f0f0f; border: 1px solid white; border-radius: 5px;">
    <rect width="500" height="250" fill="#0f0f0f" rx="5" />
    <defs>
      <path id="star-icon" d="M12 0l3.7 7.5 8.3 1.2-6 5.8 1.4 8.3-7.4-3.9-7.4 3.9 1.4-8.3-6-5.8 8.3-1.2z" />
    </defs>
    <text x="30" y="45" font-size="26px" fill="#ff69b4" font-family="Arial, sans-serif" font-weight="bold">${username} Stats</text>
    <g transform="translate(30, 85)">
      <use href="#star-icon" transform="translate(0, -16) scale(0.8)" fill="#ffd700" />
      <text x="30" font-size="16px" fill="#d4d4d4" font-family="Arial, sans-serif">Total stars: <tspan fill="#ffd700">${totalStars}</tspan></text>
      <use href="#star-icon" transform="translate(0, 14) scale(0.8)" fill="#ffd700" />
      <text x="30" y="30" font-size="16px" fill="#d4d4d4" font-family="Arial, sans-serif">Stars this year: <tspan fill="#ffd700">${currentYearStars}</tspan></text>
      <path transform="translate(0, 44) scale(0.8)" fill="#ffd700" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
      <text x="30" y="60" font-size="16px" fill="#d4d4d4" font-family="Arial, sans-serif">Current day: <tspan fill="#87ceeb">${currentDay}</tspan></text>
      <path transform="translate(0, 74) scale(0.8)" fill="#ffd700" d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" />
      <text x="30" y="90" font-size="16px" fill="#d4d4d4" font-family="Arial, sans-serif">Completed days: <tspan fill="#87ceeb">${completedDays}</tspan></text>
      <path transform="translate(0, 104) scale(0.8)" fill="#ffd700" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
      <text x="30" y="120" font-size="16px" fill="#d4d4d4" font-family="Arial, sans-serif">Year: <tspan fill="#ff69b4">${currentYear}</tspan></text>
    </g>
    <g transform="translate(390, 130)">
      <circle r="45" fill="none" stroke="#2a2a2a" stroke-width="12" />
      <circle r="45" fill="none" stroke="#ff69b4" stroke-width="12" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
      <text x="0" y="15" text-anchor="middle" font-size="38px" fill="#87ceeb" font-family="Arial, sans-serif" font-weight="bold">${completedDays}</text>
    </g>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=600');
  res.status(200).send(svg);
}
