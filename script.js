// Fungsi Utama untuk Menampilkan Halaman
function showPage(pageId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((sec) => sec.classList.remove("active"));

  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Panggil fungsi untuk update sidebar
  updateSidebarActiveState();
}

// Fungsi untuk Mengatur Status Aktif Sidebar
function updateSidebarActiveState() {
  const navItems = document.querySelectorAll(".nav-menu li");
  navItems.forEach((item) => item.classList.remove("active"));

  // Logika: Products aktif jika berada di Products, Add Product, atau Update Product
  const productsLink = document.querySelector(".nav-menu li:nth-child(2)"); // Products adalah list item ke-2
  if (productsLink) {
    productsLink.classList.add("active");
  }
}

// Fungsi untuk menangani klik tombol "Add Product" (Masuk ke halaman form)
function showAddProduct() {
  showPage("add-product-page");
  // Bersihkan form saat pindah ke halaman Add Product
  const form = document.getElementById("addProductForm");
  if (form) {
    form.reset();
    document.querySelector("#add-product-page .file-name").textContent =
      "No file chosen";
  }
}

// Fungsi untuk menangani klik tombol Edit (Masuk ke halaman update dan mengisi data)
function showUpdateProduct(
  productName,
  productCategory,
  productPrice,
  productDesc
) {
  showPage("update-product-page");

  // Mengisi form update dengan data dummy yang diambil dari card
  document.getElementById("updateProductName").value = productName || "";
  document.getElementById("updateProductCategory").value =
    productCategory || "";

  // Hilangkan simbol mata uang untuk input number
  const priceCleaned = (productPrice || "0").replace(/[^0-9.]/g, "");
  document.getElementById("updatePrice").value = priceCleaned;

  document.getElementById("updateDesc").value = productDesc || "";

  // Reset status file input di form update
  document.querySelector("#update-product-page .file-name").textContent =
    "No file chosen";
}

// Fungsi untuk menangani aksi delete (Dummy)
function handleDelete() {
  const confirmed = confirm("Apakah Anda yakin ingin menghapus produk ini?");
  if (confirmed) {
    alert("✅ Produk berhasil dihapus (Aksi Dummy).");
  }
}

// *** Event Listeners (Memastikan semua tombol bekerja setelah DOM dimuat) ***
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Tampilan Awal
  showPage("products-page");

  // 2. Hubungkan Tombol Add Product di header
  const addBtn = document.querySelector(".add-product-btn");
  if (addBtn) {
    addBtn.addEventListener("click", showAddProduct);
  }

  // 3. Hubungkan Tombol Edit dan Hapus pada setiap Product Card (Event Delegation)
  const productList = document.querySelector(".product-list");

  if (productList) {
    productList.addEventListener("click", (event) => {
      const target = event.target.closest(".action-btn");

      if (target) {
        const productCard = target.closest(".product-card");

        // Ambil data produk dari card
        const productName =
          productCard.querySelector(".product-name").textContent;

        // Mengambil nilai detail, memisahkan label:
        const details = productCard.querySelectorAll(".product-detail");
        const productCategory = details[0]
          ? details[0].textContent.replace("Category:", "").trim()
          : "";
        const productPrice = details[2]
          ? details[2].textContent.replace("Price:", "").trim()
          : "";
        const productDesc = productCard
          .querySelector(".product-desc")
          .textContent.replace("Desc:", "")
          .trim();

        if (target.classList.contains("edit-btn")) {
          showUpdateProduct(
            productName,
            productCategory,
            productPrice,
            productDesc
          );
        } else if (target.classList.contains("delete-btn")) {
          // Di sini kita bisa menghapus card secara visual, tapi karena ini statis, kita panggil dummy alert
          handleDelete();
        }
      }
    });
  }

  // 4. Memperbaiki Fungsionalitas Tombol Submit Form

  // A. Tombol 'Add Product' pada form Add
  const addProductForm = document.getElementById("addProductForm");
  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Data Produk BARU berhasil ditambahkan (Aksi Dummy).");
      // Kembalikan ke halaman Products setelah submit
      showPage("products-page");
    });
  }

  // B. Tombol 'Update Product' pada form Update
  const updateProductForm = document.getElementById("updateProductForm");
  if (updateProductForm) {
    updateProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Data Produk berhasil DIPERBARUI (Aksi Dummy).");
      // Kembalikan ke halaman Products setelah update
      showPage("products-page");
    });
  }

  // 5. Interaksi File Input (Mengubah teks 'No file chosen')
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", function () {
      const parentGroup = this.closest(".form-group");
      const fileNameSpan = parentGroup
        ? parentGroup.querySelector(".file-name")
        : null;

      if (fileNameSpan) {
        if (this.files && this.files.length > 0) {
          fileNameSpan.textContent = this.files[0].name;
        } else {
          fileNameSpan.textContent = "No file chosen";
        }
      }
    });
  });
});
