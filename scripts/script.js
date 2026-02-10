const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const data = await res.json();
  displayData(data.data);
};

const displayData = (levels) => {
  // get the container and make empty the container
  const laverContainer = document.getElementById("lavel-container");
  laverContainer.innerHTML = null;
  levels.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary"><i
         class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `;

        laverContainer.append(btnDiv)
  });
};
loadData();
