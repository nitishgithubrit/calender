const calendar = document.getElementById('calendar');
let currentDate = new Date();

function createCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const monthName = firstDay.toLocaleString('default', { month: 'long' });

  let html = `<div class="nav-buttons">
                <button onclick="prevMonth()">Prev</button>
                <div class="month">${monthName} ${year}</div>
                <button onclick="nextMonth()">Next</button>
              </div>`;
  html += `<div class="year-input">
             <input type="number" id="yearInput" value="${year}" oninput="changeYear()">
           </div>`;
  html += '<div class="weekdays">';
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    html += `<div class="weekday">${day}</div>`;
  });
  html += '</div><div class="days">';

  for (let i = 0; i < firstDay.getDay(); i++) {
    html += '<div class="day"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = date.toDateString() === currentDate.toDateString();
    html += `<div class="day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}" onclick="selectDate(${year}, ${month}, ${day})">${day}</div>`;
  }

  html += '</div>';
  calendar.innerHTML = html;
}

function selectDate(year, month, day) {
  currentDate = new Date(year, month, day);
  createCalendar(year, month);
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function changeYear() {
  const yearInput = document.getElementById('yearInput');
  const newYear = parseInt(yearInput.value);
  if (newYear !== currentDate.getFullYear()) {
    currentDate.setFullYear(newYear);
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    yearInput.classList.add('changed-year');
    setTimeout(() => {
      yearInput.classList.remove('changed-year');
    }, 1000);
  }
}

createCalendar(currentDate.getFullYear(), currentDate.getMonth());
