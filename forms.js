// Submits any form marked data-ajax to Netlify Forms and shows its success message.
(function () {
  function encode(data) {
    return Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join("&");
  }
  document.querySelectorAll("form[data-ajax]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data)
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.style.display = "none";
        var ok = document.getElementById(form.getAttribute("data-success"));
        if (ok) ok.style.display = "block";
      }).catch(function () {
        alert("Sorry, something went wrong. Please try again or email us at hello@gableandgracebuilds.com.");
      });
    });
  });
})();
