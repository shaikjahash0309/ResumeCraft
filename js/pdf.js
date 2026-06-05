const PDFExporter = {
  async export(elementId, fileName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    try {
      // Load libraries only once
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      // Wait a bit for layout stability (VERY IMPORTANT for resumes)
      await new Promise(r => setTimeout(r, 300));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollY: 0
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = pdfWidth / canvasWidth;
      const pageHeightPx = pdfHeight / ratio;

      let heightLeft = canvasHeight;
      let position = 0;
      let pageIndex = 0;

      while (heightLeft > 0) {
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d");

        pageCanvas.width = canvasWidth;
        pageCanvas.height = Math.min(pageHeightPx, heightLeft);

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

        position += pageCanvas.height;
        heightLeft -= pageCanvas.height;
        pageIndex++;
      }

      const safe = (fileName || "resume")
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_\-]/g, "");

      pdf.save(`${safe}.pdf`);
    } catch (err) {
      console.error("[ResumeCraft] PDF error:", err);
      alert("PDF generation failed. Please try again or use Print (Ctrl+P).");
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
      script.onerror = resolve;
      document.head.appendChild(script);
    });
  }
};
