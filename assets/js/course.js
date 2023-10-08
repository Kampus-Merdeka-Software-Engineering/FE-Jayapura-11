// URL API yang akan Anda fetch data-nya
const apiUrl = "http://localhost:6969/courses/";

// Fungsi untuk menangani klik tombol "Watch Course"
function handleWatchCourseClick(event) {
  event.preventDefault(); // Mencegah tindakan default link

  // Mengambil ID kursus dari atribut data-course-id
  const courseId = event.currentTarget.getAttribute("data-course-id");

  // Navigasi ke halaman "silabus.html" dengan membawa parameter ID
  window.location.href = `silabus.html?id=${courseId}`;
}

// Fungsi untuk mengambil data dari API dan menampilkan data ke dalam elemen HTML
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Loop melalui data dari API dan tampilkan dalam elemen HTML
    const coursesContainer = document.getElementById("courses-container");

    data.result.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("swiper-slide", "slide");

      const img = document.createElement("img");
      img.src = course.linkFoto;
      img.alt = "";

      const h3 = document.createElement("h3");
      h3.textContent = course.title;

      const p = document.createElement("p");
      p.textContent = course.summary;

      // Membuat tombol "Watch Course" dan menambahkan event listener
      const a = document.createElement("a");
      a.href = "#"; // Tidak ada URL sekarang
      a.classList.add("btn");
      a.textContent = "Watch Course";

      // Menambahkan atribut data-course-id dengan ID kursus dari API
      a.setAttribute("data-course-id", course.id);

      a.addEventListener("click", handleWatchCourseClick);

      courseDiv.appendChild(img);
      courseDiv.appendChild(h3);
      courseDiv.appendChild(p);
      courseDiv.appendChild(a);

      coursesContainer.appendChild(courseDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Panggil fungsi fetchData untuk mengambil dan menampilkan data
fetchData();
