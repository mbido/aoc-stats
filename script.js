// Récupération des paramètres de l'URL
const params = new URLSearchParams(window.location.search);
const username = params.get('username') || 'User';
const totalStars = params.get('totalStars') || '0';
const currentYearStars = params.get('currentYearStars') || '0';
const currentDay = params.get('currentDay') || '0';
const completedDays = params.get('completedDays') || '0';
const currentYear = params.get('currentYear') || new Date().getFullYear();

// Mise à jour du DOM avec les informations récupérées
document.getElementById('username').textContent = username + ' Stats';
document.getElementById('totalStars').textContent = totalStars;
document.getElementById('currentYearStars').textContent = currentYearStars;
document.getElementById('currentDay').textContent = currentDay;
document.getElementById('completedDays').textContent = completedDays;
document.getElementById('currentYear').textContent = currentYear;

// Calcul du pourcentage de jours complétés
const totalDays = 25; // Nombre total de jours dans l'Advent of Code
const percentage = (parseInt(completedDays) / totalDays) * 100;

// Calcul de la progression du cercle
const progressCircle = document.getElementById('progressCircle');
const radius = 45; // Mis à jour pour correspondre au nouveau rayon
const circumference = 2 * Math.PI * radius;
const offset = circumference - (percentage / 100 * circumference);

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = offset;

// Affichage du nombre de jours complétés
document.getElementById('letterGrade').textContent = completedDays;
