import React from "react";
import DOMPurify from "dompurify";

function HtmlContent({ html }: { html: string }) {
  // Sanitize the HTML before rendering
  const cleanHtml = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}

export default HtmlContent;
