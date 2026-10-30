export function Footer() {
  return (
    <footer className="mt-10 px-5 pb-8 pt-6 text-center">
      <div className="mx-auto max-w-[400px]">
        <a href="https://colorm.net" target="_blank" rel="noopener noreferrer" className="inline-block">
          <img
            src={`${import.meta.env.BASE_URL}colorm-logo.png`}
            alt="COLOR·M"
            className="mx-auto h-6 w-auto"
          />
        </a>
        <div className="mx-auto my-4 h-px w-16 bg-border" />
        <p className="font-mono text-[13px] text-ink-sub/80">
          © COLOR.M ·{' '}
          <a href="https://colorm.net" target="_blank" rel="noopener noreferrer" className="hover:text-magenta">
            colorm.net
          </a>
        </p>
      </div>
    </footer>
  );
}
