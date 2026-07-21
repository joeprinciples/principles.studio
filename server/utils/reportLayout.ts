// Branded shell wrapped around Markdown audits at serve time. One template
// controls the look of every Markdown report, so restyling them all is a single
// edit here (HTML reports carry their own styling and bypass this).
export function renderMarkdownReport(opts: {
  title: string;
  bodyHtml: string;
  client: string;
  label: string;
}): string {
  const { title, bodyHtml, label } = opts;
  const safeTitle = escapeHtml(title);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${safeTitle}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<style>
  :root{
    --ground:#f5f7fb; --surface:#ffffff; --ink:#14183a; --muted:#5b6180;
    --accent:#0d9488; --accent-deep:#0f766e; --hair:#e4e8f2;
    --good:#0f9d8f; --warn:#c17d16; --crit:#d64550;
    --sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
    --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);
    font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}
  .topbar{background:#0e0d17;color:#fff;border-bottom:3px solid var(--accent)}
  .topbar .in{max-width:860px;margin:0 auto;padding:16px 24px;display:flex;
    align-items:center;gap:12px;flex-wrap:wrap}
  .topbar .brand{font-weight:800;letter-spacing:-.01em}
  .topbar .brand span{color:var(--accent)}
  .topbar .who{color:#b7bdd6;font-size:13px}
  .topbar .spacer{flex:1}
  .topbar .back{color:#fff;font-size:13px;border:1px solid rgba(255,255,255,.25);
    padding:6px 12px;border-radius:6px}
  .doc{max-width:860px;margin:0 auto;padding:40px 24px 80px}
  .card{background:var(--surface);border:1px solid var(--hair);border-radius:14px;
    padding:40px 44px;box-shadow:0 1px 2px rgba(20,24,58,.04)}
  h1{font-size:28px;font-weight:800;letter-spacing:-.02em;margin:0 0 .5em;color:#0e0d17}
  h2{font-size:21px;font-weight:700;margin:1.8em 0 .5em;padding-top:.4em;
    border-top:1px solid var(--hair)}
  h3{font-size:17px;font-weight:700;margin:1.5em 0 .4em}
  p{margin:0 0 1em}
  ul,ol{margin:0 0 1em;padding-left:1.4em}
  li{margin:.3em 0}
  code{font-family:var(--mono);font-size:.88em;background:#eef1f8;padding:.12em .4em;border-radius:4px}
  pre{background:#0e0d17;color:#e6e9f5;padding:16px 18px;border-radius:10px;overflow:auto}
  pre code{background:none;padding:0;color:inherit}
  blockquote{margin:0 0 1em;padding:.4em 1.1em;border-left:3px solid var(--accent);
    color:var(--muted);background:#eef7f5}
  table{width:100%;border-collapse:collapse;margin:0 0 1.2em;font-size:14px}
  th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--hair)}
  th{font-weight:700;color:var(--muted);border-bottom:2px solid var(--hair)}
  hr{border:0;border-top:1px solid var(--hair);margin:2em 0}
  img{max-width:100%;height:auto;border-radius:8px}
  .doc-foot{max-width:860px;margin:0 auto;padding:0 24px 60px;color:var(--muted);font-size:12.5px;text-align:center}
</style>
</head>
<body>
  <div class="topbar"><div class="in">
    <span class="brand">first <span>principles</span></span>
    <span class="who">${escapeHtml(label)}</span>
    <span class="spacer"></span>
    <a class="back" href="/clients">&larr; All reports</a>
  </div></div>
  <main class="doc"><article class="card">${bodyHtml}</article></main>
  <div class="doc-foot">Private report prepared for ${escapeHtml(
    label
  )} &middot; First Principles Studio Ltd</div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ]!)
  );
}
