export default function handler(req, res) {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );

  const greetings = (() => {
    const hour = now.getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  })();

  const seasons = ["verão", "outono", "inverno", "primavera"];
  const season = seasons[Math.floor(((now.getMonth() + 1) % 12) / 3)];

  const weekday_number = now.getDay() === 0 ? 7 : now.getDay();

  const year_string = now
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/ /g, "");

  const datetime_string = now
    .toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/ /g, "");

  const data = {
    timezone: "America/Sao_Paulo",
    utc_offset: -3,
    year: now.getFullYear(),
    month: now.toLocaleString("pt-BR", { month: "long" }),
    month_number: now.getMonth() + 1,
    day: now.getDate(),
    weekday: now.toLocaleString("pt-BR", { weekday: "long" }),
    weekday_number,
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds(),
    year_string,
    datetime_string,
    iso_string: now.toISOString(),
    locale_string: now.toLocaleString("pt-BR"),
    timestamp: now.getTime(),
    day_of_year: dayOfYear,
    season,
    greeting: greetings,
    is_weekend: [6, 7].includes(weekday_number),
  };

  res.status(200).json(data);
}
