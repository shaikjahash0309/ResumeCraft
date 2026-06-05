const SheetsConnector = {
  ENDPOINT: "https://script.google.com/macros/s/AKfycbz9bux-ZSBnIOqKlLDVuqlCUgywPZ_uE4l-lCQZm9QEN0a4EcHCtzaUUaHnYyWsDaWLTw/exec",

  async send(data) {
    try {
      const formData = new URLSearchParams();

      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("phone", data.phone || "");
      formData.append("timestamp", new Date().toISOString());

      const res = await fetch(this.ENDPOINT, {
        method: "POST",
        body: formData
      });

      const result = await res.text();
      console.log("Sheet response:", result);

    } catch (e) {
      console.error("Send failed:", e);
    }
  }
};
