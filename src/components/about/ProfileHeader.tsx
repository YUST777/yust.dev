export default function ProfileHeader() {
  return (
    <header>
      <p className="font-mono text-zinc-400 mb-2">Hi I'm 👋</p>
      <h1 className="text-4xl md:text-5xl font-pixel text-white mb-4">
        <span data-goose-name>YOUSEF</span>
        <span className="sr-only">
          {" "}
          — known online as yust.dev (real name Yousef Mohammed Salah). Full-Stack Developer &amp;
          Security Researcher.
        </span>
      </h1>
    </header>
  );
}
