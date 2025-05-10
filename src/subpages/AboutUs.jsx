export function AboutUs() {
  const teamMembers = [
    { name: "Lee Seungju", role: "Full-Stack Developer", github: "evertone13" },
    { name: "Lim Shaojun", role: "Full-Stack Developer", github: "shaojunL" },
    { name: "Jessica Tjan", role: "Full-Stack Developer", github: "jesicatjan" },
    { name: "Jerrell Yeo", role: "Full-Stack Developer", github: "jerrell-y" },
    { name: "Keith Lim", role: "Team Lead, Full-Stack Developer", github: "keithfykai" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h1 className="text-4xl font-bold mb-10">👋 Meet the Team</h1>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {teamMembers.map(({ name, role, github }) => (
          <a
            key={github}
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center w-32"
          >
            <img
              src={`https://github.com/${github}.png`}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-blue-400 hover:scale-105 transition-transform"
            />
            <p className="mt-2 font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </a>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-4">🌍 About GoWhere</h2>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        <strong>GoWhere</strong> is a smart travel companion for discovering places in Singapore 🎒. Whether you're
        craving hidden gems, local favorites, or cultural hotspots, GoWhere gives you tailored suggestions based on
        your preferences. With live maps 🗺️, weather updates 🌦️, and user reviews ⭐, planning your next adventure has
        never been easier.
      </p>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        Built to support exploration and empower small businesses, GoWhere makes discovering new places fun, easy, and
        meaningful. ✨
      </p>

      <p className="text-lg font-semibold mb-10">This app was built with ❤️. We hope you enjoy using it!</p>

      <h2 className="text-2xl font-bold mb-2">🛠️ Tech Stack</h2>
      <p className="mb-4 text-gray-600">
        <strong>Frontend:</strong> ReactJS · <strong>Backend:</strong> NodeJS · <strong>Database/Auth:</strong> Firebase
        · <strong>Hosting:</strong> GitHub Pages
      </p>

      <h2 className="text-2xl font-bold mb-2">🔗 APIs Used</h2>
      <ul className="list-disc list-inside text-left mx-auto max-w-xl text-gray-700">
        <li>
          <a className="text-blue-600 hover:underline" href="https://developers.google.com/maps/documentation/places/web-service/overview" target="_blank">Google Places API</a>
        </li>
        <li>
          <a className="text-blue-600 hover:underline" href="https://docs.mapbox.com/mapbox-gl-js/api/" target="_blank">Mapbox GL JS</a>
        </li>
        <li>
          <a className="text-blue-600 hover:underline" href="https://openweathermap.org/api" target="_blank">OpenWeatherMap API</a>
        </li>
        <li>
          <a className="text-blue-600 hover:underline" href="https://data.gov.sg/" target="_blank">Data.gov.sg API</a>
        </li>
      </ul>
    </div>
  );
}
