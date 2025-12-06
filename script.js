function showPage(pageId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((sec) => sec.classList.remove("active"));

  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add("active");
  }
  updateSidebarActiveState();
}
function updateSidebarActiveState() {
  const navItems = document.querySelectorAll(".nav-menu li");
  navItems.forEach((item) => item.classList.remove("active"));
  const productsLink = document.querySelector(".nav-menu li:nth-child(2)"); // Products adalah list item ke-2
  if (productsLink) {
    productsLink.classList.add("active");
  }
}
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
function showUpdateProduct(
  productName,
  productCategory,
  productPrice,
  productDesc
) {
  showPage("update-product-page");
  document.getElementById("updateProductName").value = productName || "";
  document.getElementById("updateProductCategory").value =
    productCategory || "";
  const priceCleaned = (productPrice || "0").replace(/[^0-9.]/g, "");
  document.getElementById("updatePrice").value = priceCleaned;
  document.getElementById("updateDesc").value = productDesc || "";
  document.querySelector("#update-product-page .file-name").textContent =
    "No file chosen";
}
function handleDelete() {
  const confirmed = confirm("Apakah Anda yakin ingin menghapus produk ini?");
  if (confirmed) {
    alert("✅ Produk berhasil dihapus (Aksi Dummy).");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  showPage("products-page");
  const addBtn = document.querySelector(".add-product-btn");
  if (addBtn) {
    addBtn.addEventListener("click", showAddProduct);
  }
  const productList = document.querySelector(".product-list");

  if (productList) {
    productList.addEventListener("click", (event) => {
      const target = event.target.closest(".action-btn");
      if (target) {
        const productCard = target.closest(".product-card");
        const productName =
          productCard.querySelector(".product-name").textContent;
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
          handleDelete();
        }
      }
    });
  }
  const addProductForm = document.getElementById("addProductForm");
  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Data Produk BARU berhasil ditambahkan (Aksi Dummy).");
      showPage("products-page");
    });
  }
  const updateProductForm = document.getElementById("updateProductForm");
  if (updateProductForm) {
    updateProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Data Produk berhasil DIPERBARUI (Aksi Dummy).");
      showPage("products-page");
    });
  }
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
