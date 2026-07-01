export function twSplit(root: HTMLElement): HTMLSpanElement[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent?.length) textNodes.push(node as Text);
  }

  const chars: HTMLSpanElement[] = [];
  textNodes.forEach((textNode) => {
    const frag = document.createDocumentFragment();
    for (const ch of textNode.textContent ?? "") {
      const span = document.createElement("span");
      span.className = "tw-ch";
      span.textContent = ch;
      frag.appendChild(span);
      chars.push(span);
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  });
  return chars;
}

export function twType(
  chars: HTMLSpanElement[],
  caret: HTMLElement | null,
  speed: number,
) {
  let i = 0;
  const step = () => {
    if (i >= chars.length) return;
    chars[i].classList.add("on");
    if (caret) chars[i].insertAdjacentElement("afterend", caret);
    i += 1;
    window.setTimeout(step, speed);
  };
  step();
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
