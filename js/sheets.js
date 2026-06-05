const SheetsConnector = {
  ENDPOINT: "https://script.google.com/macros/s/AKfycbz9bux-ZSBnIOqKlLDVuqlCUgywPZ_uE4l-lCQZm9QEN0a4EcHCtzaUUaHnYyWsDaWLTw/exec",

  async send(data) {
    try {
      const formData = new URLSearchParams();

      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("phone", data.phone || "");
      formData.append("timestamp", new Date().toISOString());

      await fetch(this.ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData
      });

      console.log("✅ Sent to Sheets");

    } catch (e) {
      console.error("❌ Error:", e);
    }
  }
};
