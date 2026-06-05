const PDFExporter = {
  async export(elementId, fileName) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // ── MOBILE FIX: off-screen A4-width print container ─────────────
    const A4_PX = 794; // A4 at 96 dpi
    const printWrap = document.createElement("div");
    Object.assign(printWrap.style, {
      position:   "fixed",
      top:        "-9999px",
      left:       "-9999px",
      width:      A4_PX + "px",
      background: "#ffffff",
      zIndex:     "-1",
    });
    const clone = el.cloneNode(true);
    clone.style.width  = A4_PX + "px";
    clone.style.margin = "0";
    printWrap.appendChild(clone);
    document.body.appendChild(printWrap);
    // ────────────────────────────────────────────────────────────────

    try {
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      // Give browser time to lay out the cloned element
      await new Promise(r => setTimeout(r, 400));

      const canvas = await html2canvas(clone, { // ← capture CLONE, not live el
        scale:           2,
        useCORS:         true,
        backgroundColor: "#ffffff",
        logging:         false,
        scrollY:         -window.scrollY, // neutralise page scroll offset
        windowWidth:     A4_PX,           // prevent mobile CSS breakpoints firing
        width:           A4_PX,
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth      = pdf.internal.pageSize.getWidth();
      const pdfHeight     = pdf.internal.pageSize.getHeight();
      const ratio         = pdfWidth / canvas.width;
      const pageHeightPx  = pdfHeight / ratio;

      let heightLeft  = canvas.height;
      let position    = 0;
      let pageIndex   = 0;

      while (heightLeft > 0) {
        const pageCanvas    = document.createElement("canvas");
        const pageCtx       = pageCanvas.getContext("2d");
        pageCanvas.width    = canvas.width;
        pageCanvas.height   = Math.min(pageHeightPx, heightLeft);

        pageCtx.drawImage(canvas, 0, position, canvas.width, pageCanvas.height,
                                  0, 0,        canvas.width, pageCanvas.height);

        const pageImg = pageCanvas.toDataURL("image/png");
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(pageImg, "PNG", 0, 0, pdfWidth, pageCanvas.height * ratio);

        position   += pageCanvas.height;
        heightLeft -= pageCanvas.height;
        pageIndex++;
      }

      const safe = (fileName || "resume")
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_\-]/g, "");

      pdf.save(`${safe}.pdf`);
      document.body.removeChild(printWrap); // ← teardown

    } catch (err) {
      console.error("[ResumeCraft] PDF error:", err);
      if (document.body.contains(printWrap))
        document.body.removeChild(printWrap); // ← teardown on error
      alert("PDF generation failed. Please try again or use Print (Ctrl+P).");
    }
  },

  // _loadScript unchanged...


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
