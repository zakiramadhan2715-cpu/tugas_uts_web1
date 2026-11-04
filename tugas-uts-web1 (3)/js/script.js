document.addEventListener("DOMContentLoaded", function () {
    // 1. Logika Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const user = dataPengguna.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                localStorage.setItem("userLogin", JSON.stringify(user));
                alert(`Selamat datang, ${user.nama}!`);
                window.location.href = "dashboard.html";
            } else {
                alert("Email atau password salah!");
            }
        });
    }

    // 2. Logika Dynamic Greeting (Sapaan & Nama User)
    const greetingText = document.getElementById("greetingText");
    if (greetingText) {
        const currentHour = new Date().getHours();
        let timeGreeting = "Halo";

        if (currentHour >= 4 && currentHour < 11) {
            timeGreeting = "Selamat Pagi";
        } else if (currentHour >= 11 && currentHour < 15) {
            timeGreeting = "Selamat Siang";
        } else if (currentHour >= 15 && currentHour < 18) {
            timeGreeting = "Selamat Sore";
        } else {
            timeGreeting = "Selamat Malam";
        }

        let namaUser = "User";
        const savedUser = localStorage.getItem("userLogin");
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed && parsed.nama) {
                    namaUser = parsed.nama;
                }
            } catch (e) {
                console.error(e);
            }
        }

        greetingText.innerText = `${timeGreeting}, ${namaUser}!`;
    }
});

  // 2. Render Katalog di Dashboard
  const katalogContainer = document.getElementById("katalogContainer");
  if (katalogContainer && typeof dataKatalogBuku !== "undefined") {
    katalogContainer.innerHTML = dataKatalogBuku
      .map(
        (buku) => `
            <div class="card">
                <img src="${buku.cover}" alt="${buku.namaBarang}">
                <div class="card-body">
                    <div>
                        <div class="card-title">${buku.namaBarang}</div>
                        <small style="color: #666;">Kode: ${buku.kodeBarang} | Edisi: ${buku.edisi}</small>
                    </div>
                    <div class="card-price">${buku.harga}</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  // 3. Render Tabel Stok
  const stokTableBody = document.getElementById("stokTableBody");
  if (stokTableBody && typeof dataKatalogBuku !== "undefined") {
    stokTableBody.innerHTML = dataKatalogBuku
      .map(
        (buku) => `
            <tr>
                <td>${buku.kodeBarang}</td>
                <td>${buku.namaBarang}</td>
                <td>${buku.jenisBarang}</td>
                <td>${buku.edisi}</td>
                <td>${buku.stok}</td>
                <td>${buku.harga}</td>
            </tr>
        `,
      )
      .join("");
  }

  // 4. Form Checkout Buku
  const pilihBukuSelect = document.getElementById("pilihBuku");
  if (pilihBukuSelect && typeof dataKatalogBuku !== "undefined") {
    pilihBukuSelect.innerHTML = dataKatalogBuku
      .map(
        (buku) => `
            <option value="${buku.kodeBarang}">${buku.namaBarang} - ${buku.harga}</option>
        `,
      )
      .join("");
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Pesanan berhasil diproses! Terima kasih.");
      window.location.href = "dashboard.html";
    });
  }

  // 5. Tracking Pengiriman
  const btnCariDO = document.getElementById("btnCariDO");
  if (btnCariDO) {
    btnCariDO.addEventListener("click", function () {
      const noDO = document.getElementById("searchDO").value.trim();
      const hasilDiv = document.getElementById("hasilTracking");

      if (dataTracking[noDO]) {
        const item = dataTracking[noDO];
        hasilDiv.innerHTML = `
                    <div style="background: white; padding: 20px; border-radius: 8px;">
                        <h3>Detail Pengiriman #${item.nomorDO}</h3>
                        <p><strong>Penerima:</strong> ${item.nama}</p>
                        <p><strong>Status:</strong> ${item.status}</p>
                        <p><strong>Ekspedisi:</strong> ${item.ekspedisi}</p>
                        <p><strong>Tanggal Kirim:</strong> ${item.tanggalKirim}</p>
                        <hr style="margin: 15px 0;">
                        <h4>Riwayat Perjalanan:</h4>
                        <div class="timeline">
                            ${item.perjalanan
                              .map(
                                (p) => `
                                <div class="timeline-item">
                                    <div class="timeline-time">${p.waktu}</div>
                                    <div>${p.keterangan}</div>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                `;
      } else {
        hasilDiv.innerHTML = `<p style="color: red;">Nomor DO tidak ditemukan!</p>`;
      }
    });
  }

  // 6. Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("userLogin");
      window.location.href = "index.html";
    });
  }
;
