function printPDF(pdfUrl: string) {
  const iframe = document.createElement("iframe");

  iframe.style.display = "none";
  iframe.src = pdfUrl;
  document.body.appendChild(iframe);

  iframe.onload = function () {
    if (!iframe.contentWindow) {
      return false;
    }
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
}
export { printPDF };
