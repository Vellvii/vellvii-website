export async function postSSE<T extends object>(
  url: string,
  body: T,
  onToken: (t: string) => void,
  onDone: (final: string) => void
) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // fallback: no stream
  const ct = resp.headers.get("content-type") || "";
  if (!ct.includes("text/event-stream")) {
    const data = await resp.json().catch(() => ({}));
    const text =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.delta?.content ??
      data?.output_text ?? 
      data?.message ??
      data?.content ?? "";
    if (text) onToken(text);
    onDone(text || "");
    return;
  }

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder("utf-8");
  let buf = "", all = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let cut;
    while ((cut = buf.indexOf("\n\n")) !== -1) {
      const frame = buf.slice(0, cut).trim();
      buf = buf.slice(cut + 2);

      if (!frame.startsWith("data:")) continue;
      const data = frame.slice(5).trim();
      if (data === "[DONE]") { onDone(all); return; }

      try {
        const json = JSON.parse(data);
        const tok =
          json?.choices?.[0]?.delta?.content ??
          json?.choices?.[0]?.message?.content ??
          json?.output_text ??
          json?.message ??
          json?.content ?? "";
        if (tok) { all += tok; onToken(tok); }
      } catch { /* ignore keep-alives */ }
    }
  }
  onDone(all);
}