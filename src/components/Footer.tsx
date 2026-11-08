import { Globe, NotebookPen, Instagram } from 'lucide-react';

// COLOR.M 채널 링크 (colorm.net에 연결된 주소와 동일)
const LINKS = [
  { label: '홈페이지', href: 'https://colorm.net', icon: Globe },
  { label: '블로그', href: 'https://blog.naver.com/mlyoo71', icon: NotebookPen },
  { label: '인스타그램', href: 'https://www.instagram.com/colorm_milan/', icon: Instagram },
];

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

        <nav aria-label="COLOR.M 채널" className="mt-5 flex justify-center gap-2">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-ink-sub transition-colors hover:border-magenta/50 hover:text-magenta"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>

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
