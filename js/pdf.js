// pdf.js — PDF Export

const PDFExporter = {
  async export(elementId, fileName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Dynamically load libs from CDN if not already loaded
    await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;

      // Multi-page if resume is tall
      const pageH = pdf.internal.pageSize.getHeight();
      let yPos = 0;
      while (yPos < pdfH) {
        if (yPos > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -yPos, pdfW, pdfH);
        yPos += pageH;
      }

      const safe = (fileName || "resume").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");
      pdf.save(`${safe}_resume.pdf`);
    } catch (err) {
      console.error("[ResumeCraft] PDF error:", err);
      alert("PDF generation failed. Please try printing instead (Ctrl+P).");
    }
  },

  _loadScript(src) {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = resolve; // fail silently
      document.head.appendChild(s);
    });
  },
};
