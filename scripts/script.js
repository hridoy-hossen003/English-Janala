const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const data = await res.json();
  displayData(data.data);
};

const loadLessonWords = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayLessons(data.data);
};

// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"

const displayLessons = (datas) => {
  // get container and make it empty
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = null;
  datas.forEach((word) => {
    // console.log(word);
    const dataDiv = document.createElement("div");
    dataDiv.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm m-2 text-center py-5 pt-10 px-5">
            <h2 class="text-3xl font-bold mb-2">${word.word}</h2>
            <p class="text-xl text-gray-600">Meaning / Pronunciation</p>
            <p class="text-2xl font-semibold text-gray-500 py-4 font-bangla">${word.meaning} /${word.pronunciation}</p>
            <div class="flex my-2 items-end justify-between">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info text-xl"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>    
    `;

    wordsContainer.append(dataDiv);

});
};

const displayData = (levels) => {
  // get the container and make empty the container
  const laverContainer = document.getElementById("lavel-container");
  laverContainer.innerHTML = null;
  levels.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <div class='inline-block group relative'>
        <button onclick='loadLessonWords(${lesson.level_no})' class="btn btn-outline btn-primary"><i
         class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
         <span class="absolute -top-8 left-5/8 -translate-x-1/2
             bg-white font-semibold text-black text-xs px-2 py-1 rounded
             opacity-0 group-hover:opacity-100
             transition duration-200">${lesson.lessonName}</span>
         <div>
        `;

    laverContainer.append(btnDiv);
  });
};
loadData();
