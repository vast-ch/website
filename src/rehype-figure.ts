/**
 * Markdown image captions: an image on its own line with a title,
 * `![alt](image.png "Caption")`, becomes
 * `<figure><img alt="alt"><figcaption>Caption</figcaption></figure>`.
 * The alt text describes the image for those who can't see it; the caption is
 * what everyone reads under it. Images without a title stay as they are.
 */
import type { Element, ElementContent, Root, RootContent } from 'hast';

const isBlank = (node: ElementContent) => node.type === 'text' && node.value.trim() === '';

/** The paragraph's only image, if it holds nothing else (besides whitespace). */
function loneImage(node: RootContent): Element | undefined {
  if (node.type !== 'element' || node.tagName !== 'p') return undefined;
  const content = node.children.filter((child) => !isBlank(child));
  const [image] = content;
  return content.length === 1 && image.type === 'element' && image.tagName === 'img' ? image : undefined;
}

function figure(node: RootContent): RootContent {
  const image = loneImage(node);
  const caption = image?.properties.title;
  if (!image || typeof caption !== 'string' || caption === '') {
    if (node.type === 'element') wrap(node);
    return node;
  }
  delete image.properties.title;
  return {
    type: 'element',
    tagName: 'figure',
    properties: {},
    children: [
      image,
      { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] },
    ],
  };
}

function wrap(parent: Root | Element) {
  parent.children = (parent.children as RootContent[]).map(figure) as typeof parent.children;
}

export default function rehypeFigure() {
  return (tree: Root) => wrap(tree);
}
