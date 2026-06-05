// pdf.js — PDF Export (Improved Version)

const PDFExporter = {
  async export(elementId, fileName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
      // Load libraries only once
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Convert canvas dimensions to PDF scale
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = pdfWidth / canvasWidth;
      const pageCanvasHeight = pdfHeight / ratio;

      let position = 0;
      let pageIndex = 0;

      while (position < canvasHeight) {
        // Create temporary canvas for each page slice
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d");

        pageCanvas.width = canvasWidth;
        pageCanvas.height = Math.min(pageCanvasHeight, canvasHeight - position);

        pageCtx.drawImage(
          canvas,
          0,
          position,
          canvasWidth,
          pageCanvas.height,
          0,
          0,
          canvasWidth,
          pageCanvas.height
        );

        const pageImg = pageCanvas.toDataURL("image/png");

        if (pageIndex > 0) pdf.addPage();

        pdf.addImage(
          pageImg,
          "PNG",
          0,
          0,
          pdfWidth,
          pageCanvas.height * ratio
        );

        position += pageCanvasHeight;
        pageIndex++;
      }

      const safe = (fileName || "resume")
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_\-]/g, "");

      pdf.save(`${safe}_resume.pdf`);
    } catch (err) {
      console.error("[ResumeCraft] PDF error:", err);
      alert("PDF generation failed. Please try printing (Ctrl+P).");
    }
  },

  _loadScript(src) {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = resolve; // fail gracefully
      document.head.appendChild(script);
    });
  },
};
