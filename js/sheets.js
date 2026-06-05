const SheetsConnector = {
  ENDPOINT: "https://script.google.com/macros/s/AKfycbz9bux-ZSBnIOqKlLDVuqlCUgywPZ_uE4l-lCQZm9QEN0a4EcHCtzaUUaHnYyWsDaWLTw/exec",

  async send(data) {
    try {
      await fetch(this.ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          timestamp: new Date().toISOString()
        })
      });

      console.log("✅ Sent to Sheets");

    } catch (e) {
      console.error("❌ Error:", e);
    }
  }
};
