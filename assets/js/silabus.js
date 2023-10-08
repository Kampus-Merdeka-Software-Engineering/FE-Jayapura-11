// Fungsi untuk mengambil parameter "id" dari URL
function getCourseIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Fungsi untuk mengambil data kursus berdasarkan ID
async function fetchData(courseId) {
  try {
    const response = await fetch(`http://localhost:6969/courses/`);
    const data = await response.json();

    // Temukan data kursus yang sesuai dengan ID yang diberikan
    const course = data.result.find((item) => item.id === parseInt(courseId));

    if (course) {
      // Isi sumber video
      const videoElement = document.getElementById("course-video");
      videoElement.src = course.linkVideo;

      // Isi judul kursus
      const courseTitle = document.getElementById("course-title");
      courseTitle.textContent = course.title;

      // Isi deskripsi kursus
      const courseDescription = document.getElementById("course-description");
      courseDescription.textContent = course.description;
    } else {
      console.error("Kursus tidak ditemukan");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Panggil fungsi untuk mengambil parameter "id" dari URL
const courseId = getCourseIdFromUrl();

// Panggil fungsi fetchData dengan parameter courseId
if (courseId) {
  fetchData(courseId);
}
